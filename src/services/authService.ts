import apiClient from './apiClient';

export const creatorJoin = async (data: {
    nickname: string;
    email: string;
    channelId: string;
    channelUrl: string;
    mediaType: string;
    category: string;
}) => {
    try {
        const response = await apiClient.post('/api/v1/users/signup/creator', data);
        console.log('API response:', response);

        if (response.status === 201) {
            return { success: true };
        }
        throw new Error(`Unexpected status code: ${response.status}`);
    } catch (error) {
        console.error('Error in creatorJoin:', error);
        return { success: false, error };
    }
};

export const plannerJoin = async(data: {
        nickname: string;
        email: string;
        favoriteCategories: string[];
    }) => {
    try{
        const response = await apiClient.post('/api/v1/users/signup/productmanager', {data});

        if (response.status === 201 || response.status === 200) {
            return { success: true };
        }
        throw new Error(`Unexpected status code: ${response.status}`);
    } catch (error) {
        console.error('Error in creatorJoin:', error);
        return { success: false, error };
    }
};

export const logout = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        console.warn('No access token found for logout');
        return;
    }

    try {
        await apiClient.patch('/auth/v1/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        console.error('Logout failed:', error);
    } finally {
        clearTokens();
    }
};

const clearTokens = () => {
    localStorage.removeItem('accessToken');
};
