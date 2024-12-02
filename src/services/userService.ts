import apiClient from './apiClient';

export const getRole = async() => {
    try{
        const response = await apiClient.get('api/v1/users');
        return response.data.role;
    } catch (error) {
        console.error('Failed to fetch role:', error);
        return null;
    }
}
