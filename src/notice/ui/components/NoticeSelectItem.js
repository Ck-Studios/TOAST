import React, {Component} from "react"
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {GrayTextColor, ThemeColor} from "../../../common/Theme";
import {observer} from "mobx-react";

@observer
export default class NoticeSelectItem extends Component {

  render() {
    let item = this.props.item;
    let color;
    if (item.selected) {
      color = ThemeColor;
    }
    else {
      color = GrayTextColor;
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          item.selected = !item.selected;
        }}>
        <Text style={[styles.container, {color: color}]}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  container: {
    fontSize: 13,
    fontFamily: 'NanumSquareB',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
});