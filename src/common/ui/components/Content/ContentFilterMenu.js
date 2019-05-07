import React, {Component} from "react"
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Container, ContentText, Shadow, ThemePinkColor} from "../../../Theme";
import SlideUpView from "../../../../utils/SlideUpView";
import Icon from "react-native-vector-icons/Entypo"
import _ from "lodash";

export default class ContentFilterMenu extends Component {
  render() {
    const isVisible = this.props.visible;
    if (!isVisible) return null;
    return (
      <SlideUpView style={styles.container}>
        <View style={styles.horizontalView}>
          <Text style={styles.titleText}>정렬 방식을 선택해주세요</Text>
          <TouchableOpacity
            onPress={() => this.props.onClicksHideButton()}
          >
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        </View>
        {
          _.map(
            [
              {
                name: '최신순',
                sort: '-created_datetime'
              },
              {
                name: '조회순',
                sort: '-hit'
              }
            ],
            (item) => (
              <TouchableOpacity
                style={styles.horizontalView}
                onPress={() => {
                  this.props.onSelectFilterMenu(item);
                  this.props.onClicksHideButton();
                }}>
                <Icon name={'dot-single'} size={27} color={ThemePinkColor}/>
                <Text style={styles.listText}>{item.name}</Text>
              </TouchableOpacity>
            )
          )
        }
      </SlideUpView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    ...Container,
    ...Shadow,
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...ContentText,
    marginTop: 15,
    marginBottom: 10,
    color: "#9B9CAE",
    flex: 1,
  },
  cancelText: {
    ...ContentText,
    marginTop: 15,
    marginBottom: 10,
    color: "#9B9CAE"
  },
  listText: {
    ...ContentText,
    marginTop: 20,
    marginBottom: 20,
  },
});