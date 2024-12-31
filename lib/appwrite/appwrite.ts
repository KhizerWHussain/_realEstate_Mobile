import { Account, Avatars, Client, Databases } from "react-native-appwrite";

type AppWriteConfigType = {
  platform: string;
  endpoint: string;
  projectID: string;
  databaseId: string;
  galleriesCollectionID: string;
  reviewsCollectionID: string;
  agentsCollectionID: string;
  propertiesCollectionID: string;
};

export const appWriteConfig: AppWriteConfigType = {
  platform: "com.kh.reestate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
  projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string,
  galleriesCollectionID: process.env
    .EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID as string,
  reviewsCollectionID: process.env
    .EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID as string,
  agentsCollectionID: process.env
    .EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID as string,
  propertiesCollectionID: process.env
    .EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID as string,
};

export const appWriteClient = new Client();

appWriteClient
  .setEndpoint(appWriteConfig.endpoint!)
  .setProject(appWriteConfig.projectID!)
  .setPlatform(appWriteConfig.platform);

export const appWriteAvatar = new Avatars(appWriteClient);
export const appWriteAccount = new Account(appWriteClient);

export const appWriteDatabases = new Databases(appWriteClient);
