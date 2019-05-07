import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, View, Animated, Easing, FlatList, ActivityIndicator} from "react-native";
import {observer} from "mobx-react"
import {DebugLayout, LargeSubtitleText, SubtitleText, ThemeColor} from "../../../common/Theme";
import {observable} from "mobx";
import client from "../../../utils/ApolloClient";
import {PAGINATION_LENGTH,} from "../../../utils/ApolloQuery";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";

@observer
export default class SearchResult extends Component {
  @observable content = [];
  @observable onLoading = false;
  refreshing = false;
  onFinish = false;
  offset = 0;


  componentWillMount() {
    this.loadContent(this.props.keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.keyword !== nextProps.keyword) {
      this.offset = 0;
      this.content = [];
      this.onFinish = false;
      this.loadContent(nextProps.keyword);
    }
  }

  handleLoadMore() {
    if (this.onFinish || this.onLoading) return;
    this.offset = this.offset + PAGINATION_LENGTH;
    this.loadContent(this.props.keyword)
  }

  handleRefresh() {
    if (this.onLoading) return;
    this.offset = 0;
    this.onFinish = false;
    this.loadContent(this.props.keyword);
  }

  loadContent(keyword) {
    if (this.onFinish || this.onLoading || !keyword) return;
    this.onLoading = true;

    client.getInstance().query({
      query: this.props.query,
      variables: {
        offset: this.offset,
        size: PAGINATION_LENGTH,
        keyword: keyword
      }
    }).then((response) => {
      const newList = response.data[this.props.payloadName];
      if (!newList.length) {
        this.onFinish = true;
        this.onLoading = false;
        return;
      }
      if (this.offset === 0) {
        this.content = newList;
      }
      else {
        this.content = [...this.content, ...newList]
      }
      this.onLoading = false;
    })
      .catch((error) => {
        this.onLoading = false;
        console.warn(error)
      });
  }

  render() {
    if (this.onLoading && !this.offset) return <LoadingIndicator/>;
    if (!this.content.length) return <Text style={styles.title}>검색 결과가 없습니다.</Text>;
    return (
      <View style={styles.container}>

        <ScrollView
          style={{flex: 1,}}
          refreshing={this.refreshing}
          onRefresh={() => this.handleRefresh()}
        >
          <Text style={styles.title}>
            '{this.props.keyword}'에 대한 검색 결과입니다.
          </Text>
          <this.props.list
            style={styles.list}
            navigation={this.props.navigation}

            onEndReached={this.handleLoadMore.bind(this)}
            onEndReachedThreshold={0}
            data={this.content}/>
          <View style={{height: 70,}}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {},
  title: {
    ...SubtitleText,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  }
});