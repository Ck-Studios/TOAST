import {searchStore} from "./SearchStore";
import _ from "lodash";

export function addSearchLabel(key, text) {
  searchStore.labels.push({key, text});
}

export function removeSearchLabel(key) {
  searchStore.labels = _(searchStore.labels)
    .remove((label) => label['key'] === key);
}