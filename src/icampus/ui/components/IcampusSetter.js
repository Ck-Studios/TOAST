import React, {Component} from "react"
import {Text, View, StyleSheet, TextInput, Alert, Image, TouchableOpacity} from "react-native";
import {GrayTextColor, Shadow} from "../../../common/Theme";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Mutation} from "react-apollo";
import {SET_USER_SUBJECT} from "../../../utils/ApolloQuery";
import NavigationService from "../../../application/NavigationService";
import {applicationStore} from "../../../application/ApplicationStore";
import {dashboardStore} from "../../../dashboard/DashboardStore";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";


@observer
export default class IcampusSetter extends Component {
  @observable input = '';

  state = {
    onSubmit: false
  };

  onEnter(setUserSubject, mode) {
    const self = this;

    if (this.input.trim() === '' || this.onSubmit)
      return;

    this.setState({onSubmit: true});

    setUserSubject({
      variables: {id: this.input.trim()}
    }).then((result) => {
      console.warn('setUserSubject result', result);
      this.props.onPress();
      this.onSubmit = false;
      dashboardStore.loadIcampusWidgetData();

      if (mode === 'edit')
        NavigationService.goBack();
      else
        applicationStore.icampusPasringTutorial = true;

    }).catch((error) => {
      let message;

      this.setState({onSubmit: false});
      this.onSubmit = false;

      if (error.graphQLErrors && error.graphQLErrors[0].message) {
        message = error.graphQLErrors[0].message;
      }

      if (message === 'icampus id not exist') {
        Alert.alert("올바른 아이디를 입력해주세요.\n아이디는 대소문자를 구분합니다.");
      } else if (message === 'subjects not exist') {
        Alert.alert("이번 학기 수강 내역이 없습니다.");
      } else {
        console.warn(error);
      }
    })
  }

  render() {
    return (
      <Mutation mutation={SET_USER_SUBJECT}>
        {setUserSubject => (
          <View style={styles.container}>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.image}
                source={require('../../../../static/curationCompass.png')}/>
              <Text style={styles.title}>
                킹고 아이디 인증
              </Text>
            </View>

            <Text style={styles.subtitle}>아이캠퍼스에 로그인시 사용하는 킹고 아이디를 입력하세요.</Text>
            <Text style={styles.subtitle}>대소문자를 정확하게 구분해주세요.</Text>

            <TextInput
              style={styles.placeholder}
              placeholder={'이곳을 터치하여 아이캠퍼스 아이디를 입력하세요.'}
              autoCapitalize={'none'}
              onChangeText={(text) => {
                this.input = text;
              }}
              // value={this.input}
              placeholderTextColor={GrayTextColor}
              onSubmitEditing={() => this.onEnter(setUserSubject, this.props.mode)}
            />
            <View style={{flex: 5,}}/>
            <View style={{flexDirection: 'row',}}>
              <View style={{flex: 1,}}/>

              {this.state.onSubmit && <LoadingIndicator/>}

              {!this.state.onSubmit &&
              <TouchableOpacity
                onPress={() => NavigationService.goBack()}
              >
                <Text style={styles.footerButton}>취소</Text>
              </TouchableOpacity>
              }

              {!this.state.onSubmit &&
              <TouchableOpacity
                onPress={() => this.onEnter(setUserSubject, this.props.mode)}>
                <Text style={styles.footerButton}>확인</Text>
              </TouchableOpacity>
              }
            </View>
          </View>
        )}
      </Mutation>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 20,

    // justifyContent: 'center',
    // alignItems: 'center',
    ...Shadow,
  },

  image: {
    width: 45,
    height: 45,
    marginRight: 20,
  },

  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'NanumSquareB',

  },

  subtitle: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'NanumSquareR',
    marginBottom: 5,
    marginTop: 15,
  },

  placeholder: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NanumSquareR',
    marginBottom: 5,
    marginTop: 25,
  },

  footerButton: {
    fontSize: 14,
    fontFamily: 'NanumSquareR',
    color: 'black',
    padding: 10,
    marginLeft: 10,
  },
});