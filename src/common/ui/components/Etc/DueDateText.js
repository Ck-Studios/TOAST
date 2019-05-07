import React, {Component} from "react"
import {timeCalculator} from "../../../../utils/TimeCalculator";
import {Text} from "react-native"
export default class DueDateText extends Component {
  render() {
    const dueDate = this.props.dueDate;
    if(!dueDate){
      return null;
    }
    return (
      <Text style={this.props.style}>
        {timeCalculator.getDueDate(dueDate)}
      </Text>
    )
  }
}