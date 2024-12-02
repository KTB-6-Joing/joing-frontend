import apiClient from './apiClient';
import {Role} from '../contexts/UserContext'

export const getRole = async(setRole: (role: Role) => void) => {
    try{
        const response = await apiClient.get('api/v1/users');
        setRole(response.data.role);
    } catch (error) {
        console.error('Failed to fetch role:', error);

    }
}
