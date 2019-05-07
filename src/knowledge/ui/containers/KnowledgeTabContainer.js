import React, {Component} from "react";
import {Dimensions, Platform, Text, View} from "react-native";
import {tabBarOptions} from "../../../application/Navigator";
import {knowledgeService} from "../../KnowledgeService";
import AnswerTextInputIOS from "../components/input/AnswerTextInputIOS";
import AnswerTextInputAndroid from "../components/input/AnswerTextInputAndroid";
import Header from "../../../common/ui/components/Header";
import {Container, ThemeColor} from "../../../common/Theme";
import {createMaterialTopTabNavigator} from "react-navigation";
import KnowledgeContainer from "./KnowledgeHomeContainer";
import MyQuestionContainer from "./MyQuestionContainer";
import MyAnswerContainer from "./MyAnswerContainer";

const {width, height} = Dimensions.get('window');

const KnowledgeTab = createMaterialTopTabNavigator(
  {
    '홈': KnowledgeContainer,
    '내 질문': MyQuestionContainer,
    '내 답변': MyAnswerContainer,
  },
  {
    tabBarOptions: {
      activeTintColor: ThemeColor,
      inactiveTintColor: '#868694',
      style: {
        backgroundColor: 'white',
      },

      indicatorStyle: {
        backgroundColor: ThemeColor,
        padding: 1.5,
        borderRadius: 2,
        width: width * 0.2222,
        marginLeft: width * 0.0666,

      },
      labelStyle: {
        fontSize: 14,
        fontFamily: 'NanumSquareB',
      },
    },
  }
);

export default class KnowledgeTabContainer extends Component {
  render() {
    const KnowledgeAnswerInput = Platform.OS === 'ios' ?
      AnswerTextInputIOS : AnswerTextInputAndroid;
    return (
      <View style={Container}>
        <Header
          title={'TOAST Q'}
          navigation={this.props.navigation}
        />

        <View style={{flex: 1,}}>
          <KnowledgeTab
            onNavigationStateChange={() =>
              knowledgeService.hideAnswerInput()
            }/>
          <KnowledgeAnswerInput/>

          <View
            style={{
              flex: 1, position: 'absolute', backgroundColor: '#000000bb',
              top: 0, left: 0, width: '100%', height: '100%',
            }}>

            <Text
              style={{
                color: 'white', position: 'absolute',
                top: '50%', left: 0, width: '100%',
                textAlign: 'center',
              }}
            >
              TOAST Q 기능은 준비중입니다.
            </Text>

          </View>
        </View>
      </View>
    )
  }
}
