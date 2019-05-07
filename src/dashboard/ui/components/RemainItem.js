import React,{Component} from 'react';
import {Text} from "react-native";
export default class RemainItem extends Component{
  render(){
    const item = this.props;
    return(
      <Text>{item.title}</Text>
    )
  }
}
