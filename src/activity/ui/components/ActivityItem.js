import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ContentText, DebugLayout, GrayTextColor, SubtitleText} from "../../../common/Theme";
import DueDateText from "../../../common/ui/components/Etc/DueDateText";
import ButtonGroup from "../../../common/ui/components/ButtonGroup";

const {width, height} = Dimensions.get('window');

export default class ActivityItem extends Component {
  render() {
    const item = this.props.item;
    const opacity = item.view ? 0.4 : 1;
    return (
      <View style={styles.container} opacity={opacity}>
        <Image
          source={{uri: item.thumbnailUrl}}
          style={styles.image}
        />
          <View style={styles.textContainer}>
          <Text
            numberOfLines={2}
            style={styles.title}>
            {item.title}
          </Text>
          <DueDateText
            style={styles.dueDate}
            dueDate={item.end_datetime ? item.end_datetime.split(' ')[0] : null}/>
          <Text
            style={styles.content}
            numberOfLines={4}>
            {item.contentText}
          </Text>
          {item.view === undefined ? null :
            <ButtonGroup item={item} type={'activity'}/>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    width: width * 0.3,
    height: height * 0.25,
    borderRadius: 5,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  title: {
    ...SubtitleText,
    fontSize: 16,
  },
  content: {
    color: GrayTextColor,
    ...ContentText,
    flex: 1,
  },
  dueDate: {
    color: GrayTextColor,
    marginTop: 5,
    marginBottom: 10,
  },
  likeButton: {
    marginRight: 5,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  }
});
