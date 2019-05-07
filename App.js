/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Alert,
  View
} from 'react-native';
import {Container} from "./src/common/Theme";
import {SafeAreaView, StyleSheet, BackHandler} from "react-native";
import TdiMessage from "./src/tdi/ui/components/TdiMessage";
import {RootStack} from "./src/application/Navigator";
import {ApolloProvider} from "react-apollo";
import client from "./src/utils/ApolloClient";
import firebase from 'react-native-firebase';
import codePush from "react-native-code-push";

//TODO :: isMount... 무시하는 코드 나중에 지워야함.
import {ignoreWarnings} from "react-native/Libraries/ReactNative/YellowBox";
import {disposeNotificationService, setupNotificationService} from "./src/application/NotificationService";
import {observer} from "mobx-react";
import {observable} from "mobx";
import luna from "./src/utils/Luna";
import NavigationService from "./src/application/NavigationService";
import NoticeAlarmTutorial from "./src/application/components/tutorial/NoticeAlarmTutorial";
import {applicationStore} from "./src/application/ApplicationStore";
import IcampusParsingTutorial from "./src/application/components/tutorial/IcampusParsingTutorial";

ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

@observer
class App extends Component<Props> {
  @observable status = true;

  componentDidMount() {
    setupNotificationService();

    if (__DEV__) {
      // console.warn("YEAH! DEBUG MODE");
      firebase.analytics().setAnalyticsCollectionEnabled(false)
    }

    luna.get('https://luna.toast.one/status')
      .then((response) => {
        response = response.data;
        if (response.result !== 'ok') {
          this.status = false;
          Alert.alert(response.title, response.message);
        }
      })
      .catch((error) => {
        this.status = false;
        Alert.alert('서버에 연결할 수 없습니다.', '네트워크 연결을 확인해주세요.');
      });
  }

  componentWillUnmount() {
    disposeNotificationService()
  }

  render() {
    return (
      <ApolloProvider client={client.getInstance()}>
        {
          this.status &&
          <SafeAreaView style={styles.container}>
            <RootStack/>
            <TdiMessage/>
            {applicationStore.noticeAlarmTutorial && <NoticeAlarmTutorial/>}
            {applicationStore.icampusPasringTutorial && <IcampusParsingTutorial/>}
          </SafeAreaView>
        }
      </ApolloProvider>
    );
  }
}

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

export default App = codePush(codePushOptions)(App);

const styles = StyleSheet.create({
  container: {
    ...Container,
  },
});

