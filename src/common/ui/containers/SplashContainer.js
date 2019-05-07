import React, {Component} from 'react';
import {WebView, StyleSheet, View, AsyncStorage, Text, Image} from "react-native";
import {ContentText, WhiteBackgroundColor} from "../../Theme";
import {refreshFcmToken, requestNotificationPermission} from "../../../application/NotificationService";

import {authUser} from "../../../application/AuthService";

export default class SplashContainer extends Component {
  static UID_TOKEN_KEY = "@Toast:uid_token_beta079ba24.1.2";

  componentDidMount() {
    this.loadUID();
  }

  loadUID() {
    AsyncStorage.getItem(SplashContainer.UID_TOKEN_KEY, (err, result) => {
      SplashContainer.uid = result;

      if (SplashContainer.uid) {
        authUser('SIGN_IN');
      } else {
        // authUser('FIRST_RUN');

        requestNotificationPermission();
        authUser('SIGN_UP');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../../../static/curationCompass.png')}/>
        <Text style={styles.text}>토스트를 시작하기 위해{'\n'}정보를 구성하고 있습니다.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 45,
    height: 45,
    margin: 10,
  },

  text: {
    ...ContentText,
    textAlign: 'center',
  },
});
