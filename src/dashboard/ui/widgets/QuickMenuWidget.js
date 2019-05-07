import React, {Component} from "react";
import WidgetShell from "../../../common/ui/components/WidgetShell";
import {FlatList, Button, Image, StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView} from "react-native";
import {GrayTextColor, WhiteBackgroundColor} from "../../../common/Theme";
import {observable, toJS} from "mobx";
import {observer} from "mobx-react";
import {applicationStore} from "../../../application/ApplicationStore";
import {dashboardStore} from "../../DashboardStore";

@observer
export default class QuickMenuWidget extends Component {
  render() {
    return (
      <WidgetShell
        // title={'빠른 메뉴'}
        navigation={this.props.navigation}
      >
        <Text style={{width: 0, height: 0}}>{dashboardStore.loadCount}</Text>
        <ScrollView
          style={styles.gridList}
          horizontal={true}
          removeClippedSubviews={false}
          showsHorizontalScrollIndicator={false}
        >
          {
            dashboardStore.quickMenus.map((item) => {
              return (
                <View style={styles.gridItem} key={item.id}>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => {
                      if (item.alert) {
                        Alert.alert(item.alert);
                        return;
                      }
                      this.props.navigation.navigate(item.container);
                    }}>

                    <Image
                      source={{uri: item.image}}
                      style={{width: 25, height: 25}}
                    />

                  </TouchableOpacity>
                  <Text style={styles.descriptionText}>{item.title}</Text>
                </View>
              );
            })
          }
        </ScrollView>

        {/*<FlatList*/}
          {/*showsHorizontalScrollIndicator={false}*/}
          {/*horizontal={true}*/}
          {/*style={styles.gridList}*/}
          {/*data={this.quickMenus}*/}
          {/*keyExtractor={(item) => item.id}*/}
          {/*renderItem={({item}) =>*/}
            {/*<View style={styles.gridItem}>*/}
              {/*<TouchableOpacity*/}
                {/*style={styles.iconContainer}*/}
                {/*onPress={() => {*/}
                  {/*if (item.alert) {*/}
                    {/*Alert.alert(item.alert);*/}
                    {/*return;*/}
                  {/*}*/}
                  {/*this.props.navigation.navigate(item.container);*/}
                {/*}}>*/}

                {/*<Image*/}
                  {/*source={{uri: item.image}}*/}
                  {/*style={{width: 25, height: 25}}*/}
                {/*/>*/}

              {/*</TouchableOpacity>*/}
              {/*<Text style={styles.descriptionText}>{item.title}</Text>*/}
            {/*</View>*/}
          {/*}*/}
        {/*/>*/}
      </WidgetShell>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteBackgroundColor,
  },

  gridList: {
    flex: 1,

    paddingTop: 10,
    paddingLeft: 10,
  },

  gridItem: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },

  iconContainer: {
    flex: 1,
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',

    borderColor: '#ddddddaa',
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  descriptionText: {
    marginTop: 7,
    marginBottom: 5,
    fontSize: 12,
    color: GrayTextColor,
    fontFamily: 'NanumSquareR',
  },
});