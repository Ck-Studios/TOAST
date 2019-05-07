import React, {Component} from 'react';
import ArchiveItem from "./ArchiveItem";
import {FlatList, Text, TouchableOpacity, View} from "react-native"
import {observer} from "mobx-react";
import {commonService} from "../../../common/commonService";
import {archiveService} from "../../../archive/ArchiveService";

@observer
export default class ArchiveList extends Component {
  render() {
    const data = this.props.data;
    return (
        <FlatList
          style={[{flex: 1,}, this.props.style]}
          keyExtractor={(item) => item.id}
          data={data}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={1}

          refreshing={this.props.refreshing}
          onRefresh={this.props.onRefresh}

          renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => {
                  commonService.addToViewCache(item, item.type);
                  this.props.navigation.navigate(archiveService.getContainer(item.type),{item: item})}
                }>
                <ArchiveItem item={item}/>
              </TouchableOpacity>
          }
        />
    )
  }
}
