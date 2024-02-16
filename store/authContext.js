import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    const getItem = async () => {
      try {
        const init = await AsyncStorage.getItem("twitter-auth");
        setAuth(JSON.parse(init));
      } catch (err) {
        Alert.alert(err);
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

// const schema = {
//   email: "skillzo3@gmail.com",
//   followers: [],
//   followings: [],
//   id: "6591e43d4dda4ee29cf732fd",
//   profile: {
//     bio: "",
//     cover_picture: "",
//     dob: "",
//     is_verified: false,
//     joined_date: "2023-12-31T21:59:25.908Z",
//     location: "",
//     name: "",
//     profile_picture: "",
//   },
//   token:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTFlNDNkNGRkYTRlZTI5Y2Y3MzJmZCIsInVzZXJuYW1lIjoic2tpbGx6bzMiLCJuYW1lIjoiIiwicHJvZmlsZV9waWN0dXJlIjoiIiwiaWF0IjoxNzA2NDc3NjUyLCJleHAiOjE3MDY0ODEyNTJ9.0piFI4HkfxTTIb-PwWJS_kI55vTIidFyeioN-dfb1Vo",
//   username: "skillzo3",
// };
