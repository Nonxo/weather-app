import * as types from "../actions";

const weatherReducer = (state = { data: [], total: 0 }, action) => {
  switch (action.type) {
    case types.FETCH_WEATHER_DATA:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_WEATHER_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        total: action.data.length,
        loading: false,
      };
    case types.FETCH_WEATHER_DATA_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default weatherReducer;
