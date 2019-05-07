import React, {Component} from 'react';
import {
  Animated, StyleSheet
} from 'react-native';


export default class SlideDownView extends Component {

  state = {
    _animated: new Animated.Value(0),
  };

  componentWillMount() {
    this.animatedHeight = this.state._animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.height],
    });

    this.animatedY = this.state._animated.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 0],
    });

    this.animatedOpacity = this.state._animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  }

  componentDidMount() {
    Animated.spring(this.state._animated, {
      toValue: 1,
    }).start();

  }

  render() {
    return (

        <Animated.View
          style={[this.props.style, {
            height: this.animatedHeight,
            opacity: this.animatedOpacity,
            transform: [
              {
                translateY: this.animatedY,
              }
            ]
          }]}
        >
          {this.props.children}

        </Animated.View>
    )
  }
}


const styles = StyleSheet.create({
  slideView: {},
});