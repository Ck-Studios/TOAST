import React, {Component} from 'react';
import {FlatList, Text, View} from "react-native";
import {observer} from "mobx-react"
@observer
export default class BaseHorizontalList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <FlatList
          horizontal={true}
          data={this.props.data}
          ListFooterComponent={this.props.ListFooterComponent
            ? this.props.ListFooterComponent : null}
          keyExtractor={this.props.keyExtractor}
          renderItem={this.props.renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
}