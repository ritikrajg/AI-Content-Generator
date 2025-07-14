import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { checkUserAuthentication } from "../apis/usersApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryFn: checkUserAuthentication,
    queryKey: ["checkAuth"],
  });

  useEffect(() => {
    if (data) {
      setAuth(data?.userAuthenticated);
    }
  }, [data, isSuccess]);

  const login = () => {
    setAuth(true);
  };

  const logout = () => {
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isError, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
