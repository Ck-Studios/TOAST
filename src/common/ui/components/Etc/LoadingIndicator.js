import {Component} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ThemeColor} from "../../../Theme";
import React from "react";

export default class LoadingIndicator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={ThemeColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});