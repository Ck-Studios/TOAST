import React, {Component} from "react";
import {knowledgeService} from "../../../KnowledgeService";
import SlideUpView from "../../../../utils/SlideUpView";
import {Alert, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react"
import {observable} from "mobx"
import {knowledgeStore} from "../../../KnowledgeStore";
import Icon from "react-native-vector-icons/Entypo"
import {GrayTextColor, Shadow, ThemeColor} from "../../../../common/Theme";
import {Mutation} from "react-apollo";
import {CREATE_ANSWER} from "../../../../utils/ApolloQuery";

@observer
export default class AnswerTextInput extends Component {
  @observable onSubmit = false;
  @observable answerInput = '';

  render() {

    return (
      <Mutation
        mutation={CREATE_ANSWER}
      >
        {createAnswer => (
          <SlideUpView style={styles.container}>
            <View style={{flexDirection: 'row', flex: 1,}}>
              {/*<QuestionProfile />*/}
              {/*<View style={{flex: 1,}}/>*/}

            </View>
            <View style={styles.inputContainer}>
              <TextInput
                multiline={true}
                placeholder={'답변을 입력하세요'}
                onChangeText={(text) => this.answerInput = text}
                value={this.answerInput}
                style={styles.placeholder}
                placeholderTextColor={GrayTextColor}
              />
              <TouchableOpacity
                onPress={() => {
                  if (this.answerInput === '' || this.onSubmit)
                    return;
                  this.onSubmit = true;
                  const question_id = knowledgeStore.currentQuestionId;
                  createAnswer({
                    variables: {id: question_id, content: this.answerInput}
                  }).then(() => {
                    this.onSubmit = false;
                    knowledgeService.hideAnswerInput();
                  }).catch((error) => {
                    this.onSubmit = false;
                    console.warn(error);
                    Alert.alert("제출이 실패되었습니다..");
                  })
                }}>
                <Icon name={'edit'} size={20} color={ThemeColor} style={styles.icon}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => knowledgeService.hideAnswerInput()}>
                <Icon name={'cross'} size={26} color={ThemeColor} style={styles.icon}/>
              </TouchableOpacity>
            </View>
          </SlideUpView>
        )}
      </Mutation>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    ...Shadow,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  placeholder: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'NanumSquareR',
  },
  icon: {
    margin: 5,
  },
  cancelText: {
    fontSize: 14,
    fontFamily: 'NanumSquareR',

  }
});