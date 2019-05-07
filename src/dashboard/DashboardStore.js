import {observable, computed} from "mobx";
import client from "../utils/ApolloClient";
import {GET_ACTIVITIES, GET_NOTICES, GET_SUBJECTS} from "../utils/ApolloQuery";
import {commonService, extractReference} from "../common/commonService";
import {noticeStore} from "../notice/NoticeStore";
import {activityStore} from "../activity/ActivityStore";

class DashboardStore {
  @observable noticeReferences = [];
  @observable activityReferences = [];
  @observable subjectContents = [];

  @observable onNoticeLoaded = false;
  @observable onActivityLoaded = false;
  @observable onIcampusLoaded = false;

  @observable loadCount = 0;

  loadNoticeWidgetData() {
    client.getInstance().watchQuery({
      query: GET_NOTICES,
      fetchPolicy: 'network-only',
      variables: {
        source: 'suited',
        sort: '-created_datetime',
        offset: 0,
        size: 3,
      }
    })
      .subscribe({
        next: data => {
          const newList = data.data.notices;
          commonService.storeListToPool(newList, noticeStore);
          this.noticeReferences = extractReference(newList);
          this.onNoticeLoaded = true;
          this.loadCount--;
        },
        error: error => {
          console.warn(error);
          this.onNoticeLoaded = true;
          this.loadCount--;
        }
      });
  }

  loadIcampusWidgetData() {
    client.getInstance().watchQuery({
      query: GET_SUBJECTS,
      fetchPolicy: 'network-only',
      variables: {}
    }).subscribe({
      next: data => {
        this.subjectContents = data.data.subjects;
        this.onIcampusLoaded = true;
        this.loadCount--;
      },
      error: error => {
        console.warn(error);
        this.onIcampusLoaded = true;
        this.loadCount--;
      }
    });
  }

  loadActivityWidgetData() {
    client.getInstance().query({
      query: GET_ACTIVITIES,
      fetchPolicy: 'network-only',
      variables: {
        source: 'all',
        sort: '-created_datetime',
        offset: 0,
        size: 8,
      }
    })
      .then((response) => {
        const newList = response.data.activities;
        commonService.storeListToPool(newList, activityStore);
        this.activityReferences = extractReference(newList);
        this.onActivityLoaded = true;
        this.loadCount--;
      })
      .catch((error) => {
        console.warn(error);
        this.onActivityLoaded = true;
        this.loadCount--;
      });
  }

  @observable quickMenus = [
    {
      id: 1,
      title: '공지사항',
      image: 'https://cdn3.iconfinder.com/data/icons/line/36/notice-512.png',
      container: 'NoticeTabContainer',
    },
    {
      id: 2,
      title: '대외활동',
      image: 'https://cdn3.iconfinder.com/data/icons/line/36/puzzle-128.png',
      container: 'ActivityTabContainer',
    },
    {
      id: 3,
      title: '아이캠퍼스',
      image: 'https://cdn3.iconfinder.com/data/icons/line/36/iphone-512.png',
      container: 'IcampusSubjectListContainer',
    },
    {
      id: 4,
      title: '셔틀버스',
      image: 'https://cdn3.iconfinder.com/data/icons/line/36/clock-128.png',
      container: 'ShuttleBusContainer',
    },
    {
      id: 5,
      title: '학사일정',
      image: 'https://cdn3.iconfinder.com/data/icons/line/36/calendar-512.png',
      container: 'SchoolScheduleContainer',
    },

    // {
    //   id: 6,
    //   title: '식단정보',
    //   image: 'https://cdn3.iconfinder.com/data/icons/line/36/dining-128.png',
    //   container: 'SchoolMealContainer',
    // },

    // {
    //   id: 5,
    //   title: '학사제도',
    //   image: 'https://cdn3.iconfinder.com/data/icons/line/36/info-128.png',
    //   container: 'PolicyContainer'
    // },
    // {
    //   id: 6,
    //   title: '학교시설',
    //   image: 'https://cdn3.iconfinder.com/data/icons/line/36/dryer-128.png',
    //   container: 'FacilityContainer',
    // },
    // {
    //   id: 7,
    //   title: 'TOAST Q',
    //   image: 'https://cdn3.iconfinder.com/data/icons/line/36/question-128.png',
    //   container: 'KnowledgeTabContainer',
    // },
  ];
}


export const dashboardStore = new DashboardStore();