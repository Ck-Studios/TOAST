import {computed, observable, action, autorun} from "mobx"

class TestStore {
  @observable value = 10;
  @observable testObjects = [];

  @action
  decreaseValue() {
    this.value--;
  }

  @computed
  get currentValue() {
    return this.value;
  }
}

export class TestObject {
  @observable value = 0;
  @observable name = "";
}

export const testStore = new TestStore();