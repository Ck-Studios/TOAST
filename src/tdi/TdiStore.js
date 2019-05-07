import {computed, observable, action, autorun} from "mobx"



class TdiStore {
  @observable inRootTab = true;
  @observable showTdi = false;
  @observable message;
}

export const tdiStore = new TdiStore();