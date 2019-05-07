import React, {Component} from "react"
import WidgetShell from "../../../common/ui/components/WidgetShell";
import ArchiveList from "../components/ArchiveList";
import luna from "../../../utils/Luna";
import {observer} from "mobx-react";
import {observable} from "mobx";
import client from "../../../utils/ApolloClient";
import {GET_ARCHIVES} from "../../../utils/ApolloQuery";
import ArchiveSmallList from "../components/ArchiveSmallList";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import Nothing from "../../../common/ui/components/Etc/Nothing";
import {archiveService} from "../../ArchiveService";
import {archiveStore} from "../../ArchiveStore";

@observer
export default class AlarmWidget extends Component {
  componentWillMount() {
    archiveService.loadAlarmWidgetData();
  }

  render() {
    let content = <LoadingIndicator/>;

    if (archiveStore.alarmLoaded) {
      if (archiveStore.alarmContent.length === 0) {
        content =
          <Nothing
            style={{flex: 1}}
            size={60}
            message={'아직 새 알람이 없어요'}
          />
      } else {
        content = <ArchiveSmallList
          data={archiveStore.alarmContent}
          navigation={this.props.navigation}/>
      }
    }

    return (
      <WidgetShell
        title={'내 알림'}
        navigation={this.props.navigation}
        more={'AlarmListContainer'}
      >
        {content}
      </WidgetShell>
    )
  }
}
