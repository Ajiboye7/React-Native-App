import { Client, Account, Avatars, ID, Databases } from "react-native-appwrite";

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





/*
export const signIn = async (email, password) => {
  try {
    // First, check if there is already an active session
    const sessions = await account.listSessions();

    if (sessions.total > 0) {
      console.log("An active session already exists.");
      // Optionally, you can log out the user here if you want to clear the session
      // await account.deleteSession(sessions.sessions[0].$id);
      return sessions;
    }

    // If no active session, create a new session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

 */
