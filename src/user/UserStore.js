import {computed, observable} from "mobx";

class UserStore {
  @observable _profile;
  @observable _name;
  @observable _school;
  @observable _major;

  @computed
  get profile() {
    return this._profile ? this._profile : require('../../static/profile.png');
  }

  set profile(value) {
    this._profile = value;
  }

  @computed
  get name() {
    return this._name ? this._name : "게스트 유저";
  }

  set name(value) {
    this._name = value;
  }

  @computed
  get school() {
    return this._school ? this._school : "게스트 유저";
  }

  set school(value) {
    this._school = value;
  }

  @computed
  get major() {
    return this._major ? this._major : "게스트 유저";
  }

  set major(value) {
    this._major = value;
  }
}

export const userStore = new UserStore();