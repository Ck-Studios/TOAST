import React, {Component} from 'react';
import {WebView, StyleSheet, View} from "react-native";
import Header from "../components/Header";
import {WhiteBackgroundColor} from "../../Theme";

export default class WebBrowserContainer extends Component {
  render() {
    let {title, uri} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Header title={title} navigation={this.props.navigation}/>

        <WebView
          style={styles.webview}
          source={{uri: uri}}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteBackgroundColor,
  },

  webview: {
    height: '100%',
    width: '100%',
  },
});