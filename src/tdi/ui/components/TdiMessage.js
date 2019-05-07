import React, {Component} from 'react';
import {
  Easing,
  Text,
  Image,
  View,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import {tdiStore} from "../../TdiStore";
import {observer} from "mobx-react";
import {autorun, observable} from "mobx";
import {DebugLayout, Shadow, TdiSize, ThemeColor} from "../../../common/Theme";
import {tdiService} from "../../TdiService";

@observer
export default class TdiMessage extends Component {
  @observable message;
  timer;

  constructor(props, context) {
    super(props, context);
    this.state = {
      _bubbleAnimated: new Animated.Value(0),
      _tailAnimated: new Animated.Value(0),
      _textAnimated: new Animated.Value(0),
      _fadeout: new Animated.Value(0),
    };

    autorun(() => {
      if (tdiStore.showTdi) {
        Animated.timing(this.state._fadeout, {
          toValue: 0,
          duration: 1,
        }).start();

        Animated.timing(this.state._bubbleAnimated, {
          toValue: 1,
          duration: 400,
          easing: Easing.elastic(2),
        }).start(() => {
          Animated.timing(this.state._textAnimated, {
            toValue: 1,
            duration: 400,
          }).start();
        });
        Animated.timing(this.state._tailAnimated, {
          toValue: 1,
          duration: 200,
        }).start();

        this.timer = setTimeout(function () {
          tdiService.dismiss()
        }, 3000);

      } else {
        Animated.timing(this.state._fadeout, {
          toValue: 1,
          duration: 250,
        }).start(() => {
          Animated.timing(this.state._bubbleAnimated, {
            toValue: 0,
            duration: 1,
          }).start();
          Animated.timing(this.state._tailAnimated, {
            toValue: 0,
            duration: 1,
          }).start();
          Animated.timing(this.state._textAnimated, {
            toValue: 0,
            duration: 1,
          }).start();
        });
        clearTimeout(this.timer)
      }
    });
  }

  componentWillMount() {
    this._bubbleX = this.state._bubbleAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 'auto'],
    });
    this._bubbleY = this.state._bubbleAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 'auto'],
    });
    this._bubblePaddingHorizontal = this.state._bubbleAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 30],
    });
    this._bubblePaddingVertical = this.state._bubbleAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15],
    });
    this._tailX = this.state._tailAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15],
    });
    this._tailY = this.state._tailAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 15],
    });
    this._textOpacity = this.state._textAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    this._opacity = this.state._fadeout.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })
  }


  render() {
    if (!tdiStore.inRootTab) {
      return null
    }
    return (
      <View
        style={styles.container}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => {
            tdiService.dismiss();
          }}
        >
          <Animated.View style={[styles.bubble, {
            height: this._bubbleY,
            width: this._bubbleX,
            opacity: this._opacity,
            paddingTop: this._bubblePaddingVertical,
            paddingBottom: this._bubblePaddingVertical,
            paddingLeft: this._bubblePaddingHorizontal,
            paddingRight: this._bubblePaddingHorizontal,
          }]}>
            <Animated.Text
              style={[styles.text, {
                opacity: this._textOpacity,
              }]}
            >{tdiStore.message}</Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.Image
          style={{
            opacity: this._opacity,
            width: this._tailX,
            height: this._tailY,
          }}
          source={require('../../../../static/tdi_bubble_pointer.png')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 55,
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    ...Shadow,
  },
  bubble: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColor,

    borderRadius: 10,
  },
  textView: {
    alignSelf: 'center',
  },
  tail: {},
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareB',
  },

});