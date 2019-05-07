import client from "../utils/ApolloClient";
import {GET_ARCHIVE_WIDGET, GET_ARCHIVES} from "../utils/ApolloQuery";
import {archiveStore} from "./ArchiveStore";

class ArchiveService {
  getContainer(type) {
    switch (type) {
      case 'activity':
        return 'ActivityRetrieveContainer';
      case 'notice':
        return 'NoticeRetrieveContainer';
      case 'icampus_content':
        return 'IcampusRetrieveContainer';
    }
  }

  loadAlarmWidgetData() {
    client.getInstance().query({
      query: GET_ARCHIVES, variables: {action: 'alarm', size: 5, offset: 0}
    }).then((response) => {
      console.warn('bs', response);
      archiveStore.alarmContent = response.data.archivedContents;
      archiveStore.alarmLoaded = true;
    }).catch((error) => {
      console.warn('bs', error);
      archiveStore.alarmLoaded = true;
    });
  }

  loadLikeWidgetData() {
    client.getInstance().watchQuery({
      query: GET_ARCHIVE_WIDGET, variables: {action: 'like'},
    }).subscribe({
      next: data => {
        archiveStore.likeContent = data.data.archivedContents;
        archiveStore.likeLoaded = true;
      },
      error: e => {
        console.warn(e);
        archiveStore.likeLoaded = true;
      }
    });
  }

  loadViewWidgetData() {
    client.getInstance().watchQuery({
      query: GET_ARCHIVE_WIDGET, variables: {action: 'view'},
    }).subscribe({
      next: data => {
        archiveStore.viewContent = data.data.archivedContents;
        archiveStore.viewLoaded = true;
      },
      error: e => {
        console.warn(e);
        archiveStore.viewLoaded = true;
      }
    });
  }
}

export const archiveService = new ArchiveService();