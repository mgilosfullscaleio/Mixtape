import { LoginManager, AccessToken } from 'react-native-fbsdk';

const FB_GRAPH_URL = 'https://graph.facebook.com';

export const authorizeWithFacebook = async () => {
  console.log("authorizeWithFacebook func");
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile','email','user_friends']);
    return !result.isCancelled ? true : null;
  }
  catch (e) {
    return null;
  }
}

export const getFBToken = async () => {
  try {
    console.log("getFBToken func");
    const { accessToken } = await AccessToken.getCurrentAccessToken();
    return accessToken;
  }
  catch (e) { return null }
}

export const getFBUserInfo = async (token) => {
  try {
    const data = await fetch(`${FB_GRAPH_URL}/me?access_token=${token}&fields=id,email,picture`)
    return data.json();
  }
  catch (e) {
    return null;
  }
}

export const getFBUserFriends = async (token) => {
  try {
    const data = await fetch(`${FB_GRAPH_URL}/me/friends?access_token=${token}`);
    return data.json();
  }
  catch (e) {
    return null;
  }
}

export const logOutFacebook= async () => {
  try {
    const result = await LoginManager.logOut()
    return !result.isCancelled ? true : null;
  }
  catch (e) {
    return null;
  }
}
