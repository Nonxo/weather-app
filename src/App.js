import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import { Provider } from "react-redux";

function App({ store }) {
  return (
    <Provider store={store}>
      <div data-testid="app" className="app">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
