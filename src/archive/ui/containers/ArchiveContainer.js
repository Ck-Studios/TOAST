import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from "react-native";
import Header from "../../../common/ui/components/Header";
import {Container} from "../../../common/Theme";
import LikeWidget from "../widgets/LikeWidget";
import ViewWidget from "../widgets/ViewWidget";
import AlarmWidget from "../widgets/AlarmWidget";
import HeaderWithDrawer from "../../../common/ui/components/HeaderWithDrawer";


export default class ArchiveContainer extends Component {
  render() {
    return (
      <View style={Container}>
        {/*<HeaderWithDrawer navigation={this.props.navigation} title={'아카이브'}/>*/}
        <ScrollView style={Container}>
          <View style={{height: 20}}/>

          <View style={styles.list}>
            <AlarmWidget navigation={this.props.navigation}/>
          </View>

          <View style={styles.list}>
            <LikeWidget navigation={this.props.navigation}/>
          </View>

          <View style={styles.list}>
            <ViewWidget navigation={this.props.navigation}/>
          </View>
          <View style={{height: 60}}/>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  list: {},
});