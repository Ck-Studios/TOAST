import React, {Component} from "react"
import LikeButton from "./Button/LikeButton";
import ShowOriginButton from "./Button/ShowOriginButton";
import {DebugLayout, GrayImageColor, GrayTextColor, ThemeColor} from "../../Theme";
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {observer} from "mobx-react";
import HitButton from "./Button/HitButton";

@observer
export default class ButtonGroup extends Component {
  render() {
    const {type, item} = this.props;
    if (!item) return null;
    return (
      <View style={styles.ButtonGroup}>
        {(type === 'notice') && <ShowOriginButton item={item}/>}
        <HitButton item={item}/>
        <LikeButton item={item} type={this.props.type}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ButtonGroup: {
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  count: {
    fontSize: 14,
    color: GrayTextColor,
    fontFamily: 'NanumSquareB',
  },
});