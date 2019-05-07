import {Component} from "react";
import React from "react";
import {View, Alert, Text, StyleSheet, TouchableOpacity} from "react-native";
import {GrayTextColor} from "../../../Theme";
import NavigationService from "../../../../application/NavigationService";


export default class NetworkErrorAlert extends Component {

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={NavigationService.goBack}>
          <Text style={styles.text}>네트워크 연결이 원활하지 않습니다.</Text>
          <Text style={styles.text}>인터넷 연결을 확인해 주세요.</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 15,
    color: GrayTextColor,
    fontFamily: 'NanumSquareR',
    marginBottom: 10,
  },

});