import React, {Component} from "react";
import {Image, StyleSheet, View, ImagePickerIOS, Text, Dimensions, TouchableOpacity} from "react-native";
import {Container, DebugLayout, GrayImageColor, GrayTextColor} from "../../../common/Theme";
import {userStore} from "../../../user/UserStore";
import Header from "../../../common/ui/components/Header";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const {height} = Dimensions.get('window');
const PROFILE_SIZE = 125;
const PROFILE_CONTAINER_HEIGHT = height * 0.33;
const EDIT_BUTTON_SIZE = 30;
const EDIT_BUTTON_OFFSET = (PROFILE_CONTAINER_HEIGHT - PROFILE_SIZE) / 2 - EDIT_BUTTON_SIZE / 2;


export default class UpdateProfileContainer extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={'내 프로필'}
          navigation={this.props.navigation}
          hideSearch={true}/>
        <View style={styles.contentContainer}>

          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.profile}
            >
              <Image source={userStore.profile} style={styles.profile}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editProfileButton}
            >
              <FontAwesome name={'pencil'} color={'white'} size={14}/>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalView}>
            <Text style={styles.menuText}>이름</Text>
            <Text style={styles.text}>{userStore.name}</Text>
          </View>
          <View style={styles.horizontalView}>
            <Text style={styles.menuText}>전공</Text>
            <Text style={styles.text}>{userStore.major}</Text>
            <TouchableOpacity onPress={() => console.warn('hi')}>
              <MaterialIcons name={'info-outline'} color={GrayTextColor} size={22} style={styles.icon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalView}>
            <Text style={styles.menuText}>학교</Text>
            <Text style={styles.text}>{userStore.school}</Text>
            <TouchableOpacity onPress={() => console.warn('hi')}>
              <FontAwesome name={'angle-right'} color={GrayTextColor} size={22} style={styles.icon}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.extraText}>기본 정보를 수정하시면 추천에 반영되기전까지 다소 시간이 소요됩니다.</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  uploadAvatar:{
    width:100,
    height:100,
  },
  contentContainer: {
    marginRight: 20,
    marginLeft: 20,
  },
  profileContainer: {
    height: PROFILE_CONTAINER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    borderRadius: 5,
  },
  editProfileButton: {
    width: EDIT_BUTTON_SIZE,
    height: EDIT_BUTTON_SIZE,
    borderRadius: EDIT_BUTTON_SIZE / 2,
    backgroundColor: '#5757FF',
    position: 'absolute',
    bottom: EDIT_BUTTON_OFFSET,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {},
  major: {},
  school: {},
  icon: {
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  menuText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NanumSquareR',
    marginRight: 50,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NanumSquareR',
    flex: 1,
  },
  horizontalView: {
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: GrayImageColor,
  },
  extraText: {
    marginTop: 50,
    fontSize: 11,
    color: GrayTextColor,
    fontFamily: 'NanumSquareR',
  }
});