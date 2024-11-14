import axios, {AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {logout, refreshAccessToken} from './authService.js';

const apiUrl = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
});

interface FailedQueueItem {
    resolve: (value: string | PromiseLike<string>) => void;
    reject: (reason?: unknown) => void;
}

const setAuthorizationHeader = (config: AxiosRequestConfig, token: string | null): void => {
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token !== null) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.request.use((
        config: InternalAxiosRequestConfig,
    ): InternalAxiosRequestConfig => {
        const excludedPaths = [
            '/api/v1/users/signup/creator',
            '/api/v1/users/signup/productmanager',
            '/api/v1/login',
        ];

        const isExcluded = excludedPaths.some(path => config.url?.includes(path)) ||
            (config.method === 'get' && /^\/api\/v1\/items\/[^/]+$/.test(config.url || ''));

        if (!isExcluded) {
            const accessToken = localStorage.getItem('accessToken');
            setAuthorizationHeader(config, accessToken);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        let rawData = error.response?.data;

        if (typeof rawData === 'string') {
            try {
                rawData = rawData.split('}{').map((item, index, array) => {
                    if (index === 0) return item + '}';
                    if (index === array.length - 1) return '{' + item;
                    return '{' + item + '}';
                });
            } catch (error) {
                console.error("Failed to split combined JSON:", rawData);
                return Promise.reject(error);
            }
        } else {
            rawData = [rawData];
        }

        for (const data of rawData) {
            let responseData: { status: number; message: string };
            try {
                responseData = typeof data === 'string' ? JSON.parse(data) : data;
            } catch (error) {
                console.error("Failed to parse JSON:", data);
                return Promise.reject(error);
            }

            const {status, message} = responseData;

            const isTokenExpiredError =
                (status === 400 && message === "토큰이 만료되었습니다.") ||
                (status === 401 && message === "Unauthorized");

            if (isTokenExpiredError && !originalRequest._retry) {
                if (isRefreshing) {
                    try {
                        const token = await new Promise<string>((resolve, reject) => {
                            failedQueue.push({resolve, reject});
                        });
                        setAuthorizationHeader(originalRequest, token);
                        return apiClient(originalRequest);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const success = await refreshAccessToken();
                    if (success) {
                        const newAccessToken = localStorage.getItem('accessToken');
                        setAuthorizationHeader(originalRequest, newAccessToken);
                        processQueue(null, newAccessToken);
                        return apiClient(originalRequest);
                    } else {
                        processQueue(new Error("Failed to refresh token"), null);
                        await logout();
                    }
                } catch (err) {
                    processQueue(err, null);
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
