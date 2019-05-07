import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {GrayTextColor} from "../../../common/Theme";
import DueDateText from "../../../common/ui/components/Etc/DueDateText";

const {width, height} = Dimensions.get('window');

export default class ActivityWidgetItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginLeft: 20,
  },

  image: {
    width: width * 0.3,
    height: width * 0.35,
    borderRadius: 5,
    alignSelf: 'center',
  },

  textContainer: {
    marginTop: 10,
    width: width * 0.3,
  },

  title: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'NanumSquareB',
  },

  dueDate: {
    color: GrayTextColor,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },
});
