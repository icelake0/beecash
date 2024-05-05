import React from "react";

import { useStorageState } from "@/hooks/useStorageState";
// import { useAppState } from "@/hooks/useAppState";

import { useBoundStore } from "./stores";
import {
  registerUserApi,
  signInWithEmailAndPassword,
  signInWithPin,
  signOut,
  updatePin,
} from "./endpoints/auth-requests";
import { resetAllSlices } from "./stores/resetAllSlices";

interface AuthType {
  signIn: (data: any) => Promise<any>;
  signInWithPin: (data: any) => Promise<any>;
  signOut: () => Promise<void>;
  signUp: (data: any) => Promise<any>;
  updatePin: (data: { pin: string }) => Promise<any>;
  session?: string | null;
  isLoading: boolean;
  auth?: any;
  appState?: "active" | "background" | "inactive" | "unknown" | "extension";
}

const AuthContext = React.createContext<AuthType>({
  signIn: async (data: any) => {},
  signInWithPin: async (data: any) => {},
  signOut: async () => {},
  signUp: async (data: any) => {},
  updatePin: async (data: any) => {},
  session: null,
  isLoading: false,
  auth: null,
  appState: "unknown",
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  // @ts-ignore
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const { authData, token } = useBoundStore((state) => state);
  // const [appState] = useAppState();

  const auth = {
    data: authData,
    token,
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async (credentials) => {
          const result = await signInWithEmailAndPassword(credentials);
          if (result) {
            setSession(result?.data?.access_token);
          }
          return result;
        },
        updatePin: updatePin,
        signInWithPin: async (credentials) => {
          const result = await signInWithPin(credentials);
          if (result) {
            setSession(result?.data?.access_token);
          }
          return result;
        },
        signUp: registerUserApi,
        signOut: async () => {
          setSession(null);
          await signOut().then(() => {
            resetAllSlices();
          });
        },
        // appState,
        session,
        isLoading,
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
