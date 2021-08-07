import { render } from "@testing-library/react";
import App from "./App";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import rootReducer from "./redux/reducer";

describe("Add Redux store created from the rootReducer", () => {
  let store;
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  test("renders learn react link", () => {
    const component = render(<App store={store} />);
    const appEl = component.getByTestId("app");

    expect(appEl.className).toBe("app");
  });
});
