import apiClient from './apiClient';
import {ItemStatus} from "../constants/itemStatus.ts";

export const matchingRequestToCreator = async (data: {
    itemId: number;
    creatorId: number;
}) => {
    try {
        const response = await apiClient.post('/api/v1/matching', data);

        if (response.status === 201) {
            return {success: true};
        }
        throw new Error(`Unexpected status code: ${response.status}`);
    } catch (error) {
        return {success: false, error};
    }
};

export const matchingRequestToItem = async (itemId: number) => {
    try {
        const response = await apiClient.post('/api/v1/matching', itemId);

        if (response.status === 201) {
            return {success: true};
        }
        throw new Error(`Unexpected status code: ${response.status}`);
    } catch (error) {
        return {success: false, error};
    }
};

export const deleteMatching = async (matchingId: number) => {
    try {
        const response = await apiClient.delete(`/api/v1/items/${matchingId}`);

        if (response.status === 204) {
            return {success: true};
        }
        throw new Error(`Failed to cancel Matching: ${response.status}`);
    } catch (error) {
        return {success: false, error};
    }
};

export const matchingStatusUpdate = async (
    matchingId: number,
    status: ItemStatus,
) => {
    try {
        const response = await apiClient.patch(`/api/v1/matching/${matchingId}/status`, status);

        if (response.status === 200) {
            return response;
        }
        throw new Error(`Failed to accept/reject Matching: ${response.status}`);
    } catch (error) {
        console.log('Error in Matching status update:', error);
        throw error;
    }
};

export const matchingStatus = async (matchingId: number) => {
    try {
        const response = await apiClient.get(`/api/v1/matching/${matchingId}`);

        if (response.status === 200) {
            return response;
        }
        throw new Error(`Failed to fetch MatchingStatus: ${response.status}`);
    } catch (error) {
        console.log('Error in fetch MatchingStatus:', error);
        throw error;
    }
};

export const matchingList = async () => {
    try {
        const response = await apiClient.get('api/v1/matching');

        if (response.status === 200) {
            return response;
        }
        throw new Error(`Failed to fetch MatchingList: ${response.status}`);
    } catch (error) {
        console.log('Error in fetch MatchingList:', error);
        throw error;
    }
};
