import apiClient from "./apiClient.ts";
import {AxiosResponse} from "axios";

export const SaveDraftPlan = async (
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
            mediaType, // "SHORT_FORM" 또는 "LONG_FORM"
            category,  // [GAME, TECH, EDUCATION 등]
            etcList,   // [{ name: "참고링크", value: "https://example.com" }]
        };

        const response = await apiClient.post('/api/v1/items', draftPlan);

        if (response.status !== 200) {
            throw new Error(`Failed to send draft plan: ${response.statusText}`);
        }
        console.log("Draft plan has been successfully Saved!");
        return response;
    } catch (error) {
        console.error("Error sending draft plan:", error);
        throw error;
    }
};

export const PatchDraftPlan = async (
    itemId: string,
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

export const ViewDraftList = async () => {
    try {
        return await apiClient.get('/api/v1/items/recent');
    } catch (error) {
        console.error('Failed to fetch draft list:', error);
        throw error;
    }
};

export const ViewDraftPlan = async(itemId: string) => {
    return await apiClient.get(`/api/v1/items/${itemId}`);
}

export const DeleteDraftPlan = async(itemId: string) => {
    try {
        const response = await apiClient.delete(`/api/v1/items/${itemId}`);

        if (response.status !== 200) {
            throw new Error(`Failed to delete draft plan: ${response.statusText}`);
        }
        console.log("Draft plan has been successfully Deleted!");
    } catch (error) {
        console.error("Error deleting draft plan:", error);
    }
}

export const Evaluation = async(itemId: string) => {
    return await apiClient.get(`/api/v1/items/${itemId}/evaluation`);
}

export const ReSummary = async(itemId: string) => {
    return await apiClient.get(`/api/v1/items/${itemId}/summary`);
}