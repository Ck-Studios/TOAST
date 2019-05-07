import {observable} from "mobx";

class ApplicationStore {
  @observable refreshQuickMenu = 0;
  @observable appRerender = 0;

  @observable noticeAlarmTutorial = false;
  @observable icampusPasringTutorial = false;
}

export const applicationStore = new ApplicationStore();