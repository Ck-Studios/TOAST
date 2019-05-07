import {TouchableOpacity, StyleSheet,} from "react-native";
import {HeaderIconSize, ThemeColor} from "../../Theme";
import SearchButton from "../../../search/ui/components/SearchButton";
import React, {Component} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "./Header";

export default class HeaderWithSearchButton extends Component {
  render() {
    return (
      <Header
        title={this.props.title}
        navigation={this.props.navigation}>

        {this.props.secondButton &&
        <TouchableOpacity
          style={styles.secondButton}
          onPress={this.props.secondButton.onPress}>
          <Icon name={this.props.secondButton.icon} size={HeaderIconSize} color={ThemeColor}/>
        </TouchableOpacity>}

        {!this.props.removeSearch &&
        <SearchButton
          navigation={this.props.navigation}
          placeholder={this.props.title}
          searchType={this.props.searchType}
          style={this.props.searchButton}
        />}
      </Header>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  secondButton: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchButton: {
    paddingLeft: 20,
    paddingRight: 20,
  }
});