import React, {Component} from "react"
import {Text, View, StyleSheet, TouchableOpacity, Platform} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {DebugLayout, HeaderIconSize, Shadow, SubtitleText, ThemeColor} from "../../Theme";
import SearchButton from "../../../search/ui/components/SearchButton";
import {tdiService} from "../../../tdi/TdiService";
import BackButton from "./Button/BackButton";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <BackButton/>
        <View style={styles.titleContainer}/>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#ffffff',
  },

  titleContainer: {
    flex: 1,
  },

  placeholder: {
    fontSize: 16,
    fontFamily: 'NanumSquareR',
    color: '#cccccc',
  },

  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: 'NanumSquareR',
    color: 'black'
  }
});