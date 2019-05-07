import React, {Component} from "react";
import {StyleSheet, Text, FlatList, TouchableOpacity} from "react-native";
import WidgetShell from "../../../common/ui/components/WidgetShell";
import ActivityWidgetItem from "./ActivityWidgetItem";
import {commonService} from "../../../common/commonService";

export default class ActivityWidget extends Component {
  render() {
    return (
      <WidgetShell
        title={'대외활동'}
        navigation={this.props.navigation}
        more={'ActivityTabContainer'}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.props.data}
          renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => {
                commonService.addToViewCache(item, 'activity');
                this.props.navigation.navigate('ActivityRetrieveContainer', {item: item})
              }}
            >
              <ActivityWidgetItem
                item={item}
              />

            </TouchableOpacity>
          }
        />
      </WidgetShell>
    )

  }
}


const styles = StyleSheet.create({});
