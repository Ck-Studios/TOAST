import React, {Component} from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import {
  BoldShadow,
  Shadow,
  ThemeColor
} from "../../../Theme";
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {observer} from "mobx-react"

@observer
export default class CircularButton extends Component {
  render() {
    const {color, icon} = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        <Icon style={styles.icon} name={icon} size={24} color={'#ffffff'}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: ThemeColor,

    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    ...Shadow,
  },

  icon: {
    alignContent: 'center',
    justifyContent: 'center',
  }
});