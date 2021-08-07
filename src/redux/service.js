import axios from "axios";

export const getWeatherData = (unit) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&units=${unit}&APPID=32946e5f4d8174ff9b9dccb19bd0fefe&cnt=40`
    )
    .then((response) => response);
};
