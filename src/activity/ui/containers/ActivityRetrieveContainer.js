import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import ShareButton from "../../../common/ui/components/Button/ShareButton";
import {observer} from "mobx-react"
import {activityStore} from "../../ActivityStore";
import {
  Container,
  GrayTextColor,
  RetrieveTitle,
} from "../../../common/Theme";
import ContentView from "../../../common/ui/components/Content/ContentView";
import RetrieveImage from "../../../common/ui/components/Retrieve/RetrieveImage";
import {extendObservable, observable} from "mobx";
import DueDateText from "../../../common/ui/components/Etc/DueDateText";
import RetrieveShell from "../../../common/ui/components/Retrieve/RetrieveShell";
import ButtonGroup from "../../../common/ui/components/ButtonGroup";
import {Query} from "react-apollo";
import {RETRIEVE_ACTIVITY} from "../../../utils/ApolloQuery";
import client from "../../../utils/ApolloClient";
import {commonService, onScroll} from "../../../common/commonService";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";

@observer
export default class ActivityRetrieveContainer extends Component {
  @observable controlledComponentVisible = true;
  @observable Loaded = false;
  scrollViewOffset = 0;

  componentWillMount() {
    client.getInstance().query({
      query: RETRIEVE_ACTIVITY,
      fetchPolicy : 'network-only',
      variables: {id: this.props.navigation.state.params.item.id}
    })
      .then((response) => {
        commonService.storeToPool(response.data.activity, activityStore);
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
    const item = activityStore.pool[this.props.navigation.state.params.item.id];
    return (
      <RetrieveShell
        navigation={this.props.navigation}
      >
        <ScrollView
          style={Container}
          onScroll={onScroll.bind(this)}
        >
          {/*Image*/}
          <RetrieveImage uri={item.posterUrl}/>

          <ButtonGroup type={'activity'} item={item}/>

          {/*Title*/}
          <Text style={styles.retrieveTitle}>{item.title}</Text>

          {/*Content*/}
          <DueDateText
            style={styles.dueDate}
            dueDate={item.endDatetime ? item.endDatetime.split(' ')[0] : null}/>

          <ContentView content={item.contentHtml} style={styles.contentView}/>

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
  dueDate: {
    color: GrayTextColor,
  },


});
