import { Client, Account, Avatars, ID, Databases, Query } from "react-native-appwrite";

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