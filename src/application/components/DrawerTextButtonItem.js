import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DebugLayout, GrayImageColor, GrayTextColor, ThemePinkColor,} from "../../common/Theme";
import Icon from "react-native-vector-icons/Entypo"

export default class DrawerTextButtonItem extends Component {
  render() {
    const {title, newsNumber, newsColor, headerColor} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
      >
        {
          headerColor ?
            <Icon name={'dot-single'} size={27} color={headerColor}/> : null
        }
        <Text style={styles.title}>{title}</Text>
        {
          newsColor ?
            <View style={[styles.newsContainer, {backgroundColor: newsColor}]}>
              <Text style={styles.news}>{newsNumber}</Text>
            </View> : null
        }
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: GrayImageColor,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NanumSquareR',
    flex: 1,
  },
  newsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 30,
    borderRadius: 7,
    justifyContent: 'center',
  },
  news: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareB',

  },
});
