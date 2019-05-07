import {noticeStore} from "./NoticeStore";
import luna from "../utils/Luna";
import {action, extendObservable} from "mobx"
import NoticeListContainer from "./ui/containers/NoticeListContainer";
import React from "react";
import _ from "lodash"


class NoticeService {
}

export const noticeService = new NoticeService();