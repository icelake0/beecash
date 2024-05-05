import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

import { createAuthSlice, type AuthState } from "./useAuthSlice";
import { createBalanceSlice, type BalanceType } from "./useBalance";
import {
  createOfflineBalanceSlice,
  type OfflineBalanceType,
} from "./useOfflineBalance";
import { createAppearanceScheme, type AppearanceType } from "./useAppearance";

const storage: StateStorage = {
  setItem: setItemAsync,
  getItem: getItemAsync,
  removeItem: deleteItemAsync,
};

export const useBoundStore = create<
  AuthState & BalanceType & AppearanceType & OfflineBalanceType
>()((...a) => ({
  ...persist(createAuthSlice, {
    name: "use-auth-store",
    storage: createJSONStorage(() => storage),
    partialize: (state) => ({
      authData: state.authData,
      pin: state.pin,
      isAuthLoading: state.isAuthLoading,
      setIsLoading: state.setIsLoading,
    }),
  })(...a),
  ...persist(createBalanceSlice, {
    name: "use-transaction-store",
    storage: createJSONStorage(() => AsyncStorage),
    partialize: (state) => ({
      balance: state.balance,
      transactions: state.transactions,
      isVisible: state.isVisible,
      isBalanceLoaded: state.isBalanceLoaded,
    }),
  })(...a),
  ...persist(createAppearanceScheme, {
    name: "use-appearance-store",
    storage: createJSONStorage(() => AsyncStorage),
    partialize: (state) => ({
      currentColorScheme: state.currentColorScheme,
    }),
  })(...a),
  ...persist(createOfflineBalanceSlice, {
    name: "use-offline-transaction-store",
    storage: createJSONStorage(() => AsyncStorage),
    partialize: (state) => ({
      offlineBalance: state.offlineBalance,
      offlineTransactions: state.offlineTransactions,
    }),
  })(...a),
}));
