import React, {Component} from "react";
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from "react-native"
import {ContentText, Shadow, ThemeColor} from "../../../common/Theme";
import TransparentCardItem from "../../../common/ui/components/TransparentCardItem";
import WidgetShell from "../../../common/ui/components/WidgetShell";

export default class SuggestWidget extends Component {
  render() {
    return (
      <WidgetShell
        title={'오류 제보 및 제안'}
        navigation={this.props.navigation}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('SuggestionContainer');
          }}>
          <Text style={styles.text}>이곳을 터치하여 자유롭게 의견을 적어주세요. </Text>
        </TouchableOpacity>
      </WidgetShell>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Shadow,
    marginBottom: 20,
    backgroundColor: 'white',
  },

  text: {
    ...ContentText,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
  }
});