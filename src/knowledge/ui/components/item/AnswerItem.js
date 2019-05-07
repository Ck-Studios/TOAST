import React, {Component} from "react"
import {Image, StyleSheet, Text, View,} from "react-native";
import { GrayTextColor, ItemMargin} from "../../../../common/Theme";
import {applicationStore} from "../../../../application/ApplicationStore";
import {userStore} from "../../../../user/UserStore";

export default class AnswerItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
        <Image
          style={styles.userProfileImage}
          source={userStore.profile}/>
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>{userStore.name}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 10,
    flex:1,
    ...ItemMargin,
  },

  userProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  profileTextContainer: {
    justifyContent: 'center',
    marginLeft: 10,
    flex:1,
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NanumSquareB',
  },
  content: {
    fontSize: 16,
    color: GrayTextColor,
    fontFamily: 'NanumSquareR',
  },
});