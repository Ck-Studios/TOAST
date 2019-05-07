import React, {Component} from "react";
import {Image, StyleSheet, View, Text} from "react-native";
import {DebugLayout, GrayTextColor} from "../../../common/Theme";
import {userStore} from "../../../user/UserStore";

export default class QuestionProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.userProfileImage}
          source={userStore.profile}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>{userStore.name}</Text>
          <Text style={styles.university}>{userStore.major} . {this.props.time}</Text>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex:1,
    alignItems: 'center',

  },

  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  profileTextContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NanumSquareB',
  },
  university: {
    fontSize: 12,
    color: GrayTextColor,
    fontFamily: 'NanumSquareR',

  },
});