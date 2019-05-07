import React, {Component} from "react"
import {Animated, Platform, StyleSheet, TouchableOpacity, View, BackHandler} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {RightwardBiasedBackButton, ThemeColor} from "../../../Theme";
import NavigationService from "../../../../application/NavigationService";
import BackButton from "../Button/BackButton";

export default class RetrieveShell extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rightwardBiasedBackButton}>

          {/*BackButton*/}
          <View style={styles.backButtonContainer}>
            <BackButton style={styles.backButton}/>
          </View>
        </View>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  rightwardBiasedBackButton: {
    ...RightwardBiasedBackButton,
    alignContent: 'center',
  },
  backButtonContainer: {
    flex: 1,
  },

  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    ...Platform.select({
      ios: {
        marginTop: 15,
      },
    })
  },
});