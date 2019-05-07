import React, {Component} from "react";
import {View, StyleSheet, FlatList, TouchableOpacity} from "react-native"
import {Shadow} from "../../../common/Theme";
import TransparentCardItem from "../../../common/ui/components/TransparentCardItem";

export default class PolicyWidget extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={this.props.data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => {
                this.props.navigation.navigate('PolicyRetrieveContainer');
              }}>
              <TransparentCardItem item={item} style={{height: 120}}/>
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Shadow,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  gridItem: {
    flex: 1,
  }
});