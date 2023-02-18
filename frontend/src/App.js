// import logo from './logo.svg';
import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { DatabaseList } from "./components/DatabaseList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <DatabaseList></DatabaseList>
  );
}

export default App;
