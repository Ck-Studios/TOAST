import React, {Component} from "react"
import WidgetShell from "../../../common/ui/components/WidgetShell";
import {observer} from "mobx-react";
import {observable} from "mobx";
import ArchiveList from "../components/ArchiveList";
import client from "../../../utils/ApolloClient";
import {GET_ARCHIVE_WIDGET, GET_ARCHIVES} from "../../../utils/ApolloQuery";
import _ from "lodash";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import {Button, Text, TouchableOpacity, View} from "react-native";
import ArchiveItem from "../components/ArchiveItem";
import ArchiveSmallList from "../components/ArchiveSmallList";
import Nothing from "../../../common/ui/components/Etc/Nothing";
import {archiveService} from "../../ArchiveService";
import {archiveStore} from "../../ArchiveStore";

@observer
export default class ViewWidget extends Component {
  @observable content;
  @observable loaded = false;

  componentWillMount() {
    archiveService.loadViewWidgetData();
  }

  render() {
    let content = <LoadingIndicator/>;

    if (archiveStore.viewLoaded) {
      if (archiveStore.viewContent.length === 0) {
        content =
          <Nothing
            style={{flex: 1}}
            size={60}
            message={'아직 본 정보가 없어요'}
          />
      } else {
        content = <ArchiveSmallList
          data={_.slice(archiveStore.viewContent, 0, 5)}
          navigation={this.props.navigation}/>
      }
    }

    return (
      <WidgetShell
        title={'내가 본 정보'}
        navigation={this.props.navigation}
        more={'ViewListContainer'}
      >
        {content}
      </WidgetShell>
    )
  }
}
