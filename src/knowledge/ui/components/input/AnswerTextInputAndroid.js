import React, {Component} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react"
import {knowledgeStore} from "../../../KnowledgeStore";
import AnswerTextInput from "./AnswerTextInput";

@observer
export default class AnswerTextInputAndroid extends Component {
  render() {
    if (knowledgeStore.currentAnswerInputVisible === false) {
      return null
    }
    return (
      <View style={styles.container}>
        <AnswerTextInput/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});
