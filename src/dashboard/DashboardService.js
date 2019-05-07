import {dashboardStore} from "./DashboardStore";
import luna from "../utils/Luna";
import {action} from "mobx"
import _ from "lodash"
import {activityStore} from "../activity/ActivityStore";
import {noticeStore} from "../notice/NoticeStore";
import {commonService, extractReference} from "../common/commonService";

class DashboardService {
  @action
  getDashboard() {
    const self = this;
    return new Promise(function (resolve, reject) {
      luna.get('/dashboard').then(function (response) {
        let data = response.data.dashboard;
        _.forEach(data, (contents) => {
          if (contents.type === 'skku-notice' || contents.type === 'activity')
            self.storeToEachPool(contents);
        });
        dashboardStore.dashboard = data;
        resolve();
      }).catch(function (error) {
        console.warn("대시보드 로딩 실패" + error);
        reject();
      });
    })
  }

  @action
  storeToEachPool(contents) {
    let obj;
    switch (contents.type) {
      case 'activity':
        obj = activityStore;
        break;
      case 'skku-notice':
        obj = noticeStore;
        break;
    }
    commonService.storeListToPool(contents.content_list, obj)
  }

  @action
  extractEachReference(data) {
    return _.forEach(data, (data) =>
      data['content_list'] = extractReference(data.content_list))
  }

  @action
  patchSubscription(nextOrder) {
    if (nextOrder === undefined) {
      // not changed
      return;
    }
    const request = this.getPatchRequest(nextOrder);
    luna.put('user/subscription', request)
      .then((response) => console.warn(response))
      .catch((error) => console.warn(error))
  }

  getPatchRequest(nextOrder) {
    let subscription = dashboardStore.currentSubscription;
    _.forEach(nextOrder, (item, index) => {
      subscription[item].order = index;
    });
    return subscription

  }
}

export const dashboardService = new DashboardService();

