import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../../common/ui/components/Header";
import {
  ContentText,
  ContentTextBold,
  LargeSubtitleText, SmallContentText,
  SubtitleText,
  ThemeColor, ThemeDarkColor,
  WhiteBackgroundColor
} from "../../../common/Theme";
import WidgetShell from "../../../common/ui/components/WidgetShell";

export default class SchoolMeal extends Component {
  render() {
    let {info} = this.props;

    return (
      <WidgetShell>
        <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20,}}>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={{...SubtitleText, marginRight: 10,}}>{info.place.name}</Text>
            <TouchableOpacity
              onPress={() => Alert.alert('식당 정보가 없습니다.')}
            >
              <Icon style={null} name={"clock"} size={18} color={ThemeColor}/>
            </TouchableOpacity>
          </View>

          {info.meals.map((meal) => {
            return (
              <View>
                <Text style={{...ContentTextBold, marginTop: 10, marginBottom: 5,}}>{meal.type}</Text>
                {
                  meal.menus.map((menu) => {
                    return (
                      <View style={{flexDirection: 'row', marginBottom: 5,}}>
                        <Text style={{...SmallContentText, flex: 1,}}>{menu.name}</Text>
                        <Text style={{...SmallContentText, color: ThemeDarkColor}}>{menu.price}원</Text>
                      </View>
                    );
                  })
                }
              </View>
            );
          })}


        </View>
      </WidgetShell>
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