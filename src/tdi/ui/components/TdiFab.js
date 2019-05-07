import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image
} from "react-native";
import {DebugLayout, Shadow, TdiSize} from "../../../common/Theme";
import {tdiStore} from "../../TdiStore";
import {tdiService} from "../../TdiService";
import {observer} from "../../../../node_modules/mobx-react/custom";

@observer
export default class TdiFab extends Component<Props> {

  sampleMessage() {
    const messages = [
      "당신을 기다리고 있었어요!",
      "반가워요!",
    ];

    const index = Math.floor((Math.random() * 100) % messages.length);
    return messages[index];
  }


  onPress = () => {
    if (tdiStore.showTdi === false)
      tdiStore.message = this.sampleMessage();
    tdiService.toggle();
  };

  render() {
    if (!tdiStore.inRootTab) {
      return null
    }
    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
        style={styles.container}
      >
        <View style={styles.container}>
          <Image
            source={require('../../../../static/Toast_logo.png')}
            style={styles.fabImage}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,

  },
  fabImage: {
    width: 40,
    height: 40,
  },
});

