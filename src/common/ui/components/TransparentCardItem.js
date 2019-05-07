import React, {Component} from "react"
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {SubtitleText} from "../../Theme";

export default class TransparentCardItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <ImageBackground
        style={[styles.gridImage, this.props.style]}
        source={{uri: item.image}}
        resizeMode="cover"
        borderRadius={this.props.borderRadius}
      >
        <View
          style={styles.innerFrame}
          borderRadius={this.props.borderRadius}
        >
          <Text style={styles.gridText}>{item.title}</Text>
        </View>
      </ImageBackground>
    )
  }

}


const styles = StyleSheet.create({
  gridImage: {
    flex: 1,
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerFrame: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  gridText: {
    ...SubtitleText,
    color: 'white',
  },
});