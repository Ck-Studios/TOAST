import {observable, computed} from "mobx";
import NoticeSettingContainer from "./ui/containers/NoticeSettingContainer";
import NoticeListContainer from "./ui/containers/NoticeListContainer";
import React from "react"

class NoticeStore {
  @observable pool = {};

}


export const noticeStore = new NoticeStore();