import React, {Component} from "react";
import {Animated, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard} from "react-native";
import {observer} from "mobx-react"
import {knowledgeStore} from "../../../KnowledgeStore";
import AnswerTextInput from "./AnswerTextInput";

@observer
export default class AnswerTextInputIOS extends Component {
  constructor(props) {
    super(props);
    this.paddingInput = new Animated.Value(0);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.paddingInput, {
      duration: event.duration,
      toValue: 20,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.paddingInput, {
      duration: event.duration,
      toValue: 0,
    }).start();
  };

  render() {
    if (knowledgeStore.currentAnswerInputVisible === false) {
      return null
    }
    else
      return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <Animated.View style={{marginBottom: this.paddingInput}}>
            <AnswerTextInput/>
          </Animated.View>
        </KeyboardAvoidingView>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});
