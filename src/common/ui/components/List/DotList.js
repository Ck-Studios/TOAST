import React, {Component} from "react"
import {FlatList, StyleSheet, Text, View} from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/Entypo";
import ItemSeparator from "../Etc/ItemSeparator";
import {observable, action} from "mobx";
import {observer} from "mobx-react";

const dotColor = ['#EF61A3', '#5861AC', '#5DBE79', '#BBBCCD'];

@observer
export default class DotList extends Component {
  @observable data;

  @action
  addDotColorProperty(data) {
    return _.map(data, (item, value) =>
      _.assign(item, {color: dotColor[value % dotColor.length]}));
  }

  componentWillMount() {
    this.data = this.addDotColorProperty(this.props.data);
    console.warn('componentWillMount', this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.data = this.addDotColorProperty(nextProps.data);
    console.log("componentWillReceiveProps: " + JSON.stringify(nextProps));
  }

  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.data}
        numColumns={this.props.numColumns}
        renderItem={({item}) =>
          <View style={styles.container}>
            <Icon name={'dot-single'} size={27} color={item.color} style={styles.icon}/>
            <this.props.renderItem item={item}/>
          </View>
        }
        ItemSeparatorComponent={ItemSeparator}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {},
});