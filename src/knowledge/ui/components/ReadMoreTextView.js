import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react"
import {observable} from "mobx"

@observer
export default class readMoreTextView extends Component {
  isInitial=true;
  @observable numberOfLines;
  @observable showAllText = false;

  getInitialHeight(layout) {
    const {height} = layout;
    if (height > 70 ) {
      this.numberOfLines = 4;
      this.isInitial = false;
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text style={this.props.textStyle}
          numberOfLines={this.numberOfLines}
          onLayout={(event) => {
            if (this.isInitial)
            this.getInitialHeight(event.nativeEvent.layout)
          }}

        >{this.props.content}</Text>
        {this.numberOfLines ?
          <TouchableOpacity
            onPress={() => this.numberOfLines = 0}>
            <Text>더보기</Text>
          </TouchableOpacity> : null
        }
      </View>
    )
  }
}
