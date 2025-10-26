import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  gender: string;
  role: string;
}

export const login = async (payload: LoginPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, payload);
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signup = async (payload: SignupPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, payload);
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('token'); 
    localStorage.removeItem('role');  
    localStorage.removeItem('userId'); 
    
    console.log('Logout successful: Client session data cleared.');
    return true; 
  } catch (error: any) {
    console.error('Logout API call failed, but client data was cleared (if it occurred before the error).', error);
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');

    return true; 
  }
};