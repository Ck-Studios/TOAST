import React, {Component} from 'react';
import {
  WebView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Button,
  ScrollView,
  Keyboard,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import Header from "../../../common/ui/components/Header";
import {GrayTextColor, WhiteBackgroundColor} from "../../../common/Theme";
import {observer} from "mobx-react";
import {observable} from "mobx";
import luna from "../../../utils/Luna";
import SplashContainer from "../../../common/ui/containers/SplashContainer";
import firebase from "react-native-firebase";

@observer
export default class SuggestionContainer extends Component {
  @observable text = '';

  render() {
    // let {title, uri} = this.props.navigation.state.params;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <Header title={'건의 및 제안'} hideSearch={true} navigation={this.props.navigation}/>

          <View style={styles.suggestionContainer}>
            <Text style={styles.title2}>토스트에 대한 의견을 보내주세요.</Text>
            <Text style={styles.content2}>토스트 개발팀은 여러분들의 소중한 의견을 빠르게 반영하여 더 나은 서비스가 되고자 합니다.{'\n'}{'\n'}
              토스트를 이용하면서 불편했던 점, 개선되었으면 하는 점, 추가로 필요한 정보 등 어떤 의견이라도 환영합니다.{'\n'}{'\n'}
              보내주신 의견은 빠짐없이 팀원 모두가 공유하며, 익명으로 기록됩니다.{'\n'}{'\n'}
              답변이 필요하신 분은 help@toast.one 으로 메일을 주시거나, 카카오톡 플러스친구 @toast 로 문의해주시면 빠르게 답변 드리도록 하겠습니다.
            </Text>
            <TextInput
              style={styles.input}
              placeholder={'이곳을 터치하여 내용을 입력하세요.'}
              multiline={true}
              numberOfLines={5}
              editable={true}
              // placeholder={searchStore.placeholder.title}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => {
                this.text = text;
              }}
              value={this.text}
              // onSubmitEditing={this.onEnter}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (this.text.trim() === '') {
                Alert.alert('내용을 입력해주세요.');
                return;
              }

              self = this;
              const SUGGESTION_ENDPOINT = 'https://hooks.slack.com/services/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';
              const message =
                "UID : " + firebase.auth().currentUser.uid + "\n" +
                "DATE : " + new Date() + "\n" +
                "TEXT : " + this.text;

              luna.post(SUGGESTION_ENDPOINT,
                {
                  'text': message,
                })
                .then(function (response) {
                  self.text = '';
                  Alert.alert('소중한 의견 감사합니다.');
                })
                .catch(function (error) {
                  Alert.alert('오류가 발생하였습니다.\n네트워크를 확인해주세요.');
                  console.warn(error);
                });
            }}>
            <Text
              style={styles.button}>
              제출하기
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteBackgroundColor,
  },

  suggestionContainer: {
    marginLeft: 20,
    marginRight: 20,
  },

  title2: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 24,
    color: 'black',
    fontFamily: 'NanumSquareEB',
  },

  content2: {
    marginBottom: 20,
    fontSize: 14,
    color: '#000000',
    fontFamily: 'NanumSquareL',
  },

  icon: {
    marginRight: 20,
  },

  input: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'NanumSquareR',
    height: 80,
    marginBottom: 20,
  },

  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7E7E8F55',
    textAlign: 'center',
    margin: 20,
    color: '#7E7E8F',
  },

});