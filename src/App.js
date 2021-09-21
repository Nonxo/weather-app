import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ store }) {
  return (
    <React.Fragment>
      <Provider store={store}>
        <div data-testid="app" className="app">
          <Dashboard />
        </div>
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"colored"}
      />
    </React.Fragment>
  );
}

export default App;
