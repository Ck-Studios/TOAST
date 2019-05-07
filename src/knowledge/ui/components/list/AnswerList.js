import React, {Component} from "react"
import BaseList from "../../../../common/ui/components/List/BaseList";
import AnswerItem from "../item/AnswerItem";
import SlideDownView from "../../../../utils/SlideDownView";
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {DebugLayout, ThemeColor} from "../../../../common/Theme";
import {knowledgeService} from "../../../KnowledgeService"
import {observer} from "mobx-react";

@observer
export default class AnswerList extends Component {
  height;

  getInitialHeight(layout) {
    const {height} = layout;
    this.height = height;
  }

  render() {
    const commentVisible = this.props.commentVisible;
    if (commentVisible === false) {
      return null;
    }
    return (
      <SlideDownView style={styles.container} height={this.height}>
        <BaseList
          data={this.props.data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <AnswerItem item={item}/>}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.answerButton}
              onPress={() => knowledgeService.showAnswerInput(this.props.id)}>
              <Text style={styles.answerText}>답변하기</Text>
            </TouchableOpacity>
          }
          onLayout={(event) => {
            this.getInitialHeight(event.nativeEvent.layout)
          }}

        />
      </SlideDownView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },

  answerButton: {
    backgroundColor: ThemeColor,
    borderRadius: 5,
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  answerText: {
    color: 'white',
    fontFamily: 'NanumSquareB',

  },
});