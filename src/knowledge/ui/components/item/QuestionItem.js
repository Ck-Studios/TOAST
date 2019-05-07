import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, Text, View} from "react-native";
import AnswerList from "../list/AnswerList";
import {knowledgeService} from "../../../KnowledgeService"
import {observer} from "mobx-react"
import {observable} from "mobx"
import ReadMoreTextView from "../ReadMoreTextView";
import {GrayImageColor, GrayTextColor, ItemMargin} from "../../../../common/Theme";
import QuestionProfile from "../QuestionProfile";
import Icon from "react-native-vector-icons/MaterialIcons"
import {RETRIEVE_QUESTION} from "../../../../utils/ApolloQuery";
import {Query} from "react-apollo";
import LoadingIndicator from "../../../../common/ui/components/Etc/LoadingIndicator";
import NetworkErrorAlert from "../../../../common/ui/components/Etc/NetworkErrorAlert";

const AnswerListApollo = ({id}) => (<Query
  query={RETRIEVE_QUESTION}
  variables={{id: id}}
>
  {({loading, error, data}) => {
    if (loading) return <LoadingIndicator/>;
    if (error) return <NetworkErrorAlert/>;
    const answerList = data.question.answerList;
    return (
      <AnswerList
        commentVisible={this.commentVisible}
        data={answerList}
        keyExtracter={(item) => item.id}
        id={id}
      />
    )
  }}
</Query>);

@observer
export default class QuestionItem extends Component {
  @observable numberOfLines = 1;
  @observable commentVisible = false;

  showComments() {
    this.commentVisible = true;
  }

  hideComments() {
    this.commentVisible = false;
  }

  getFooter(item) {
    if (this.commentVisible) {
      return (
        <View style={styles.readAnswerContainer}>
          <TouchableOpacity
            style={styles.readAnswer}
            onPress={() => {
              this.hideComments();
            }
            }>
            <Icon name={'expand-less'} size={30} color={GrayTextColor}/>
          </TouchableOpacity>
          <AnswerListApollo id={item.id}/>
        </View>
      )
    }
    else if (item.answerNum) {
      return (
        <View style={styles.readAnswerContainer}>
          <TouchableOpacity
            style={styles.readAnswer}
            onPress={() => this.showComments()}
          >
            <Text style={styles.readAnswerText}>
              {item.answerNum + '개의 답변이 있습니다.'}
            </Text>
            <Icon name={'expand-more'} size={30} color={GrayTextColor}/>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <View style={styles.readAnswerContainer}>
          <TouchableOpacity
            style={styles.readAnswer}
            onPress={() => knowledgeService.showAnswerInput(item.id)}
          >
            <Text style={[styles.readAnswerText, {marginTop: 10, marginBottom: 10,}]}>
              아직 답변이 없습니다. 여기를 눌러 답변해주세요!
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <QuestionProfile
        />
        <ReadMoreTextView
          style={styles.contentContainer}
          textStyle={styles.contentText}
          content={this.props.item.content}
        />
        {this.getFooter(this.props.item)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: GrayImageColor,
    paddingBottom: 10,
    flex: 1,
    ...ItemMargin,
  },

  contentContainer: {
    marginBottom: 15,
    marginTop: 15,
  },
  contentText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NanumSquareR',
  },
  answerButton: {},
  readAnswerContainer: {},
  readAnswer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  readAnswerText: {
    color: GrayTextColor,
    fontFamily: 'NanumSquareB',
  },
  readAnswerIcon: {},

});
