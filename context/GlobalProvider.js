import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../library/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          const userData = JSON.parse(userSession);
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          const result = await getCurrentUser();
          if (result) {
            setUser(result);
            setIsLoggedIn(true);
            await AsyncStorage.setItem('userSession', JSON.stringify(result));
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    checkUserSession();
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

