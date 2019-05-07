import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {Shadow, ThemeColor} from "../../../Theme";
import {share, shareContent} from "../../../../utils/Intent";
import SlideUpView from "../../../../utils/SlideUpView";
import HideFabView from "../../../../utils/HideFabView";
import {observer} from "mobx-react";

const FAB_SIZE = 62;



export default class ShareButton extends Component {
  render() {
    const item = this.props.item;
    return (
      <HideFabView visible={this.props.visible} style={styles.fab}>
        <TouchableOpacity
          onPress={() => share(item)}>
          <Icon style={styles.ButtonIcon}
                name={"share"} size={26} color={"white"}/>
        </TouchableOpacity>
      </HideFabView>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: ThemeColor,
    ...Shadow,
  },
});

