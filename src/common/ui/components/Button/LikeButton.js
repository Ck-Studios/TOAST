import React, {Component} from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import {
  DebugLayout,
  GrayImageColor, GrayTextColor,
  ThemeColor, ThemePinkColor
} from "../../../Theme";
import {TouchableOpacity, StyleSheet, Text, Alert, View} from "react-native";
import {observer} from "mobx-react"
import {observable} from "mobx";
import {LIKE_ACTIVITY, LIKE_NOTICE} from "../../../../utils/ApolloQuery";
import client from "../../../../utils/ApolloClient";
import {noticeStore} from "../../../../notice/NoticeStore";
import {activityStore} from "../../../../activity/ActivityStore";
import {commonService} from "../../../commonService";

@observer
export default class LikeButton extends Component {
  @observable onSubmit = false;

  _onLikeButtonClicked(item) {
    if (this.onSubmit) return;
    this.onSubmit = true;
    let mutation, store;
    if (this.props.type === 'notice') {
      mutation = LIKE_NOTICE;
      store = noticeStore;
    }
    else if (this.props.type === 'activity') {
      mutation = LIKE_ACTIVITY;
      store = activityStore;
    }
    client.getInstance().mutate({
      mutation: mutation,
      variables: {id: item.id}
    })
      .then(() => {
        commonService.onToggleLikeButtonClicked(this.props.item.id, store, this.props.type);
        this.onSubmit = false;
      })
      .catch(() => {
          Alert.alert("오류가 발생했습니다. 잠시후에 다시 시도해 주세요!");
          this.onSubmit = false;
        }
      )
  }

  render() {
    const item = this.props.item;
    let color;
    if (item.like)
      color = ThemePinkColor;
    else
      color = GrayImageColor;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this._onLikeButtonClicked(item)}>
        <View style={styles.iconContainer}>
          <Icon name={"md-heart"} size={18} color={color} style={styles.icon}/>
        </View>

        <Text style={styles.count}>{item.likeCount}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 30,
  },
  icon: {},
  count: {
    fontSize: 10,
    color: GrayTextColor,
    fontFamily: 'NanumSquareB',
  },
});
