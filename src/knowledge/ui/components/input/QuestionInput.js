import React, {Component} from "react"
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react/index";
import {observable} from "mobx";
import {GrayImageColor, GrayTextColor, ItemMargin, ThemeColor} from "../../../../common/Theme";
import QuestionProfile from "../QuestionProfile";
import {Dimensions} from "react-native";
import {Mutation} from "react-apollo";
import {CREATE_QUESTION, GET_QUESTIONS, PAGINATION_LENGTH,} from "../../../../utils/ApolloQuery";

const {width} = Dimensions.get('window');

@observer
export default class QuestionInput extends Component {
  @observable onSubmit = false;

  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_QUESTION}
        update={(cache, {data: {createQuestion}}) => {
          let questions = cache.readQuery({
            query: GET_QUESTIONS,
            variables: {filter: "all", size: PAGINATION_LENGTH, offset: 0}
          }).questions;
          cache.writeQuery({
            query: GET_QUESTIONS,
            variables: {filter: "all", size: PAGINATION_LENGTH, offset: 0},
            data: {questions: [createQuestion, ...questions]}
          });
          questions = cache.readQuery({
            query: GET_QUESTIONS,
            variables: {filter: "posted_by", size: PAGINATION_LENGTH, offset: 0}
          }).questions;
          cache.writeQuery({
            query: GET_QUESTIONS,
            variables: {filter: "posted_by", size: PAGINATION_LENGTH, offset: 0},
            data: {questions: [createQuestion, ...questions]}
          });
        }}
      >
        {createQuestion => (
          <View style={styles.container}>
            <QuestionProfile/>
            <TextInput
              multiline={true}
              placeholder={'궁금한 것을 질문해보세요.'}
              onChangeText={(text) => this.state.input = text}
              value={this.state.input}
              style={styles.placeholder}
              placeholderTextColor={GrayTextColor}
            />
            <TouchableOpacity
              style={styles.questionButton}
              onPress={() => {
                if (this.state.input === '') {
                  Alert.alert('질문을 입력해주세요!');
                  return;
                }
                if (this.onSubmit)
                  return;
                this.onSubmit = true;
                createQuestion({variables: {input: this.state.input}})
                  .then(() => {
                    this.setState({input: ''});
                    this.onSubmit = false;
                  })
                  .catch((error) => {
                    this.onSubmit = false;
                    Alert.alert("오류가 발생하였습니다." + error);
                  });
              }}
            >
              <Text style={styles.questionText}>질문하기</Text>
            </TouchableOpacity>
          </View>
        )}
      </Mutation>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: GrayImageColor,
    marginTop: 15,
    paddingBottom: 10,
    ...ItemMargin,
  },
  questionInput: {
    backgroundColor: 'white',
  },
  placeholder: {
    fontSize: 14,
    fontFamily: 'NanumSquareR',
    marginTop: 15,
    marginBottom: 40,
  },
  questionButton: {
    backgroundColor: ThemeColor,
    borderRadius: 5,
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    marginRight: 10,
    marginBottom: 10,
    width: width * 0.35,
    alignSelf: 'flex-end'
  },
  questionText: {
    color: 'white',
    fontFamily: 'NanumSquareB',

  },
});

