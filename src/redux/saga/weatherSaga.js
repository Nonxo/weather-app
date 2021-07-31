import { getWeatherData } from "../service";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { handleError, handleSuccess } from "../actions/actionCreator";
import * as types from "../actions";

function* read() {
  try {
    const res = yield call(getWeatherData);
    if (res) {
      yield put(handleSuccess(types.FETCH_WEATHER_DATA_SUCCESS, res.data));
    } else {
      yield put(
        handleError(types.FETCH_WEATHER_DATA_ERROR, "No weather to show")
      );
    }
  } catch (err) {
    yield put(handleError(types.FETCH_WEATHER_DATA_ERROR, err));
  }
}

export default function* watchWeather() {
  yield takeLatest(types.FETCH_WEATHER_DATA, read);
}
