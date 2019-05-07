import React, {Component} from 'react';
import {
  Animated,
} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";

@observer
export default class HideTopView extends Component {
  @observable visible = this.props.visible;
  @observable _animated = new Animated.Value(1);
  flag=true;
  componentWillMount() {
    this.animatedHeight = this._animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50],
    });

    this.animatedOpacity = this._animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.flag) {
      this.flag=false;
      return;
    }
    Animated.timing(this._animated, {
      toValue: nextProps.visible ? 1 : 0,
      duration:500,
    }).start();
  }


  render() {
    return (

      <Animated.View
        style={[this.props.style, {
          height: this.animatedHeight,
          opacity: this.animatedOpacity,
        }
        ]}
      >
        {this.props.children}

      </Animated.View>
    )
  }
}

