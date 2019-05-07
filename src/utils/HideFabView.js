import React, {Component} from 'react';
import {
  Animated,
} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";

@observer
export default class HideFabView extends Component {
  @observable visible = this.props.visible;
  @observable y = new Animated.Value(this.props.visible ? 100 : 0);

  componentWillReceiveProps(nextProps) {
    Animated.spring(this.y, {
      toValue: nextProps.visible ? 0 : 100
    }).start(() => {
      this.visible = nextProps.visible
    });
  }

  componentDidMount() {
    Animated.spring(this.y, {
      toValue: 0,
    }).start();
    this.visible = true
  }

  render() {
    return (

      <Animated.View
        style={[this.props.style, {
          transform: [
            {
              translateY: this.y
            }
          ]
        }]}
      >
        {this.props.children}

      </Animated.View>
    )
  }
}

