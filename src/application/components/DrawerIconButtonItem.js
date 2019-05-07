import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {ContentText, DebugLayout, GrayTextColor, SubtitleText, ThemePinkColor} from "../../common/Theme";
import Icon from "react-native-vector-icons/Feather"

export default class DrawerIconButtonItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <View style={[styles.container, {width: this.props.width * 0.2}]}>
        <Icon name={item.icon} style={styles.icon} size={30} color={GrayTextColor}/>
        <Text style={styles.title}>{item.title}</Text>
        {item.news ?
          <View style={styles.newsContainer}>
            <Text style={styles.newsText}>{item.news}</Text>
          </View> : null}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'NanumSquareR',
  },
  newsText: {
    color: 'white',
    fontFamily: 'NanumSquareEB',
  },
  newsContainer: {
    position:'absolute',
    right:5,
    top:5,
    backgroundColor : ThemePinkColor,
    width: 25,
    height: 25,
    borderRadius:12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
