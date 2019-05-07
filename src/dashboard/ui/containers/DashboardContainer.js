import React, {Component} from 'react';
import {
  Image,
  ScrollView, Text,
  StyleSheet, Alert, ActivityIndicator,
  View, Button,
} from 'react-native';
import {
  Container, DebugLayout,
  GrayBackgroundColor,
  Shadow, ThemeColor,
} from "../../../common/Theme";
import ToastNoticeWidget from "../widgets/ToastNoticeWidget";
import NoticeWidget from "../widgets/NoticeWidget";
import ActivityWidget from "../widgets/ActivityWidget";
import {dashboardService} from "../../DashboardService";
import {dashboardStore} from "../../DashboardStore"
import {observer} from "mobx-react";
import {noticeStore} from "../../../notice/NoticeStore";
import {activityStore} from "../../../activity/ActivityStore";
import Header from "../../../common/ui/components/Header";
import PolicyWidget from "../widgets/PolicyWidget";
import _ from "lodash";
import {observable} from "mobx";
import {tdiStore} from "../../../tdi/TdiStore";
import {tdiService} from "../../../tdi/TdiService";
import client from "../../../utils/ApolloClient";
import {
  GET_ACTIVITIES,
  GET_ALL_SUBJECT_CONTENT,
  GET_NOTICES,
  GET_SUBJECTS,
  PAGINATION_LENGTH
} from "../../../utils/ApolloQuery";
import {commonService, extractReference, getObjectsFromReference} from "../../../common/commonService";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import QuickMenuWidget from "../widgets/QuickMenuWidget";
import SuggestWidget from "../widgets/SuggestWidget";
import HeaderWithDrawer from "../../../common/ui/components/HeaderWithDrawer";
import IcampusWidget from "../widgets/IcampusWidget";
import {applicationStore} from "../../../application/ApplicationStore";


@observer
export default class DashboardContainer extends Component {
  componentWillMount() {
    dashboardStore.loadNoticeWidgetData();
    dashboardStore.loadIcampusWidgetData();
    dashboardStore.loadActivityWidgetData();
  }

  render() {
    const noticeData = getObjectsFromReference(dashboardStore.noticeReferences, noticeStore);
    const activityData = getObjectsFromReference(dashboardStore.activityReferences, activityStore);
    if (!dashboardStore.onActivityLoaded || !dashboardStore.onNoticeLoaded || !dashboardStore.onIcampusLoaded)
      return <LoadingIndicator/>;
    return (
      <View style={Container}>
        <ScrollView style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
          <View style={{height: 20}}/>
          <ToastNoticeWidget navigation={this.props.navigation}/>
          <SuggestWidget navigation={this.props.navigation}/>
          <QuickMenuWidget navigation={this.props.navigation}/>
          <NoticeWidget data={noticeData} navigation={this.props.navigation}/>
          <IcampusWidget navigation={this.props.navigation}/>
          <ActivityWidget data={activityData} navigation={this.props.navigation}/>
          <View style={{height: 60}}/>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    ...Container,
  },

  scrollView: {
    ...Container,
    backgroundColor: GrayBackgroundColor,
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 30,
    ...Shadow,
  },
  buttonText: {
    fontSize: 15,
    color: ThemeColor,
    fontFamily: 'NanumSquareR',
  },

});
