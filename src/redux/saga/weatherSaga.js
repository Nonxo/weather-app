import { getWeatherData } from "../service";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  handleError,
  handleRequest,
  handleSuccess,
} from "../actions/actionCreator";
import * as types from "../actions";
import { toast } from "react-toastify";

function* read(action) {
  try {
    const res = yield call(getWeatherData, action.payload);
    if (res.status === 200) {
      yield put(handleSuccess(types.FETCH_WEATHER_DATA_SUCCESS, res.data));
      yield put(
        handleRequest(types.FETCH_WEATHER_PAGINATION, { start: 0, end: 3 })
      );
      yield put(
        handleRequest(types.FETCH_WEATHER_BY_DATE, { start: 0, end: 8 })
      );
    } else {
      toast.error(res.message);
      yield put(handleError(types.FETCH_WEATHER_DATA_ERROR, res.message));
    }
  } catch (err) {
    toast.error("Something went wrong!");
    yield put(handleError(types.FETCH_WEATHER_DATA_ERROR, err));
  }
}

export default function* watchWeather() {
  yield takeLatest(types.FETCH_WEATHER_DATA, read);
}
