import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import {noticeStore} from "../../NoticeStore";
import ShareButton from "../../../common/ui/components/Button/ShareButton";
import {commonService, onScroll} from "../../../common/commonService";
import {
  Container,
  GrayTextColor, RetrieveTitle,
} from "../../../common/Theme"
import {observer} from "mobx-react"
import {extendObservable, observable} from "mobx"
import ContentView from "../../../common/ui/components/Content/ContentView";
import RetrieveImage from "../../../common/ui/components/Retrieve/RetrieveImage";
import CreatedDateText from "../../../common/ui/components/Etc/CreatedDateText";
import RetrieveShell from "../../../common/ui/components/Retrieve/RetrieveShell";
import ButtonGroup from "../../../common/ui/components/ButtonGroup";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import {RETRIEVE_NOTICE} from "../../../utils/ApolloQuery";
import client from "../../../utils/ApolloClient";

@observer
export default class NoticeRetrieveContainer extends Component {
  @observable controlledComponentVisible = true;
  @observable Loaded = false;
  scrollViewOffset = 0;

  componentWillMount() {
    client.getInstance().query({
      query: RETRIEVE_NOTICE,
      fetchPolicy : 'network-only',
      variables: {id: this.props.navigation.state.params.item.id}
    })
      .then((response) => {
        commonService.storeToPool(response.data.notice, noticeStore);
        this.Loaded = true;
      })
      .catch((error) => {
        this.Loaded = true;
        console.warn(error);
      })
  }

  render() {
    if (!this.Loaded) {
      return <LoadingIndicator/>
    }
    const item = noticeStore.pool[this.props.navigation.state.params.item.id];
    return (
      <RetrieveShell
        navigation={this.props.navigation}
      >
        <ScrollView
          style={Container}
          onScroll={onScroll.bind(this)}
        >
          {/*Image*/}
          <RetrieveImage/>

          <ButtonGroup type={'notice'} item={item}/>

          {/*Title*/}
          <Text style={styles.retrieveTitle}>{item.title}</Text>

          <CreatedDateText
            style={styles.createdDate}
            createdDatetime={item.createdDatetime ? item.createdDatetime.split(' ')[0] : null}/>
          {/*Content*/}
          <ContentView content={item.contentHtml} style={styles.contentView}/>
          {/*<ContentView content={item.content_HTML} style={styles.contentView}/>*/}

        </ScrollView>
        <ShareButton item={item} visible={this.controlledComponentVisible}/>
      </RetrieveShell>
    )
  }
}

const styles = StyleSheet.create({

  retrieveTitle: {
    ...RetrieveTitle,
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 20,
  },
  contentView: {
    marginRight: 10,
  },
  createdDate: {
    color: GrayTextColor,
  },
});
