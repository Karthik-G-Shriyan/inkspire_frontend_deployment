import { createContext, useState } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");



    const logout = () => {
    sessionStorage.removeItem("token");
    setToken(""); // triggers re-render everywhere
  };

    const contextValue = { 
    token, 
    setToken ,
    logout
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
