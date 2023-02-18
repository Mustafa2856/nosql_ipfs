// import logo from './logo.svg';
import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import DatabaseList from "./components/databaselist.component";
import CollectionList from "./components/collectionlist.component";
import FileList from "./components/filelist.component";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              AmarAkbarAnthony
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/dblist"}>
                    Database List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/collist"}>
                    Collection List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/fillist"}>
                    File List
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dblist" element={<DatabaseList />} />
              <Route path="/collist" element={<CollectionList />} />
              <Route path="/fillist" element={<FileList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
