import React, {Component} from "react";
import DotList from "../../../common/ui/components/List/DotList";
import IcampusSubjectItem from "./IcampusSubjectItem";

export default class IcampusSubjectList extends Component {
  render() {
    return (
      <DotList
        style={{marginLeft: 15, marginRight: 15, flex: 1,}}
        data={this.props.data}
        keyExtractor={(item)=>item.id}
        renderItem={({item}) =>
              <IcampusSubjectItem item={item}/>
        }
      />
    )
  }
}