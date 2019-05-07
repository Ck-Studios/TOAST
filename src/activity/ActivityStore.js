import {observable, computed} from "mobx";

class ActivityStore {
  @observable pool = {};
}

export const activityStore = new ActivityStore();