import {tdiStore} from "./TdiStore";


class TdiService {

  call() {
    tdiStore.showTdi = true;
  }

  dismiss() {
    tdiStore.showTdi = false;
  }

  toggle() {
    tdiStore.showTdi = !tdiStore.showTdi;
  }
}

export const tdiService = new TdiService();