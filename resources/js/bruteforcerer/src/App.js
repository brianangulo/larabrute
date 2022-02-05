import React from "react";
import Main from "./components/Main";
import store from "./redux/store";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
