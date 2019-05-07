import React, {Component} from 'react';
import {WebView, StyleSheet, View, Text} from "react-native";
import Header from "../../../common/ui/components/Header";
import {ContentTextBold, WhiteBackgroundColor} from "../../../common/Theme";
import WidgetShell from "../../../common/ui/components/WidgetShell";
import SchoolMeal from "../components/SchoolMeal";

export default class SchoolMealContainer extends Component {
  render() {
    // let {title, uri} = this.props.navigation.state.params;
    const meal_info = [
      {
        place: {
          name: "금잔디식당"
        },
        meals: [
          {
            type: "조식",
            menus: [
              {name: '메가맥라지세트', price: 6900},
              {name: '메가맥라지세트', price: 6900},
            ]
          },
          {
            type: "중식",
            menus: [
              {name: '메가맥라지세트', price: 6900},
              {name: '메가맥라지세트', price: 6900},
            ]
          },
        ]
      }
    ];

    return (
      <View style={styles.container}>
        <WidgetShell>
          <Header title={'오늘의 학식'} hideSearch={true} navigation={this.props.navigation}/>
          <Text style={{...ContentTextBold, textAlign: 'center',}}>성균관대학교 자연과학캠퍼스</Text>
        </WidgetShell>

        <SchoolMeal info={meal_info[0]}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteBackgroundColor,
  },

  webview: {
    height: '100%',
    width: '100%',
  },
});