import { Client, Account,ID } from "react-native-appwrite";

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

export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
