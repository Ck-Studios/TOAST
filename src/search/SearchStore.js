import {observable, action, computed} from "mobx";
import _ from "lodash";

class SearchStore {
  searchDomains = [
    {
      title: "공지사항에서 검색",
      color: '#FF61AB',
      subscription_id: 1
    },
    {
      title: "공모전 및 대외활동에서 검색",
      color: '#5656FD',
      subscription_id: 2
    },
    {
      title: "모든 컨텐츠에서 검색",
      color: '#BBBCCD',
      subscription_id: 0
    },
  ];



}

export const searchStore = new SearchStore();