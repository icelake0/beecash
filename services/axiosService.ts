import axios, { AxiosError } from "axios";
import NetInfo from "@react-native-community/netinfo";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axiosRetry from "axios-retry";
import { Buffer } from "buffer";
import { toast } from "../utils";

const controller = new AbortController();

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// Versions
export const API_VERSIONS = {
  v1: "api/v1",
};

export const errorHandler = async (error: any) => {
  const err = error as AxiosError;

  if (err.response) {
    return Promise.reject(err.response.data);
  } else if (err.request) {
    return Promise.reject(err.request);
  } else {
    return Promise.reject(err);
  }
};

// Your function to retrieve the JWT token
const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("jwtToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Your function to set the JWT token
export const setToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("jwtToken", token);
  } catch (error) {
    console.error("Error setting token:", error);
  }
};

// Your function to remove the JWT token
export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("jwtToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export const decodeToken = (token: string) => {
  try {
    const parts = token
      .split(".")
      .map((part: any) =>
        Buffer.from(
          part.replace(/-/g, "+").replace(/_/g, "/"),
          "base64"
        ).toString()
      );

    const payload = JSON.parse(parts[1]);
    return payload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return {};
  }
};

const api = axios.create({
  // @ts-ignore
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  signal: controller.signal,
  cancelToken: source.token,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

axiosRetry(api, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  retryCondition: (error) => {
    return error.code !== "ENOTFOUND";
  },
  onRetry: (err) => {
    console.log({ retryCount: err });
  },
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // You can modify the request config here (e.g., add headers, tokens)
    getToken().then(async (token) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    });

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add an error interceptor to handle both request and response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle errors here (e.g., show an error message to the user)
    // If the error is due to network disconnection, you can handle it separately
    const isNetworkError =
      error.message === "Network Error" || error.message === "timeout";

    if (isNetworkError) {
      // Handle network disconnection error (e.g., show a notification)
      toast({ message: "[Network]: disconnected", color: "danger" });
    }
    if (error.response && error.response.status === 401) {
      toast({ message: error.response.data.message, color: "danger" });
      // router.replace("/home");
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

// Set up a NetInfo listener to detect network connectivity changes
NetInfo.addEventListener((state) => {
  if (!state.isConnected) {
    // Handle network disconnection (e.g., show a warning)
    toast({ message: "[Network]: disconnected", color: "danger" });
    source.cancel("[Network]: Operation canceled => Network connection lost.");
  }
});

export default api;
