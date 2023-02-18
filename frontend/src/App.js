// import logo from './logo.svg';
import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { DatabaseList } from "./components/DatabaseList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CollectionList } from "./components/CollectionList";
import { DocumentList } from "./components/DocumentList";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<DatabaseList></DatabaseList>}></Route>
      <Route path="/:db" element={<CollectionList></CollectionList>}></Route>
      <Route path="/:db/:coll" element={<DocumentList></DocumentList>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
