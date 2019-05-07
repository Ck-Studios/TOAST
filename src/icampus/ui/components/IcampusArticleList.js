import React, {Component} from "react";
import {View, FlatList, StyleSheet, Text, Image} from "react-native"
import IcampusArticleItem from "./IcampusArticleItem";
import {WhiteBackgroundColor} from "../../../common/Theme";
import HorizontalCategoryList from "../../../common/ui/components/List/HorizontalCategoryList";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import _ from "lodash";

@observer
export default class IcampusArticleList extends Component {
  @observable filteredData = [];
  @observable selectedType = 'all';

  articleTypes = [
    {type: 'all', title: '모든 게시물',},
    {type: 'notice', title: '공지사항',},
    {type: 'qna', title: '질문 및 답변',},
    {type: 'homework', title: '과제',},
    {type: 'data', title: '자료실',},
  ];

  componentDidMount() {
    this.filterData('all');
  }

  @action
  filterData(type) {
    this.selectedType = type;

    if (this.selectedType === 'all') {
      this.filteredData = this.props.data;
    } else {
      this.filteredData = _.filter(this.props.data, {type: this.selectedType});
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <HorizontalCategoryList
          style={styles.gridList}
          data={this.articleTypes}
          onPress={(item) => {
            this.filterData(item.type);
          }}
        />
        {(!this.filteredData || this.filteredData.length === 0) ?
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Image
              style={{width: 80, height: 80,}}
              source={{uri: 'https://cdn2.iconfinder.com/data/icons/smiling-face/512/Nothing_Face-512.png'}}/>
            <Text style={{margin: 20,}}>아직 아무 게시물도 없어요.</Text>
          </View>
          :
          <FlatList
            style={styles.articleList}
            data={this.filteredData}
            renderItem={({item}) =>
              <IcampusArticleItem item={item}/>
            }
          />
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteBackgroundColor,
  },

  gridList: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },

  articleList: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
});