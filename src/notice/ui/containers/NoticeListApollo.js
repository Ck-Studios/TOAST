import {GET_NOTICES, PAGINATION_LENGTH} from "../../../utils/ApolloQuery";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import NoticeList from "../components/NoticeList";
import React, {Component} from "react";
import {observer} from "mobx-react";
import {noticeStore} from "../../NoticeStore";
import {commonService, extractReference, getObjectsFromReference, onScroll} from "../../../common/commonService";
import {observable} from "mobx";
import client from "../../../utils/ApolloClient";
import {View} from "react-native";

@observer
export default class NoticeListApollo extends Component {
  @observable refreshing = false;
  @observable references = [];
  @observable onLoading = false;
  page = 1;
  onFinish = false;
  offset = 0;

  componentWillMount() {
    this.loadContent();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sort !== nextProps.sort) {
      this.offset = 0;
      this.onFinish = 0;
      this.loadContent(nextProps.sort);
    }
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
    this.loadContent()
  }

  loadContent(sort = this.props.sort) {
    if (this.onFinish || this.onLoading) return;

    this.onLoading = true;

    client.getInstance().query({
      query: GET_NOTICES, variables: {
        source: this.props.source,
        sort: sort,
        offset: this.offset,
        size: PAGINATION_LENGTH,
      }
    })
      .then((response) => {
        const newList = response.data.notices;
        if (newList === []) {
          this.onFinish = true;
          this.onLoading = false;
          return;
        }
        commonService.storeListToPool(newList, noticeStore);
        if (this.offset === 0) {
          this.references = extractReference(newList);
        }
        else {
          this.references = [...this.references, ...extractReference(newList)];
        }
        this.onLoading = false;

      })
      .catch((error) => {
        console.warn(error);
        this.onLoading = false;
      });
  }

  render() {
    const data = getObjectsFromReference(this.references, noticeStore);
    if (this.onLoading && !this.offset)
      return (<LoadingIndicator/>);
    return (
      <View style={{flex: 1}}>
        <NoticeList
          data={data}
          navigation={this.props.navigation}
          // onScroll={onScroll.bind(this)}
          //infinite load
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0}
          //refresh
          refreshing={this.refreshing}
          onRefresh={() => this.handleRefresh()}
        />
      </View>
    )
  }
}
