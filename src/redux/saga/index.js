import watchWeather from "./weatherSaga";
import { all } from "@redux-saga/core/effects";

function* rootSaga() {
  yield all([watchWeather()]);
}

export default rootSaga;
