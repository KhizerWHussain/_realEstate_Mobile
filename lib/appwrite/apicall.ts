import * as linking from "expo-linking";
import {
  appWriteAccount,
  appWriteAvatar,
  appWriteConfig,
  appWriteDatabases,
} from "./appwrite";
import { OAuthProvider, Query } from "react-native-appwrite";
import { openAuthSessionAsync } from "expo-web-browser";

export const ApiSignin = async () => {
  try {
    const redirectUri = linking.createURL("/");

    const response = appWriteAccount.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) {
      throw new Error("failed to login");
    }

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") {
      throw new Error("Failed to Login");
    }

    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) {
      throw new Error("User does not exist or secret not found");
    }

    const session = await appWriteAccount.createSession(userId, secret);

    if (!session) {
      throw new Error("failed to create session");
    }

    return session;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const ApiLogout = async () => {
  try {
    await appWriteAccount.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const ApiGetUser = async () => {
  try {
    const response = await appWriteAccount.get();

    if (response.$id) {
      const userAvatar = appWriteAvatar.getInitials(response.name);

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const APIGetProperties = async () => {
  try {
    const result = await appWriteDatabases.listDocuments(
      appWriteConfig.databaseId!,
      appWriteConfig.propertiesCollectionID,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return result.documents;
  } catch (error) {
    console.error("error =>", error);
    return [];
  }
};

interface APIGetPropertiesUsingQueryType {
  filter: string;
  query: string;
  limit?: number;
}

export const APIGetPropertiesUsingQuery = async ({
  filter,
  query,
  limit,
}: APIGetPropertiesUsingQueryType) => {
  try {
    const builtQuery = [Query.orderAsc("$createdAt")];

    if (filter && filter !== "ALL") {
      builtQuery.push(Query.equal("type", filter));
    }

    if (query) {
      builtQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );
    }

    if (limit) {
      builtQuery.push(Query.limit(limit));
    }

    const result = await appWriteDatabases.listDocuments(
      appWriteConfig.databaseId!,
      appWriteConfig.propertiesCollectionID,
      builtQuery
    );

    return result.documents;
  } catch (error) {
    console.log("error =>", error);
    return [];
  }
};

export const APIGetPropertyById = async ({ id }: { id: string }) => {
  try {
    const result = await appWriteDatabases.getDocument(
      appWriteConfig.databaseId!,
      appWriteConfig.propertiesCollectionID!,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
