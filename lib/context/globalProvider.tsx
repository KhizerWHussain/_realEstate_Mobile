import { createContext, ReactNode, useContext } from "react";
import { useAppwrite } from "../hooks/useAppWrite";
import { ApiGetUser } from "../appwrite/apicall";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;

  [key: string]: string | number | boolean | object | symbol;
}

type GlobalContextType = {
  isLoggedIn: boolean;
  user: User | null;
  isBeingLoad: boolean;
  fetchAgain: (newParams?: Record<string, string | number>) => Promise<void>;
};

interface ContextProviderType {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({ children }: ContextProviderType) => {
  const {
    data: user,
    error,
    loading,
    fetchAgain,
  } = useAppwrite({
    fn: ApiGetUser,
  });

  const isLoggedIn = !!user;

  // console.log("user ==>", JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider
      value={{ user, isLoggedIn, isBeingLoad: loading, fetchAgain }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used withtin a provider");
  }

  return context;
};

export default GlobalContextProvider;
