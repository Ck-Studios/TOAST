import {observable} from "mobx";

class ArchiveStore {
  @observable alarmContent = [];
  @observable likeContent = [];
  @observable viewContent = [];

  @observable alarmLoaded = false;
  @observable likeLoaded = false;
  @observable viewLoaded = false;
}

export const archiveStore = new ArchiveStore();