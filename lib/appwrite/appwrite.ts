import { Account, Avatars, Client } from "react-native-appwrite";

type AppWriteConfigType = {
  platform: string;
  endpoint: string | undefined;
  projectID: string | undefined;
};

export const appWriteConfig: AppWriteConfigType = {
  platform: "com.kh.reestate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
  projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
};

export const appWriteClient = new Client();

appWriteClient
  .setEndpoint(appWriteConfig.endpoint!)
  .setProject(appWriteConfig.projectID!)
  .setPlatform(appWriteConfig.platform);

export const appWriteAvatar = new Avatars(appWriteClient);
export const appWriteAccount = new Account(appWriteClient);
