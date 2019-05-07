import {Text, TouchableOpacity,StyleSheet, View} from "react-native";
import {tdiService} from "../../../tdi/TdiService";
import Icon from "react-native-vector-icons/Ionicons";
import {DebugLayout, HeaderIconSize, ThemeColor} from "../../Theme";
import React, {Component} from "react";

export default class HeaderWithDrawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.openDrawer();
            tdiService.dismiss();
          }}>
          <Icon name={"md-menu"} size={HeaderIconSize} color={ThemeColor}/>
        </TouchableOpacity>
        <View style={styles.titleContainer}/>
        {this.props.children}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flex: 1,
  },
  placeholder: {
    fontSize: 16,
    fontFamily: 'NanumSquareR',
    color: '#cccccc',
  },

  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: 'NanumSquareR',
    color: 'black'
  }
});