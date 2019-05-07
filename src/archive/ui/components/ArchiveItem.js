import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native"
import {Container, DebugLayout, ThemeColor, ThemePinkColor} from "../../../common/Theme";
import {observer} from "mobx-react";

@observer
export default class ArchiveItem extends Component {
  getHeaderView(type) {
    let text, color;
    switch (type) {
      case 'activity':
        text = '공모전';
        color = ThemePinkColor;
        break;
      case 'notice':
        text = '공지사항';
        color = ThemeColor;
        break;
      case 'icampus_content':
        text = '아이캠퍼스';
        color = '#2980B9';
    }
    return (
      <View style={[styles.header, {backgroundColor: color}]}>
        {/*<Text style={styles.headerText}>*/}
        {/*{text}*/}
        {/*</Text>*/}
      </View>
    )
  }

  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
        {this.getHeaderView(item.type)}
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.content}>{item.contentText}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Container,
    flexDirection: 'row',
    flex: 1,
    margin: 5,
  },

  header: {
    // width: 60,
    // width: 8,
    height: 40,
    marginLeft: 10,
    alignSelf: 'center',
    justifyContent: 'center',

    padding: 3,
    backgroundColor: ThemeColor,
    borderRadius: 5,
    marginTop: 3,
    marginBottom: 3,
  },

  headerText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'NanumSquareB'
  },

  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },

  title: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'NanumSquareB',
    marginBottom: 5,
  },

  content: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'NanumSquareR'
  },
});