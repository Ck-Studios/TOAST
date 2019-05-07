import _ from "lodash"
import {extendObservable} from "mobx"
import {action} from "mobx";
import client from "../utils/ApolloClient";
import {GET_ARCHIVE_WIDGET} from "../utils/ApolloQuery";

class CommonService {
  @action
  storeListToPool(contents, store) {
    _.forEach(contents, (item) => {
      this.storeToPool(item, store)
    });
  }

  @action
  storeToPool(item, store) {
    let storedItem = store.pool[item.id];
    if (!storedItem) {
      let obj = {};
      obj[item.id] = item;
      extendObservable(store.pool, obj);
    }
    else {
      if (item.contentHtml)
        store.pool[item.id] = {...storedItem, ...item};
      else {
        store.pool[item.id] = {...item, ...storedItem};
      }
    }
  }

  @action
  addToViewCache(item, type) {
    let {archivedContents} = client.getInstance().readQuery({
      query: GET_ARCHIVE_WIDGET,
      variables: {
        action: "view"
      }
    });
    const newItem = _.assign(item, {type: type});
    client.getInstance().writeQuery({
      query: GET_ARCHIVE_WIDGET,
      variables: {
        action: "view"
      },
      data: {archivedContents: _.uniqBy([newItem, ...archivedContents], 'id')}
    })
  }

  @action
  addToLikeCache(item, type) {
    let {archivedContents} = client.getInstance().readQuery({
      query: GET_ARCHIVE_WIDGET,
      variables: {
        action: "like"
      }
    });
    client.getInstance().writeQuery({
      query: GET_ARCHIVE_WIDGET,
      variables: {
        action: "like"
      },
      data: {archivedContents: [_.assign(item, {type: type}), ...archivedContents]}
    });
    // client.getInstance().queryManager.broadcastQueries();

  }

  @action
  subtractFromLikeCache(item) {
    let {archivedContents} = client.getInstance().readQuery({
      query: GET_ARCHIVE_WIDGET,
      variables: {
        action: "like"
      }
    });
    const newArchivedContents = _.remove(archivedContents, i => i.id !== item.id);

    client.getInstance().writeQuery({
      query: GET_ARCHIVE_WIDGET,
      variables: {
        action: "like"
      },
      data: {archivedContents: newArchivedContents}
    });

  }


  @action
  onToggleLikeButtonClicked(id, store, type) {
    let item = store.pool[id];
    if (item.like) {
      item = _.assign(item, {like: !item.like, likeCount: item.likeCount - 1});
      this.subtractFromLikeCache(item)
    }
    else {
      item = _.assign(item, {like: !item.like, likeCount: item.likeCount + 1});
      this.addToLikeCache(item, type)
    }
  }


}

export function getObjectsFromReference(references, store) {
  return _.map(references, (item) => {
    return store.pool[item.id]
  })
}

export function extractReference(contents) {
  return _.map(contents, (item) => {
    return {id: item.id}
  })
}

export function showContentFilterMenu() {
  this.filterMenuVisible = true;
}

export function hideContentFilterMenu() {
  this.filterMenuVisible = false;
}

export function setContentFilter(item) {
  this.filter = item;
}

export function onScroll(event) {
  const currentOffset = event.nativeEvent.contentOffset.y;
  const direction = (currentOffset > 0 && currentOffset > this.scrollViewOffset)
    ? 'down' : 'up';
  const controlledComponentVisible = direction === 'up';
  if (controlledComponentVisible !== this.controlledComponentVisible) {
    this.controlledComponentVisible = controlledComponentVisible;
  }
  this.scrollViewOffset = currentOffset;
}

export const commonService = new CommonService();