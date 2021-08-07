import React from "react";
import Dashboard from "../dashboard";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Render tne dashboard", () => {
  const component = render(<Dashboard />);
});
