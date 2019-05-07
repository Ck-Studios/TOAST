import {Component} from "react";
import React from "react";
import QuestionList from "../components/list/QuestionList";
import {StyleSheet} from "react-native";

export default class MyQuestionContainer extends Component {
  render() {
    return (
      <QuestionList
        style={{
          flex: 1,
          marginTop: 15,
        }}
        filter={'posted_by'}
      />
    )
  }
}

const styles = StyleSheet.create({
});