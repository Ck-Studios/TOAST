import React, {Component} from "react"
import {View, StyleSheet, Image, Text} from "react-native"

export default class Nothing extends Component {
  render() {
    const size = this.props.size || 80;

    return <View style={[{justifyContent: 'center', alignItems: 'center',}, this.props.style]}>
      <Image
        style={{width: size, height: size, marginTop: 20,}}
        source={{uri: 'https://cdn2.iconfinder.com/data/icons/smiling-face/512/Nothing_Face-512.png'}}/>
      <Text style={{margin: 20,}}>{this.props.message}</Text>
    </View>
  }
}

const styles = StyleSheet.create({});