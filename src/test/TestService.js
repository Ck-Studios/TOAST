import {testStore} from "./TestStore";

export function decreaseCounterValue() {
  if (testStore.currentValue > 0) {
    return new Promise((resolve, reject) => {
      testStore.decreaseValue();
      reject("너는 뭐냐?");
    });
  }
}

export function doOhJungHwan() {
  Promise.all([decreaseCounterValue(), decreaseCounterValue()])
    .then((result) => {
      console.warn("야호!");
    })
    .catch((error) => {
      console.warn("오류 : ", error);
    })
}
