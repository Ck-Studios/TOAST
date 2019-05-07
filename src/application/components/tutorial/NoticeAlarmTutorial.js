import React, {Component} from "react";
import {Text, Animated, View, Image, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions} from "react-native";
import {HeaderIconSize, ThemeColor} from "../../../common/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import {applicationStore} from "../../ApplicationStore";

const {width, height} = Dimensions.get('window');
export default class NoticeAlarmTutorial extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 300,
        delay: 400,
      }
    ).start();
  }

  render() {
    return (
      <Animated.View style={[styles.container, {opacity: this.state.fadeAnim}]}>
        <View style={styles.transparentContainer}/>
        <SafeAreaView style={styles.contentView}>
          <View style={styles.highlight}>
            <Icon name={'md-notifications'} size={HeaderIconSize} color={ThemeColor} style={styles.icon}/>
          </View>
          <View style={styles.textContainer}>
            <Image
              style={styles.image}
              color={'white'}
              source={require('../../../../static/top_arrow.png')}/>
            <Text style={styles.text}>이 버튼을 누르면</Text>
            <Text style={styles.text}>키워드 알람을 등록할 수 있어요!</Text>
          </View>
          <View style={{height: height * 0.55}}/>
          <TouchableOpacity
            onPress={() => applicationStore.noticeAlarmTutorial = false}
            style={styles.closeButton}>
            <Text style={styles.closeText}>알겠습니다</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '120%',
    flex: 1,
  },
  transparentContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
    width: '100%',
    height: '120%',
    flex: 1,
  },
  contentView: {
    zIndex: 1,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
    color: 'white',
    fontFamily: 'NanumSquareEB',
    alignSelf: 'center',
  },
  closeText: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 18,
    color: 'white',
    fontFamily: 'NanumSquareEB',
    alignSelf: 'center',
  },
  textContainer: {
    marginLeft: 90,

  },
  closeButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    backgroundColor:'#ffffff22',
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    width: 200,
  },
  highlight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: height * 0.012,
    marginRight: width * 0.12,
  },
});