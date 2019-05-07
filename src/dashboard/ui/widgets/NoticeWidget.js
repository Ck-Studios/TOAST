import React, {Component} from "react";
import NoticeList from "../../../notice/ui/components/NoticeList";
import WidgetShell from "../../../common/ui/components/WidgetShell";
import {StyleSheet, Image, Text, Button, TouchableOpacity, View} from "react-native"
import NavigationService from "../../../application/NavigationService";
import Icon from "react-native-vector-icons/Feather";
import {GrayImageColor} from "../../../common/Theme";

export default class NoticeWidget extends Component {
  render() {
    let button = null;
    if (this.props.data.length) {
      button = <TouchableOpacity
        onPress={() => NavigationService.navigate('NoticeTabContainer', {mode: 'edit'})}
      >
        {/*<Text style={styles.text}>변경</Text>*/}
        <View style={{paddingRight: 10, paddingLeft: 15}}>
          <Icon name={'rotate-ccw'} size={22} color={GrayImageColor}/>
        </View>
      </TouchableOpacity>
    }
    return (
      <WidgetShell
        title={'내가 선택한 공지사항'}
        more={'NoticeTabContainer'}
        navigation={this.props.navigation}
        additionalButton={button}
      >
        {this.props.data.length ?
          <View>

            <NoticeList
              data={this.props.data}
              navigation={this.props.navigation}/>
          </View>
          :
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => NavigationService.navigate('NoticeTabContainer', {mode: 'initialize'})}
            >
              <Image
                style={styles.image}
                source={require('../../../../static/curationCompass.png')}/>
              <View style={{marginTop: 20, alignItems: 'center'}}>
                <Text style={styles.content}>이곳을 터치하여 나만의</Text>
                <Text style={styles.content}>공지사항을 만들어 보세요</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      </WidgetShell>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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

  image: {
    width: 45,
    height: 45,
  },

  text: {
    fontSize: 13,
    fontFamily: 'NanumSquareR',
  }
});