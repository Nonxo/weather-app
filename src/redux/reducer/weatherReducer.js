import * as types from "../actions";

const weatherReducer = (
  state = {
    data: {},
    weatherList: [],
    weatherPerPage: [],
    weatherPerHour: [],
    weatherPerDay: [],
  },
  action
) => {
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
        weatherPerPage: getWeatherPerDay([...state.data.list]).slice(
          action.payload.start,
          action.payload.end
        ),
        weatherPerDay: getWeatherPerDay([...state.data.list]),
        total: getWeatherPerDay([...state.data.list]).length,
      };
    case types.FETCH_WEATHER_BY_DATE:
      return {
        ...state,
        loading: false,
        weatherPerHour: getWeatherPerHour(
          [...state.weatherList].slice(action.payload.start, action.payload.end)
        ),
      };
    default:
      return state;
  }
};

const dateRange = () => {
  const start = new Date();
  start.setHours(start.getHours() + start.getTimezoneOffset() / 60);
  const to = new Date(start);
  to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

  return { start, to };
};

const getWeatherPerHour = (arr) => {
  const timeline = [];
  for (const forecast of arr) {
    timeline.push({
      dt: formatDateStringAsTime(forecast.dt_txt),
      temp: forecast.main.temp,
    });
    const apiDate = new Date(forecast.dt_txt).getTime();

    if (
      dateRange().start.getTime() <= apiDate &&
      dateRange().to.getTime() >= apiDate
    ) {
    }
  }
  return timeline;
};

const getWeatherPerDay = (arr) => {
  const weather = [];
  for (let i = 0; i < arr.length; i = i + 8) {
    weather.push(arr[i]);
  }
  return weather;
};

const formatDateStringAsTime = (input) => {
  const date = new Date(input.replace(" ", "T"));
  const time = date.toTimeString().split(" ")[0];
  // Output what you need
  return time.split(":")[0] + ":" + time.split(":")[1];
};

export default weatherReducer;
