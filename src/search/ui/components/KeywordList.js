import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Animated, Easing, FlatList} from "react-native";
import {searchStore} from "../../SearchStore";
import {observer} from "mobx-react"
import KeywordItem from "./KeywordItem";
import {DebugLayout, GrayImageColor} from "../../../common/Theme";

@observer
export default class KeywordList extends Component {


  render() {
    return (
      <View style={styles.container}>
        {/*<FlatList*/}
          {/*ItemSeparatorComponent={() => (*/}
            {/*<View*/}
              {/*style={{*/}
                {/*height: 1,*/}
                {/*width: "100%",*/}
                {/*backgroundColor: "#CED0CE",*/}
              {/*}}*/}
            {/*/>)*/}
          {/*}*/}
          {/*data={searchStore.searchDomains}*/}
          {/*renderItem={(data) => {*/}
            {/*const item = data.item;*/}
            {/*return (*/}
              {/*<KeywordItem*/}
                {/*item={item}*/}
              {/*/>*/}
            {/*);*/}
          {/*}}*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },

});