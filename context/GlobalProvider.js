/*import { createContext, useContext, useState, useEffect } from "react";
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

export default GlobalProvider;*/


import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../library/appwrite"; // Adjust based on your app
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from AsyncStorage on app load
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        } else {
          // If no user stored, fetch the current user
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setIsLoggedIn(true);
            setUser(currentUser);
            await AsyncStorage.setItem('user', JSON.stringify(currentUser));
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Handle logout and clear AsyncStorage
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Error removing user from storage:', error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        setIsLoading,
        setUser,
        setIsLoggedIn,
        logout, // expose logout for clearing user
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;


