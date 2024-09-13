import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../library/appwrite";
const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Call the getCurrentUser function
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
        setIsLoggedIn(false); 
        setUser(null); 
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []);



  return <GlobalContext.Provider
  value={{
    isLoading,
    isLoggedIn,
    user,
    setIsLoading,
    setUser,
    setIsLoggedIn
  }}>
  {children}
  </GlobalContext.Provider>;
};

export default GlobalProvider;

