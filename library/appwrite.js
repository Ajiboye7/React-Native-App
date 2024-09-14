import { Client, Account, Avatars, ID, Databases, Query } from "react-native-appwrite"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ajiboyedev.aora",
  projectId: "66e168a900130ea9ac05",
  databaseId: "66e16c380011e90b87d8",
  userCollectionId: "66e16cbd00119938ab11",
  videoCollectionId: "66e16d16001f8cb68304",
  storageId: "66e171cd000fa61e0aba",
};

// Init React Native SDK
const client = new Client();

client
  .setEndpoint(Config.endpoint)
  .setProject(Config.projectId)
  .setPlatform(Config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password); 

    const newUser = await databases.createDocument(
      Config.databaseId,
      Config.userCollectionId,
      ID.unique(),
      {
        accoundId: newAccount.$id, 
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};


export const getCurrentUser =async ()=>{
    try{
         const currentAccount = await account.get();

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accoundId', currentAccount.$id)]
        )

        if(!currentUser) throw Error
        
        return currentUser.documents[0]
    }catch(error){
        console.log(error)
    }
}

/*import { Client, Account, Avatars, ID, Databases, Query } from "react-native-appwrite";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ajiboyedev.aora",
  projectId: "66e168a900130ea9ac05",
  databaseId: "66e16c380011e90b87d8",
  userCollectionId: "66e16cbd00119938ab11",
  videoCollectionId: "66e16d16001f8cb68304",
  storageId: "66e171cd000fa61e0aba",
};

// Init React Native SDK
const client = new Client();

client
  .setEndpoint(Config.endpoint)
  .setProject(Config.projectId)
  .setPlatform(Config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password); 

    const newUser = await databases.createDocument(
      Config.databaseId,
      Config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id, // Corrected typo from "accoundId"
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};


export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    
    // Save the session in AsyncStorage
    await AsyncStorage.setItem('@appwrite_session', JSON.stringify(session));

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Function to retrieve the stored session when the app starts
export const getStoredSession = async () => {
  try {
    const storedSession = await AsyncStorage.getItem('@appwrite_session');
    if (storedSession !== null) {
      // Parse the stored session
      const session = JSON.parse(storedSession);
      // Optionally verify the session (you can implement session validation here)
      return session;
    }
  } catch (error) {
    console.log('Error retrieving session:', error);
  }
  return null;
};

// Function to get the current user based on stored session
export const getCurrentUser = async () => {
  try {
    // Check if there's a stored session
    const session = await getStoredSession();
    
    if (!session) {
      throw new Error('No session found');
    }
    
    // Retrieve the current account based on session
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error('Account not found');

    // Query the user collection to get the user data
    const currentUser = await databases.listDocuments(
      Config.databaseId,
      Config.userCollectionId,
      [Query.equal('accoundId', currentAccount.$id)]// Corrected "accoundId"
    );

    if (!currentUser) throw new Error('User not found');
    
    return currentUser.documents[0];
  } catch (error) {
    console.log('Error getting current user:', error);
  }
  return null;
};*/
