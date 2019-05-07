import React, {Component} from "react"
import {DebugLayout, GrayImageColor, Shadow, ThemeColor} from "../../../common/Theme";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/Feather";


export default class WidgetShell extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.title &&
        <View style={styles.textContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          {this.props.additionalButton}
          {
            this.props.more &&
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(this.props.more)
              }
              }>
              <View style={{paddingRight: 10, paddingLeft: 15}}>
                <Icon name={'more-horizontal'} size={22} color={GrayImageColor}/>
              </View>
              {/*<Text style={styles.more}>더 보기</Text>*/}
            </TouchableOpacity>
          }
        </View>}
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Shadow,
    backgroundColor: 'white',
    paddingBottom: 15,
    marginBottom: 20,

  },
  textContainer: {
    flexDirection: 'row',
    margin: 15,

  },
  title: {
    fontSize: 17,
    fontFamily: 'NanumSquareB',
    flex: 1,
  },
  more: {
    fontSize: 13,
    fontFamily: 'NanumSquareR',
  },
});