"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "../services/AuthService";
import { ILogInUser } from "../types";

const UserContext = createContext<IUserProvider | undefined>(undefined);

interface IUserProvider {
  user: ILogInUser | null;
  setUser: Dispatch<SetStateAction<null>>;
  isUserLoading: boolean;
  setIsUserLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const handleUser = async () => {
    const currentUser = await getCurrentUser();

    setUser(currentUser);
    setIsUserLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isUserLoading]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isUserLoading, setIsUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used inside the UserProvider context");
  }

  return context;
};

export default UserProvider;
