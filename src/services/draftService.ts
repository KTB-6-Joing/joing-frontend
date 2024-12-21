import apiClient from "./apiClient.ts";
import {AxiosResponse} from "axios";

export const saveDraftPlan = async (
    title: string,
    content: string,
    mediaType: string,
    category: string,
    etcs: { name: string; value: string }[]
): Promise<AxiosResponse> => {
    try {
        const draftPlan = {
            title,
            content,
            mediaType, // "SHORT_FORM" 또는 "LONG_FORM"
            category,  // [GAME, TECH, EDUCATION 등]
            etcs,   // [{ name: "참고링크", value: "https://example.com" }]
        };

        const response = await apiClient.post('/api/v1/items', draftPlan);

        if (response.status !== 200) {
            throw new Error(`Failed to send draft plan: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error("Error saving draft plan:", error);
        throw error;
    }
};

export const patchDraftPlan = async (
    itemId: number,
    title: string,
    content: string,
    mediaType: string,
    category: string,
    etcList: { name: string; value: string }[]
): Promise<AxiosResponse> => {
    try {
        const draftPlan = {
            title,
            content,
            mediaType,
            category,
            etcList,
        };

        const response = await apiClient.patch(`/api/v1/items/${itemId}`, draftPlan);

        if (response.status !== 200) {
            throw new Error(`Failed to edit draft plan: ${response.statusText}`);
        }
        console.log("Draft plan has been successfully Edited!");
        return response;
    } catch (error) {
        console.error("Error editing draft plan:", error);
        throw error;
    }
};

export const viewDraftList = async () => {
    try {
        const response = await apiClient.get('/api/v1/items/recent');

        if (response.status !== 200) {
            throw new Error(`Failed to fetch draft list: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error('Error to fetch draft list:', error);
        throw error;
    }
};

export const viewDraftPlan = async (itemId: string) => {
    try {
        const response = await apiClient.get(`/api/v1/items/${itemId}`);

        if (response.status !== 200) {
            throw new Error(`Failed to fetch draft plan: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error('Failed to fetch draft:', error);
        throw error;
    }
};

export const deleteDraftPlan = async (itemId: number) => {
    try {
        const response = await apiClient.delete(`/api/v1/items/${itemId}`);

        if (response.status !== 200) {
            throw new Error(`Failed to delete draft plan: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error("Error deleting draft plan:", error);
    }
};

export const evaluationItem = async (itemId: number) => {
    try {
        const response = await apiClient.post(`/api/v1/items/${itemId}/evaluation`);

        if (response.status !== 200) {
            throw new Error(`Failed to evaluation draft plan: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error("Error Evaluation draft plan:", error);
        throw error;
    }
};

export const reSummaryItem = async (itemId: number) => {
    try {
        const response = await apiClient.post(`/api/v1/items/${itemId}/summary`);

        if (response.status !== 200) {
            throw new Error(`Failed to evaluation draft plan: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error("Error ReEvaluation draft plan:", error);
        throw error;
    }
};
