import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ContentText, DebugLayout, GrayTextColor, ItemMargin, SubtitleText, ThemeColor} from "../../../common/Theme";
import Icon from "react-native-vector-icons/Ionicons"
import CreatedDateText from "../../../common/ui/components/Etc/CreatedDateText";

export default class NoticeItem extends Component {

  render() {
    const item = this.props.item;
    const opacity = item.view ? 0.4 : 1;
    return (
      <View style={styles.container} opacity={opacity}>

        <View style={styles.label}/>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text
                style={styles.title}
                numberOfLines={2}>
                {item.title}
              </Text>

              {item.attache && item.attaches.length ?
                null :
                <Icon name={'md-attach'}
                      size={20} style={styles.attachIcon}
                      color={GrayTextColor}/>}
              <CreatedDateText
                style={styles.time}
                createdDatetime={item.createdDatetime ? item.createdDatetime.split(' ')[0] : null}
              />
            </View>
            <Text
              style={styles.content}
              numberOfLines={1}>
              {item.contentText}
            </Text>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...ItemMargin,
    flexDirection: 'row',
    paddingBottom: 7,
  },

  label: {
    padding: 3,
    backgroundColor: ThemeColor,
    borderRadius: 5,
    marginTop: 3,
    marginBottom: 3,
  },

  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    ...ContentText,
    fontSize: 14,
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
