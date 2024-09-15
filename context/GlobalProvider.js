import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../library/appwrite";


const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const checkSession = async () => {
      try {
        // First, check if there's a session in AsyncStorage
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          // Parse session and set state
          const session = JSON.parse(userSession);
          setIsLoggedIn(true);
          setUser(session);
        } else {
          // If no session is found in storage, fetch from Appwrite
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setIsLoggedIn(true);
            setUser(currentUser);
            // Store the session in AsyncStorage for future page loads
            await AsyncStorage.setItem('userSession', JSON.stringify(currentUser));
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false); // Set loading to false after checking session
      }
    };

    checkSession();  // Call the session check function when the component mounts
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






/*

import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser, signIn, createUser } from "../library/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          const userObject = JSON.parse(userSession);
          setIsLoggedIn(true);
          setUser(userObject);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const logIn = async (email, password) => {
    try {
      const session = await signIn(email, password);
      if (session) {
        // Save session details to AsyncStorage
        await AsyncStorage.setItem('userSession', JSON.stringify(session));
        setIsLoggedIn(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
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
        logIn,
        logOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

 */