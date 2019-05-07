import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Animated, Easing, FlatList, StyleSheet, Platform} from "react-native";
import {searchStore} from "../../SearchStore";
import {observer} from "mobx-react"
import Icon from "react-native-vector-icons/Ionicons";
import {HeaderIconSize, SubtitleText, ThemeColor} from "../../../common/Theme";

@observer
export default class SearchButton extends Component {

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SearchContainer',
            {searchType: this.props.searchType})}
        >
          <Icon  name={"md-search"} size={HeaderIconSize} color={ThemeColor}/>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({

});
