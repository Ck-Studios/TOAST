import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";

export default class BaseList extends Component {

  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.props.data}
        renderItem={this.props.renderItem}
        keyExtractor={this.props.keyExtractor}
        ListHeaderComponent={this.props.ListHeaderComponent}
        ListFooterComponent={this.props.ListFooterComponent}
        //infinity load
        onEndReachedThreshold={1}
        onEndReached={this.props.onEndReached}
        //Refresh control
        onRefresh={this.props.onRefresh}
        refreshing={this.props.refreshing}
        //etc
        showsVerticalScrollIndicator={false}
        onScroll={this.props.onScroll}
      />
    )
  }
}
