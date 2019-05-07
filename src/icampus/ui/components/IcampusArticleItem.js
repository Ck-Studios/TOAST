import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {
  ContentText,
  ContentTextBold,
  GrayTextColor,
  ThemeColor,
} from "../../../common/Theme";
import {timeCalculator} from "../../../utils/TimeCalculator";
import NavigationService from "../../../application/NavigationService";

export default class IcampusArticleItem extends Component {
  render() {
    const item = this.props.item;

    let typeBadge = '';
    let typeBadgeColor = ThemeColor;

    if (item.type === 'notice') {
      typeBadge = '공지사항';
      typeBadgeColor = ThemeColor;
    } else if (item.type === 'homework') {
      typeBadge = '과제';
      typeBadgeColor = '#2980B9';
    } else if (item.type === 'data') {
      typeBadge = '자료실';
      typeBadgeColor = '#27AE60';
    } else if (item.type === 'qna') {
      typeBadge = '질문과 답변';
      typeBadgeColor = '#E74C3C';
    }

    return (
      <TouchableOpacity
        style={{flex: 1,}}
        onPress={() => {
          console.warn(item);
          NavigationService.navigate('IcampusRetrieveContainer', {item: item})
        }}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <View style={{flexDirection: 'row', flex: 1, alignItems: 'center',}}>
                <Text style={[styles.badge, {backgroundColor: typeBadgeColor,}]}>{typeBadge}</Text>
                <Text
                  style={styles.title}
                  numberOfLines={2}>
                  {item.title}
                </Text>

                <Text style={styles.content}>
                  {timeCalculator.getAge(item.createdDatetime)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },

  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },

  badge: {
    ...ContentTextBold,
    padding: 5,
    borderRadius: 2,
    color: 'white',
    marginRight: 10,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    ...ContentText,
    flex: 1,
  },

  content: {
    ...ContentText,
    fontSize: 12,
    // lineHeight: 30,
    color: GrayTextColor,
  },

  attachIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },

  time: {
    marginLeft: 10,
    color: GrayTextColor,
  }
});
