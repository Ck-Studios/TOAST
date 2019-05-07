import React, {Component} from "react"
import {timeCalculator} from "../../../../utils/TimeCalculator";
import {Text} from "react-native"

export default class CreatedDateText extends Component {
  render() {
    const createdDatetime = this.props.createdDatetime;
    if(!createdDatetime){
      return null;
    }
    return (
      <Text style={this.props.style}>
        {timeCalculator.getAge(createdDatetime)}
      </Text>
    )
  }
}