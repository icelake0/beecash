import { StateCreator } from "zustand";
import { getWallet, getTransactions } from "@/endpoints/wallet-requests";
import { sliceResetFns } from "./resetAllSlices";
export interface Transaction {
  id: number;
  reference: string;
  type: "CR" | "DR";
  status: "INITIATE" | "COMPLETED" | "FAILED" | "PENDING";
  walletId: number;
  userId: number;
  amount: number;
  previousBalance: number;
  newBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

const initialState = {
  balance: 0,
  isVisible: false,
  isBalanceLoaded: false,
  isTransactionLoaded: false,
  transactionReceipt: null,
  transactions: [],
};

export interface BalanceType {
  balance: number;
  isBalanceLoaded: boolean;
  isTransactionLoaded: boolean;
  transactionReceipt: any;
  transactions: Transaction[];
  getBalance(): Promise<void>;
  getTransactions(): Promise<void>;
  updateBalance: (balance: number) => Promise<void>;
  addBalance?: (balance: number) => Promise<void>;
  deductBalance?: (balance: number) => Promise<void>;
  setIsBalanceLoaded: (val: boolean) => void;
  saveTransactionReceipt?: (tx: any) => void;
  isVisible: boolean;
  toggleVisibility: () => void;
}

export const createBalanceSlice: StateCreator<
  BalanceType,
  [],
  [],
  BalanceType
> = (set) => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,
    getBalance: async () => {
      try {
        const result = await getWallet();
        const balance = result.data?.balance;
        set({
          balance: balance,
        });
      } catch (error: any) {
        console.log({ error1: error });
      }
    },
    getTransactions: async () => {
      set((state) => ({
        ...state,
        isTransactionLoaded: true,
      }));
      try {
        const result = await getTransactions();
        const transactions = result.data;
        set((state) => ({
          ...state,
          transactions,
          isTransactionLoaded: false,
        }));
      } catch (error: any) {
        set((state) => ({
          ...state,
          isTransactionLoaded: false,
        }));
        console.log({ error });
      } finally {
        set((state) => ({
          isTransactionLoaded: false,
        }));
      }
    },
    updateBalance: async (balance: number) =>
      set(() => ({
        balance,
      })),
    addBalance: async (balance: number) =>
      set((state) => ({
        balance: state.balance + balance,
      })),
    setIsBalanceLoaded: (val) => set(() => ({ isBalanceLoaded: val })),
    deductBalance: async (balance: number) =>
      set((state) => {
        const newBalance = state.balance - balance;
        if (newBalance <= 0 || newBalance === 0) {
          state.balance = 0;
        }
        return {
          balance: newBalance,
        };
      }),
    toggleVisibility: () =>
      set((state) => ({
        isVisible: !state.isVisible,
      })),
    saveTransactionReceipt: (transactionReceipt: any) =>
      set(() => ({
        transactionReceipt,
      })),
  };
};
