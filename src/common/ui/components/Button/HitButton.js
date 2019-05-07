import React, {Component} from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import {
  DebugLayout,
  GrayImageColor, GrayTextColor,
  ThemeColor
} from "../../../Theme";
import {StyleSheet, Text, Alert, View} from "react-native";


export default class HitButton extends Component {
  render() {
    const item = this.props.item;
    let color = GrayImageColor;

    if (item.view)
      color = ThemeColor;

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name={'ios-eye'} size={28} color={color} style={styles.icon}/>
        </View>
        <Text style={styles.count}>{item.hit}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 30,
  },
  icon: {},
  count: {
    fontSize: 10,
    color: GrayTextColor,
    fontFamily: 'NanumSquareB',
  },
});
