import React, {Component} from 'react';
import {
  Animated,
} from 'react-native';

// const styles = ...

export default class SlideUpView extends Component {

  state = {
    visible: false,
    y: new Animated.Value(100),
  };

  componentDidMount() {
    Animated.spring(this.state.y, {
      toValue: 0,
    }).start();
    this.setState({
      visible: true,
    });
  }

  render() {
    return (

      <Animated.View
        style={[this.props.style, {
          transform: [
            {
              translateY: this.state.y
            }
          ]
        }]}
      >
        {this.props.children}

      </Animated.View>
    )
  }
}

