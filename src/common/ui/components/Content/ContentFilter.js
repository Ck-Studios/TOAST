import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react"
import {ContentTextBold, DebugLayout, SubtitleText, ThemeColor} from "../../../Theme";
import Icon from "react-native-vector-icons/Entypo"
import HideTopView from "../../../../utils/HideTopView";

@observer
export default class ContentFilter extends Component {
  render() {
    const title = this.props.filter;
    return (
      <HideTopView visible={this.props.visible}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.onPress()}>
          <Text style={styles.text}>{title}</Text>
          <Icon name={'list'} color={ThemeColor} size={18} style={styles.icon}/>
        </TouchableOpacity>
      </HideTopView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    ...SubtitleText,
    fontSize: 16,
    color: ThemeColor,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
});
