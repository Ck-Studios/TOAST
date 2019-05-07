import React, {Component} from "react"
import WidgetShell from "../../../common/ui/components/WidgetShell";
import {observer} from "mobx-react";
import {observable} from "mobx";
import client from "../../../utils/ApolloClient";
import {GET_ARCHIVE_WIDGET, GET_ARCHIVES} from "../../../utils/ApolloQuery";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import ArchiveSmallList from "../components/ArchiveSmallList";
import _ from "lodash"
import Nothing from "../../../common/ui/components/Etc/Nothing";
import {archiveService} from "../../ArchiveService";
import {archiveStore} from "../../ArchiveStore";

@observer
export default class LikeWidget extends Component {
  componentWillMount() {
    archiveService.loadLikeWidgetData();
  }

  render() {
    let content = <LoadingIndicator/>;

    if (archiveStore.likeLoaded) {
      if (archiveStore.likeContent.length === 0) {
        content =
          <Nothing
            style={{flex: 1}}
            size={60}
            message={'아직 좋아요를 누른 정보가 없어요'}
          />
      } else {
        content = <ArchiveSmallList
          data={_.slice(archiveStore.likeContent, 0, 5)}
          navigation={this.props.navigation}
        />
      }
    }

    return (
      <WidgetShell
        title={'내가 좋아하는 정보'}
        navigation={this.props.navigation}
        more={'LikeListContainer'}
      >
        {content}
      </WidgetShell>
    )
  }
}