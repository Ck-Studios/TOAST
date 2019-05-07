import {Component} from "react";
import {ImageStyle as tintColor, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {BoldShadow, DebugLayout, GrayImageColor, Shadow, ThemeColor} from "../../common/Theme";
import Icon from "react-native-vector-icons/Entypo";
import TdiFab from "../../tdi/ui/components/TdiFab";

export default class RootTabComponent extends Component {
  render() {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Dashboard');
          }}
          style={styles.iconView}
          key={'Dashboard'}
        >

          {this.props.navigationState.index === 1 ?
            <Icon name={'clipboard'} color={GrayImageColor} size={20}/> :
            <View style={styles.iconView}>
              <Icon name={'clipboard'} color={ThemeColor} size={19}/>
              <Text style={styles.tabText}>대시보드</Text>
            </View>}

        </TouchableOpacity>
        {/*<TdiFab/>*/}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Archive');
          }}
          style={styles.iconView}
          key={'Archive'}
        >

          {this.props.navigationState.index === 0 ?
            <Icon name={'box'} color={GrayImageColor} size={20}/> :
            <View style={styles.iconView}>
              <Icon name={'box'} color={ThemeColor} size={19}/>
              <Text style={styles.tabText}>아카이브</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '92%',
    height: 60,
    ...Shadow,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontFamily: 'NanumSquareB',
    color: ThemeColor,
    fontSize: 11,
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 40,
    flex: 1,
  },
});
