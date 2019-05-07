import React, {Component} from 'react';
import {FlatList, Text, View} from "react-native";

export default class BaseGridList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <FlatList
          style={this.props.style}
          data={this.props.data}
          keyExtractor={this.props.keyExtractor}
          renderItem={this.props.renderItem}

          horizontal={false}
          numColumns={2}

          //infinity load
          onEndReachedThreshold={this.props.onEndReachedThreshold}
          onEndReached={this.props.onEndReached}
          //Refresh control
          onRefresh={this.props.onRefresh}
          refreshing={this.props.refreshing}

          //etc
          onScroll={this.props.onScroll}
          showsVerticalScrollIndicator={false}
        />
    )
  }
}
