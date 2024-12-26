import * as linking from "expo-linking";
import { appWriteAccount, appWriteAvatar } from "./appwrite";
import { OAuthProvider } from "react-native-appwrite";
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
