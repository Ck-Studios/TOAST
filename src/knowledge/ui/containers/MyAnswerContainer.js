import {Component} from "react";
import React from "react";
import QuestionList from "../components/list/QuestionList";
import {Button, StyleSheet, Text, View} from "react-native";

export default class MyAnswerContainer extends Component {
  render() {
    return (
      <QuestionList
        style={{
          flex: 1,
          marginTop: 15,
        }}
        filter={'answer'}
      />
    )
  }
}

const styles = StyleSheet.create({

});