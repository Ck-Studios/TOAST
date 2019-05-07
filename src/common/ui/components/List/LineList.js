import React, {Component} from "react"
import {FlatList, StyleSheet, View} from "react-native";
import ItemSeparator from "../Etc/ItemSeparator";
import {DebugLayout} from "../../../Theme";


export default class LineList extends Component {
  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.props.data}
        renderItem={({item}) =>
          <View style={styles.container}>
            <View style={[styles.label, {backgroundColor: this.props.lineColor}]}/>
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
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  label: {
    borderRadius: 5,
    height: 50,
    width: 4,
    marginRight: 5,
  },

});