import { act, render, waitFor } from "@testing-library/react";
import App from "./App";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import rootReducer from "./redux/reducer";
import axios from "axios";

jest.mock("axios");

function mockCall() {
  axios.get.mockResolvedValueOnce({
    data: {
      cod: "200",
      message: 0,
      cnt: 40,
      list: [
        {
          dt: 1628445600,
          main: {
            temp: 61,
            feels_like: 60.69,
            temp_min: 55.09,
            temp_max: 61,
            pressure: 1015,
            sea_level: 1015,
            grnd_level: 958,
            humidity: 83,
            temp_kf: 3.28,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "light rain",
              icon: "10d",
            },
          ],
          dt_txt: "2021-08-08 18:00:00",
        },
      ],
    },
  });
}

describe("Add Redux store created from the rootReducer", () => {
  let store;
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  afterEach(() => {
    axios.get.mockClear();
  });

  test("renders learn react link", () => {
    const component = render(<App store={store} />);
    const appEl = component.getByTestId("app");

    expect(appEl.className).toBe("app");
  });

  test("show loader when it's fetching weather data", () => {
    mockCall();
    const { getByTestId } = render(<App store={store} />);
    expect(getByTestId("loading")).toBeInTheDocument();
  });

  test("render weather information on cards", async () => {
    const unit = "imperial";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&units=${unit}&APPID=32946e5f4d8174ff9b9dccb19bd0fefe&cnt=40`;
    mockCall();

    // check whats rendered on each card
    await act(async () => {
      const { getAllByTestId } = render(<App store={store} />);
      const cardValues = await waitFor(() => {
        getAllByTestId("card").map((card) => card.textContent);
        expect(cardValues).toEqual([61, "light rain"]);
        expect(axios.get).toHaveBeenCalledWith(url);
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
    });
  });
});
