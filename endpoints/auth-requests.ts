import { api } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  setToken,
  removeToken,
  API_VERSIONS,
  errorHandler,
} from "@/services/axiosService";

export const registerUserApi = async (data: any) => {
  try {
    const result = await api.post(`${API_VERSIONS.v1}/auth/signup`, data);
    setToken(result?.data?.data?.access_token);
    return result?.data;
  } catch (error) {
    await errorHandler(error);
  }
};

export const signInWithEmailAndPassword = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const result = await api.post(`${API_VERSIONS.v1}/auth/signin`, data);
    setToken(result?.data?.data?.access_token);
    return result?.data;
  } catch (error) {
    await errorHandler(error);
  }
};

export const signInWithPin = async (data: { email: string; pin: string }) => {
  try {
    const result = await api.post(
      `${API_VERSIONS.v1}/auth/signin-with-pin`,
      data
    );
    setToken(result?.data?.data?.access_token);
    return result?.data;
  } catch (error) {
    await errorHandler(error);
  }
};

export const updatePin = async (data: { pin: string }) => {
  try {
    const result = await api.patch(
      `${API_VERSIONS.v1}/users/auth-user/update-pin`,
      data
    );
    return result?.data;
  } catch (error) {
    await errorHandler(error);
  }
};

export const updatePassword = async (data: {
  currentPassword: string;
  password: string;
}) => {
  try {
    const result = await api.patch(
      `${API_VERSIONS.v1}/users/auth-user/update-password`,
      data
    );
    return result?.data;
  } catch (error) {
    await errorHandler(error);
  }
};

export const updateAccount = async (data: any) => {
  try {
    const result = await api.put(`${API_VERSIONS.v1}/users/auth-user`, data);
    return result?.data;
  } catch (error) {
    await errorHandler(error);
  }
};

export const signOut = async () => {
  await removeToken();
  await AsyncStorage.clear();
};
