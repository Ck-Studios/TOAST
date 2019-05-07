import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class TestContentItem extends Component {
  constructor() {
    super();
  }

  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
        }}>
          <Image
            source={{uri: item.poster}}
            style={styles.image}
          />
          <Text style={styles.title}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    margin:10,
    borderRadius:12,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  title:{
    alignSelf:'center',
  },
});