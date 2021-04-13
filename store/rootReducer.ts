import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { combineReducers } from "redux"
import postReducer from "./postStore/postReducer"
import { rootSaga } from "./rootSagas"


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
   posts: postReducer,
})

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof rootReducer>

export default store




