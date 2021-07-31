import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./reducer";
import rootSaga from "./saga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default Store;
