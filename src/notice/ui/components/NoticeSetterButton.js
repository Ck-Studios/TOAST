import React, {Component} from "react"
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Shadow} from "../../../common/Theme";

export default class NoticeSetterButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.onPress()}>
          <Image
            style={styles.image}
            source={require('../../../../static/curationCompass.png')}/>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={styles.content}>이곳을 터치하여 나만의</Text>
            <Text style={styles.content}>공지사항을 만들어보세요.</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow,
  },
  button: {
    alignItems: 'center',
  },
  content: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'NanumSquareR',
    marginBottom: 5,
  },
  horizontalView: {
    flexDirection: 'row',
  },
  image: {
    width: 45,
    height: 45,
  },
});