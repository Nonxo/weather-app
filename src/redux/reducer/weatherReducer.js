import * as types from "../actions";

const weatherReducer = (state = { data: {}, weatherList: [] }, action) => {
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
        weatherList: action.data.list,
        loading: false,
      };
    case types.FETCH_WEATHER_DATA_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case types.FETCH_WEATHER_PAGINATION:
      return {
        ...state,
        loading: false,
        weatherList: [
          ...state.data.list.slice(action.payload.start, action.payload.end),
        ],
      };

    default:
      return state;
  }
};

export default weatherReducer;
