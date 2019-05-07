import React, {Component} from 'react';
import NoticeItem from "./NoticeItem";
import BaseList from "../../../common/ui/components/List/BaseList";
import {StyleSheet, TouchableOpacity} from "react-native";
import NoticeRetrieveContainer from "../containers/NoticeRetrieveContainer";
import {commonService} from "../../../common/commonService";


export default class NoticeList extends Component {

  render() {
    return (
      <BaseList
        onScroll={this.props.onScroll}
        style={styles.list}
        data={this.props.data}
        keyExtractor={(item) => item.id}
        //infinite load
        onEndReached={this.props.onEndReached}
        //refresh
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        renderItem={({item}) =>
          <TouchableOpacity
            onPress={() => {
              commonService.addToViewCache(item, 'notice');
              this.props.navigation.navigate('NoticeRetrieveContainer', {item: item});
            }}>
            <NoticeItem item={item}/>
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

