import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import {GrayDividerColor} from "../../../Theme";

export default class HorizontalLine extends Component {
  render() {
    return (
      <View style={[styles.line, this.props.style]}/>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    // margin : 15로 변경하지 마세요. (오버라이드를 위하여)
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,

    width: '100%',
    height: 1,
    backgroundColor: GrayDividerColor,
  },
});