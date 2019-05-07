import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Label from "./Label";
import {searchStore} from "../../../../search/SearchStore";
import {observer} from "mobx-react";

@observer
export default class LabelSet extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.container}>
        {searchStore.labels.map((label) => (<Label label={label}/>))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});