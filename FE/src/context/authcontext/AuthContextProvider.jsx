import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from 'axios';

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  

  const login = async (input) => {
    
    const res = await axios.post("http://localhost:8000/api/auth/login",input,{
      withCredentials:true,
    })
    console.log("Responseeeee Data:", res.data);

    setCurrentUser(res.data)
    localStorage.setItem("user", JSON.stringify(res.data));
    return { redirect: res.data.redirect };
  };
  

  const logout = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {}, {
        withCredentials: true,
      });
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return(
      <AuthContext.Provider value={{currentUser, login,logout}}>
         {children}
      </AuthContext.Provider>
    )
};
export default AuthContextProvider;
