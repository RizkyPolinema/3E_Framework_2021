import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import MainReducer from "./reducers/MainReducer";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Table from "../src/containers/Table";
import CreateTodo from "../src/containers/CreateTodo";

const store = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore)(MainReducer);
  
  ReactDOM.render(
    <Provider store={store}>
      <CreateTodo />
      <Table />
    </Provider>,
    document.getElementById("root")
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();