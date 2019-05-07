import React, {Component} from 'react';
import ArchiveList from "../components/ArchiveList";
import {View, Text, Button} from "react-native"
import luna from "../../../utils/Luna";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Container} from "../../../common/Theme";
import Header from "../../../common/ui/components/Header";
import client from "../../../utils/ApolloClient";
import {GET_ARCHIVES, PAGINATION_LENGTH} from "../../../utils/ApolloQuery";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import Nothing from "../../../common/ui/components/Etc/Nothing";

@observer
export default class LikeListContainer extends Component {
  @observable refreshing = false;
  @observable content = [];
  @observable onLoading = false;
  onFinish = false;
  offset = 0;

  componentWillMount() {
    this.loadContent();
  }

  handleLoadMore() {
    if (this.onFinish || this.onLoading) return;
    this.offset = this.offset + PAGINATION_LENGTH;
    this.loadContent()
  }

  handleRefresh() {
    if (this.onLoading) return;
    this.offset = 0;
    this.onFinish = false;
    this.loadContent();
  }

  loadContent() {
    if (this.onFinish || this.onLoading) return;
    this.onLoading = true;
    client.getInstance().query({
      query: GET_ARCHIVES,
      fetchPolicy: 'network-only',
      variables: {
        action: 'like',
        size: PAGINATION_LENGTH,
        offset: this.offset,
      }
    }).then((response) => {
      const newList = response.data.archivedContents;
      if (newList === []) {
        this.onFinish = true;
        this.onLoading = false;
        return;
      }
      if (this.offset === 0) {
        this.content = newList;
      }
      else this.content = [...this.content, ...newList];
      this.onLoading = false;

    }).catch((error) => {
      console.warn(error);
      this.onLoading = false;
    });

  }

  render() {
    if (this.onLoading && !this.offset) {
      return <LoadingIndicator/>
    }
    return (
      <View style={Container}>
        <Header title={'내가 좋아요 한 글'} hideSearch={true} navigation={this.props.navigation}/>

        {(!this.content || this.content.length === 0) &&
        <Nothing
          style={{flex: 1,}}
          message={'좋아요를 누른 정보가 없어요'}
        />
        }
        {this.content && this.content.length > 0 &&
        <ArchiveList
          data={this.content}
          navigation={this.props.navigation}

          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0}

          refreshing={this.refreshing}
          onRefresh={() => this.handleRefresh()}
        />}
      </View>
    )
  }
}
