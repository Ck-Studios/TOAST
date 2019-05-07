import firebase from "react-native-firebase";
import {Alert} from "react-native";
import NavigationService from "./NavigationService";
import client from "../utils/ApolloClient";
import {REFRESH_FCM_TOKEN} from "../utils/ApolloQuery";
import {archiveService} from "../archive/ArchiveService";


export function requestNotificationPermission() {
  firebase.messaging().hasPermission()
    .then(enabled => {
      if (enabled) {
        // user has permissions
      } else {
        // user doesn't have permission
        firebase.messaging().requestPermission()
          .then(() => {
            // User has authorised
          })
          .catch(error => {
            // User has rejected permissions
          });
      }
    });
}

export function setupNotificationService() {
  firebase.messaging().subscribeToTopic('test');

  this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
    // console.warn(message);
    // Alert.alert(JSON.stringify(message));
    // const notification = new firebase.notifications.Notification()
    //   .setTitle('새 공지사항이 있습니다.')
    //   .setBody('나에게 맞는 새 공지사항이 있습니다.')
    //   .setData({
    //     key1: 'value1',
    //     key2: 'value2',
    //   });
    //
    // notification
    //   .android.setChannelId('channelId')
    //   .android.setSmallIcon('ic_launcher');
    //
    // notification
    //   .ios.setBadge(0);
    //
    // firebase.notifications().displayNotification(notification);
  });

  // onNotification : 앱이 포그라운드에서 실행중인 상태에서 노티피케이션이 발생한 경우
  this.notificationListener = firebase.notifications().onNotification((notification) => {
    // Process your notification as required
    // Alert.alert('onNotification', +JSON.stringify(notification.data));
  });

  // onNotificationDisplayed : 앱이 실행중인 상태에서 로컬 노티피케이션이 '표시' 된 경우 (iOS)
  this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
    // Process your notification as required
    // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    // Alert.alert('onNotificationDisplayed', JSON.stringify(notification.data));
  });

  // onNotificationOpened : 앱이 백그라운드에서 실행중이고, 사용자가 노티피케이션을 누른 경우
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    const action = notificationOpen.action;
    const notification = notificationOpen.notification;

    NavigationService.navigate('Archive');
    // Alert.alert('onNotificationOpened', action + "\n" + JSON.stringify(notification.data));
  });

  // getInitialNotification : 앱이 완전히 종료되어 백그라운드 처리가 불가능한 상황에서, 노티를 눌러 처음으로 앱을 실행한 경우
  firebase.notifications().getInitialNotification()
    .then((notificationOpen) => {
      if (notificationOpen) {
        const action = notificationOpen.action;
        const notification = notificationOpen.notification;

        archiveService.loadAlarmWidgetData();

        setTimeout(() => {
          NavigationService.navigate('Archive');
        }, 1500);
        // Alert.alert('getInitialNotification', action + "\n" + JSON.stringify(notification.data));
      }
    });
}

export function disposeNotificationService() {
  this.messageListener();
  this.notificationOpenedListener();
  this.notificationListener();

  if (this.onTokenRefreshListener)
    this.onTokenRefreshListener();
}