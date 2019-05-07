import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Animated, Easing, FlatList, StyleSheet} from "react-native";
import {searchStore} from "../../SearchStore";
import {observer} from "mobx-react"
import Icon from "react-native-vector-icons/Entypo"
import {GrayDividerColor, GrayImageColor} from "../../../common/Theme";

@observer
export default class KeywordItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity
        onPress={() => {
          // TODO : 검색처리
          // searchStore.doSearch = this.keyword;
        }}
        style={styles.container}>
        {
          item.color ?
            <Icon name={'dot-single'} size={27} color={item.color}/> : null
        }
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    borderBottomColor: GrayDividerColor,
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    paddingLeft: 15,

    fontSize: 18,
    color: 'black',
    fontFamily: 'NanumSquareL',
    flex: 1,
  },
});