import {Query} from "react-apollo";
import React, {Component} from "react";
import {GET_ACTIVITIES, PAGINATION_LENGTH} from "../../../utils/ApolloQuery";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import ActivityList from "./ActivityList";
import {observer} from "mobx-react";
import {autorun, action, observable} from "mobx";
import {activityStore} from "../../ActivityStore";
import client from "../../../utils/ApolloClient";
import {commonService, extractReference, getObjectsFromReference, onScroll} from "../../../common/commonService";

@observer
export default class ActivityListApollo extends Component {
  @observable references = [];
  @observable onLoading = false;
  refreshing = false;
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
    this.loadContent();
  }

  loadContent(sort = this.props.sort) {
    if (this.onFinish || this.onLoading) return;
    this.onLoading = true;

    client.getInstance().query({
      query: GET_ACTIVITIES, variables: {
        source: this.props.source,
        sort: sort,
        offset: this.offset,
        size: PAGINATION_LENGTH,
      }
    })
      .then((response) => {
        const newList = response.data.activities;
        if (!newList.length) {
          this.onFinish = true;
          this.onLoading = false;
          return;
        }
        commonService.storeListToPool(newList, activityStore);
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
    const data = getObjectsFromReference(this.references, activityStore);
    if (this.onLoading && !this.offset)
      return (<LoadingIndicator/>);
    return (
      <ActivityList
        data={data}
        navigation={this.props.navigation}
        onScroll={onScroll.bind(this)}
        //infinite load
        onEndReached={this.handleLoadMore.bind(this)}
        onEndReachedThreshold={0}
        //refresh
        refreshing={this.refreshing}
        onRefresh={() => this.handleRefresh()}
      />
    )
  }
}

