import { api } from "@/services";
import { API_VERSIONS, errorHandler } from "@/services/axiosService";

export const getWallet = async () => {
  try {
    const result = await api.get(
      `${API_VERSIONS.v1}/wallet/auth-user/view-wallet`
    );
    return result?.data;
  } catch (error) {
    await errorHandler(error);
  }
};

export const topupWallet = async (data: { amount: number }) => {
  try {
    const result = await api.post(
      `${API_VERSIONS.v1}/wallet/auth-user/topup-wallet`,
      data
    );
    return result?.data;
  } catch (error) {
    await errorHandler(error);
  }
};

export const getTransactions = async () => {
  try {
    const result = await api.get(
      `${API_VERSIONS.v1}/wallet/transactions/auth-user`
    );
    return result.data;
  } catch (error) {
    await errorHandler(error);
  }
};

export const makePayment = async (data: {
  receiverId: number;
  amount: number;
}) => {
  try {
    const result = await api.post(
      `${API_VERSIONS.v1}/wallet/make-payment`,
      data
    );
    return result?.data;
  } catch (error) {
    await errorHandler(error);
  }
};
