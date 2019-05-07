import React, {Component} from 'react';
import TestContentItem from "./TestContentItem";
import BaseHorizontalList from "../../../common/ui/components/List/BaseHorizontalList";


export default class TestContentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BaseHorizontalList
        data={this.props.data}
        renderItem={({item}) =>
          <TestContentItem item={item}/>
        }
      />
    )
  }
}
