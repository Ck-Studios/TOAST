import React, {Component} from "react";
import {
  StyleSheet,
  View,Text
} from "react-native";
import QuestionList from "../components/list/QuestionList";
import QuestionInput from "../components/input/QuestionInput";

export default class KnowledgeHomeContainer extends Component {
  render() {
    return (
      <QuestionList
        style={{
          flex: 1,
        }}
        ListHeaderComponent={<QuestionInput/>}
        filter={'all'}
      />
    )
  }
}

const styles = StyleSheet.create({
});

