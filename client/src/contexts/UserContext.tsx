import { PropsWithChildren, createContext } from "react";

import { User } from "../types/user";
import { useLocalStorage } from "../hooks/useLocalStorage";

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  handleLogin: (user: User) => void;
  handleLogOut: () => void;
}>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  handleLogOut: () => {},
  handleLogin: () => {},
});

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const isLoggedIn = !!user;

  const handleLogOut = () => {
    setUser(null);
  };

  const handleLogin = (user: User) => {
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, setUser, handleLogOut, handleLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
