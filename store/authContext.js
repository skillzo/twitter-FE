import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    const getItem = async () => {
      try {
        const init = await AsyncStorage.getItem("twitter-auth");
        setAuth(JSON.parse(init));
      } catch (err) {
        console.log("error in async storage here", err);
      }
    };
    getItem();
  }, []);

  const [auth, setAuth] = useState({});

  const value = useMemo(() => {
    auth, setAuth;
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
