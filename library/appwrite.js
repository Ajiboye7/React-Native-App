import { Client, Account, Avatars, ID, Databases } from "react-native-appwrite";
import SignIn from "../app/(auth)/sign-in";


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
const avatars = new Avatars(client)
const databases = new Databases(client)


export const createUser = async (email, password, username) => {
  try{
    const newAccount = await account.create(ID.unique(), email, password, username)

    if(!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await SignIn(email,password)

    const newUser = await databases.createDocument(
        Config.databaseId,
        Config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar:avatarUrl
        }
    )
    return newUser
  }catch(error){
    console.log(error);
    throw new Error(error)
  }
};

 
export const signIn = async (email, password)=>{
    try{
        const session = await account.createEmailSession(email, password)
        return session
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}