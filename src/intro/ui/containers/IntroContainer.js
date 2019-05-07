import React, {Component} from "react"
import {
  ImageBackground, Text, Alert, StyleSheet, Button, Dimensions, View, Image, TextInput,
  FlatList, ScrollView, AsyncStorage, Keyboard, TouchableWithoutFeedback
} from "react-native";
import {
  ContentText,
  DebugLayout,
  GrayImageColor,
  GrayTextColor,
  LargeSubtitleText,
  RightwardBiasedBackButton
} from "../../../common/Theme";
import {observer} from "mobx-react";
import {observable} from "mobx";
import client from "../../../utils/ApolloClient";
import {CREATE_ANSWER, SIGN_IN, SIGN_UP} from "../../../utils/ApolloQuery";
import Icon from "react-native-vector-icons/Feather";
import firebase from "react-native-firebase";
import SplashContainer from "../../../common/ui/containers/SplashContainer";
import {authUser} from "../../../application/AuthService";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import {requestNotificationPermission} from "../../../application/NotificationService";

const {width, height} = Dimensions.get('window');

@observer
export default class IntroContainer extends Component {
  @observable step = 1;
  @observable isLoading = false;
  @observable betaCode = '';

  signIn() {
    client.getInstance().mutate(
      {
        mutation: SIGN_IN,
        variables: {
          id: this.id,
          password: this.password,
        }
      })
      .then((response) => {
        console.warn(response.data.tokenAuth.token)
      })
      .catch(() => {
        Alert.alert("아이디와 비밀번호를 확인해 주세요!")
      })
  }

  render() {
    if (this.step === 1)
      return (
        <View style={styles.container}>
          <View style={{flex: 2,}}/>
          <View
            style={{flex: 8, alignContent: 'center'}}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={require('../../../../static/toast_intro_logo.png')}
            />
          </View>
          <View style={{flex: 1,}}/>
          <View
            style={{flex: 10,}}>
            <Text style={styles.title1}>토스트에 오신 것을 환영합니다</Text>
            <Text style={styles.content1}>토스트는 아직 초기 버전이며,{'\n'}
              일부 기능과 제한된 정보만 제공되고 있습니다.{'\n'}{'\n'}
              아래 버튼을 눌러 자세한 사항을 읽어주세요.</Text>
            <Button
              style={styles.button}
              title={'알겠습니다'}
              onPress={() => this.step = 2}
            />
          </View>
        </View>
      );

    if (this.step === 2)
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView style={styles.container}>
            <Text style={styles.title2}>서비스 안내</Text>
            <Text style={styles.content2}>토스트는 아직 초기 버전이므로 성균관대학교 재학생을 대상으로 서비스중이며,
              서비스 제공 상태가 불완전할 수 있습니다.{'\n'}{'\n'}
              토스트 개발팀은 토스트를 사용하시는 분들의 피드백을 빠르게 반영하여
              여러분에게 꼭 필요한 서비스가 되고자 합니다.{'\n'}{'\n'}
              서비스와 관련하여 앱 내의 '건의 및 제보' 메뉴를 통하여 건의, 오류 제보, 칭찬 등 어떤 의견이라도 환영합니다.</Text>

            {[
              {icon: 'refresh-cw', description: '토스트가 지원하는 기능이나 제공되는 정보가\n빠르게 추가, 변경 또는 삭제될 수 있습니다.'},
              {icon: 'eye-off', description: '아직 성균관대학교 재학생만 이용할 수 있습니다.'},
              {icon: 'cloud-off', description: '서비스가 일시적으로 중단되거나, \n추후 데이터가 초기화될 수 있습니다.'},
              {icon: 'download-cloud', description: '자주 업데이트가 시행될 수 있습니다.'},
            ].map((item) => {
              return (
                <View style={{flexDirection: 'row',}} key={item.icon}>
                  <Icon name={item.icon} style={styles.icon} size={18} color={GrayTextColor}/>
                  <Text style={styles.content2}>
                    {item.description}
                  </Text>
                </View>);
            })}

            <View style={{height: 5,}}/>

            <Text style={styles.content2}>데브하이 창업동아리 소속이신 분은 아래에 사전에 부여받은 코드를 입력해주세요.
              (코드가 없으신분은 입력하지 않으셔도 이용이 가능합니다.)</Text>

            <TextInput
              style={styles.input}
              placeholder={'코드를 입력하세요'}
              onChangeText={(betaCode) => {
                this.betaCode = betaCode;
              }}
              value={this.betaCode}
              underlineColorAndroid={'transparent'}
            />

            {!this.isLoading &&
            <Button
              style={{marginBottom: 30,}}
              title={'토스트 시작하기'}
              onPress={() => {

                this.isLoading = true;

                // console.warn('betaCode:', this.betaCode);
                firebase.analytics().setUserProperty('BETA CODE', this.betaCode);

                requestNotificationPermission();
                authUser('SIGN_UP');
              }}
            />
            }

            {this.isLoading && <LoadingIndicator/>}

          </ScrollView>
        </TouchableWithoutFeedback>
      );

    return null;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  title1: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 20,
    color: 'black',
    fontFamily: 'NanumSquareEB',
    textAlign: 'center',
  },

  content1: {
    marginBottom: 30,
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'NanumSquareL',
    textAlign: 'center',
  },

  title2: {
    marginTop: 80,
    marginBottom: 20,
    fontSize: 24,
    color: 'black',
    fontFamily: 'NanumSquareEB',
  },

  content2: {
    marginBottom: 20,
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'NanumSquareL',
  },

  icon: {
    marginRight: 20,
  },

  input: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'NanumSquareR',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#13B8BF',
    borderRadius: 3,
  },

});