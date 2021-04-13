import { all, fork } from "redux-saga/effects";

import postsSaga from "./postStore/postSagas";

export function* rootSaga() {
   yield all([
      // fork(todoSaga),
      fork(postsSaga)
   ]);
}