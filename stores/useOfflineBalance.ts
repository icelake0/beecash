import { StateCreator } from "zustand";
import { Transaction } from "./useBalance";
import { sliceResetFns } from "./resetAllSlices";
interface OfflineTransaction extends Transaction {
  id: number;
  status: "INITIATE" | "COMPLETED" | "FAILED" | "PENDING";
  amount: number;
  reference: string;
  previousBalance: number;
  newBalance: number;
  createdAt: Date;
  validation: "PENDING" | "FAILED" | "COMPLETED";
}

const initialState = {
  offlineBalance: 0,
  isOfflineBalanceLoaded: false,
  isOfflineTransactionLoaded: false,
  transactionReceipt: null,
  offlineTransactions: [],
};

export interface OfflineBalanceType {
  offlineBalance: number;
  isOfflineBalanceLoaded: boolean;
  isOfflineTransactionLoaded: boolean;
  transactionReceipt: any;
  offlineTransactions: Transaction[];
  refreshOfflineBalance(balance: number): Promise<void>;
  refreshOfflineTransactions(transactions: Transaction[]): Promise<void>;
  addOfflineTransaction: (offlineTransaction: OfflineTransaction) => void;
  updateOfflineBalance: (balance: number) => Promise<void>;
  addOfflineBalance?: (balance: number) => Promise<void>;
  deductBalance?: (balance: number) => Promise<void>;
  setIsBalanceLoaded: (val: boolean) => void;
  saveTransactionReceipt?: (tx: any) => void;
}

export const createOfflineBalanceSlice: StateCreator<
  OfflineBalanceType,
  [],
  [],
  OfflineBalanceType
> = (set) => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,
    refreshOfflineBalance: async (balance: number) => {
      try {
        set({
          offlineBalance: balance,
        });
      } catch (error: any) {
        console.log({ error1: error });
      }
    },
    refreshOfflineTransactions: async (transactions: Transaction[]) => {
      try {
        set({
          offlineTransactions: transactions,
        });
      } catch (error: any) {
        console.log({ error1: error });
      }
    },
    addOfflineTransaction: async (offlineTransaction: OfflineTransaction) => {
      set((state) => ({
        ...state,
        offlineTransactions: [offlineTransaction, ...state.offlineTransactions],
      }));
    },
    updateOfflineBalance: async (offlineBalance: number) =>
      set((state) => ({
        ...state,
        offlineBalance,
      })),
    addOfflineBalance: async (offlineBalance: number) =>
      set((state) => ({
        ...state,
        offlineBalance: state.offlineBalance + offlineBalance,
      })),
    setIsBalanceLoaded: (val) => set(() => ({ isOfflineBalanceLoaded: val })),
    deductBalance: async (offlineBalance: number) =>
      set((state) => {
        const newBalance = state.offlineBalance - offlineBalance;
        if (newBalance <= 0 || newBalance === 0) {
          state.offlineBalance = 0;
        }
        return {
          ...state,
          offlineBalance: newBalance,
        };
      }),
    saveTransactionReceipt: (transactionReceipt: any) =>
      set((state) => ({
        ...state,
        transactionReceipt,
      })),
  };
};
