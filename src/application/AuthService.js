import firebase from "react-native-firebase";
import client from "../utils/ApolloClient";
import {REFRESH_FCM_TOKEN, SIGN_IN, SIGN_UP} from "../utils/ApolloQuery";
import {AsyncStorage} from "react-native";
import SplashContainer from "../common/ui/containers/SplashContainer";
import NavigationService from "./NavigationService";

export function refreshFcmToken() {
  firebase.messaging().getToken()
    .then(fcmToken => {
      if (fcmToken) {
        // console.warn("FCM TOKEN : ", fcmToken, "uid : ", firebase.auth().currentUser.uid);

        client.getInstance().mutate({
          mutation: REFRESH_FCM_TOKEN, variables: {
            fcmToken: fcmToken,
          }
        })
          .then((response) => {  // console.warn('Success to FCM Token Refresh', response)
            }
          )
          .catch((error) => console.warn('Failed to FCM Token Refresh', error));
      }
    });
}

export function authUser(type) {
  if (type === 'FIRST_RUN') {
    // console.warn(NavigationService.replace);
    NavigationService.reset('IntroContainer');
  } else {
    firebase.auth().signInAnonymously()
      .then((user) => {
        AsyncStorage.setItem(SplashContainer.UID_TOKEN_KEY, user.uid, () => {
          if (type === 'SIGN_UP') {
            client.getInstance().mutate({
              mutation: SIGN_UP, variables: {
                username: user.uid,
                password: user.uid,
              }
            })
              .then((response) => {
                // console.warn('create user', response.data.createUser.username);
                checkOut(user.uid);
              })
              .catch((error) => console.warn('Sign up error', error));
          } else if (type === 'SIGN_IN') {
            checkOut(user.uid);
          }
        });
      });
  }
}

export function checkOut(uid) {
  client.getInstance().mutate({
    mutation: SIGN_IN, variables: {
      username: uid,
      password: uid
    }
  }).then((response) => {
    client.setToken(response.data.tokenAuth.token);
    refreshFcmToken();
    NavigationService.reset('RootDrawer');
  }).catch((error) => {
    console.warn('Sign in error', error);
    NavigationService.reset('IntroContainer');
  });
}
