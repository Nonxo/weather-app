import axios from "axios";
import { Endpoint } from "./constant";

export const getWeatherData = () => {
  axios.get(Endpoint.WEATHER_URL).then((response) => response);
};
