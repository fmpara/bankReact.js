import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  refresh() {
    // re-renders the component
    this.setState({});
  }

  render() {
    if (localStorage["loggedIn"] === "1") {
      return (
        <nav className="navbar navbar-expand navbar-light fixed-top">
          <div className="container">
            <Link className="nav-link " to={"/"}>
              LLM
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={localStorage.clear()}
                    to={"/"}
                  >
                    Wyloguj
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-expand navbar-light fixed-top">
          <div className="container">
            <Link className="nav-link " to={"/"}>
              LLM
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    Logowanie
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>
                    Rejestracja
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }
}
