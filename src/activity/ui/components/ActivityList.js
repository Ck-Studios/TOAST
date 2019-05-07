import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import ActivityItem from "./ActivityItem";
import BaseList from "../../../common/ui/components/List/BaseList";
import {observer} from "mobx-react";
import {commonService} from "../../../common/commonService";

@observer
export default class ActivityList extends Component {
  render() {
    return (
      <BaseList
        onScroll={this.props.onScroll}
        style={styles.list}
        data={this.props.data}
        keyExtractor={(item) => item.id}

        //infinite load
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        //refresh
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}

        renderItem={({item}) =>
          <TouchableOpacity
            onPress={() => {
              commonService.addToViewCache(item,'activity');
              this.props.navigation.navigate('ActivityRetrieveContainer', {item: item})
            }}
          >
            <ActivityItem item={item}/>
          </TouchableOpacity>
        }
      />
    )
  }
}

const styles = StyleSheet.create({

  list: {
    marginLeft: 15,
    marginRight: 15,
  }
});