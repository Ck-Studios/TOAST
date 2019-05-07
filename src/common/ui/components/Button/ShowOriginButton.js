import React, {Component} from 'react';
import {Linking, Alert, Text, TouchableOpacity, StyleSheet, View} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {GrayImageColor, GrayTextColor, SmallContentTextBold, ThemeColor} from "../../../Theme";
import {isLinkExist, openLink} from "../../../../utils/Intent";

export default class ShowOriginButton extends Component {
  render() {
    const {url} = this.props.item;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => openLink(url)}>
        <View style={styles.iconContainer}>
          <Icon name={'link'} size={18} color={(isLinkExist(url)) ? ThemeColor : GrayImageColor} style={styles.icon}/>
        </View>
        <Text style={styles.count}>원본</Text>
      </TouchableOpacity>
    )
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
    color: ThemeColor,
    fontFamily: 'NanumSquareB',
  },
});
