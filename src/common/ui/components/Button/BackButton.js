import React, {Component} from "react"
import {Text, View, StyleSheet, TouchableOpacity, Platform, BackHandler} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {HeaderIconSize, ThemeColor} from "../../../Theme";
import NavigationService from "../../../../application/NavigationService";

export default class BackButton extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress() {
    NavigationService.goBack();
    return true;
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={() => {
          NavigationService.goBack();
        }}>
        <Icon name={"md-arrow-round-back"} size={HeaderIconSize} color={ThemeColor}/>
      </TouchableOpacity>
    )
  }
}