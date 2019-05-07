import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import {GrayTextColor} from "../../../Theme";

export default class HorizontalCategoryList extends Component {
  render() {
    return (
      <ScrollView
        style={[this.props.style, {flexGrow: 0,}]}
        horizontal={true}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={true}
      >
        {
          this.props.data.map((item) => {
            return (
              <View style={styles.gridItem}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => this.props.onPress(item)}>
                  <Text style={styles.descriptionText}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  gridItem: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },

  iconContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#ddddddaa',
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  descriptionText: {
    padding: 10,
    fontSize: 12,
    color: GrayTextColor,
    fontFamily: 'NanumSquareR',
  },
});