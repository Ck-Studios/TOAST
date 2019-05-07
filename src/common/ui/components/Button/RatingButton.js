import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import {RetrieveButton, SmallContentText, SmallContentTextBold} from "../../../Theme";

export default class RatingButton extends Component {

  render() {
    return (
      <TouchableOpacity
        style={RetrieveButton}
        onPress={() => console.warn("hihi")}>
        <Icon style={styles.ButtonIcon}
              name={"exclamation"} size={24} color={"black"}/>
        <Text style={SmallContentText}>오류 </Text>
        <Text style={SmallContentTextBold}>제보하기</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  ButtonIcon: {
    marginRight: 5,
  }
});
