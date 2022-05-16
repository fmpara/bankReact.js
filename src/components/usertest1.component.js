import React, { Component } from "react";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import { Card, CardGroup } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Nav from "./nav.component";
import { Alert } from "@mui/material";

export default class User extends React.Component {
  componentDidMount() {
    data();
    async function data() {
      let formField = new FormData();
      console.log(sessionStorage["username"]);
      console.log(localStorage["token"]);
      formField.append("username", sessionStorage["username"]);
      formField.append("password", localStorage["password"]);
      sessionStorage.setItem("token", localStorage["token"]);
      let data1 = [];
      let data0 = [];
      await axios({
        method: "post",
        url: "https://lorekdev.pl/api/login/",
        data: formField,
      }).then((res) => {
        data1 = res.data[1];
        sessionStorage.setItem("token", data1["pk"]);
        localStorage.setItem("loggedIn", "1");
        data0 = res.data[0];

        /*localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("loggedIn", loggedin);
        localStorage.setItem("token", data1["pk"]);*/
      });
    }
  }

  render() {
    if (sessionStorage["loggedIn"] === "1") {
      return (
        <div className="user-layout">
          <Nav />
          <div className="user-box">
            <div className="form">
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <br></br>
                  <br></br>
                  <h2>Witaj w LLM, {localStorage["username"]} </h2>
                  <br></br>
                  <br></br>
                </CardContent>
              </Card>
              <br></br>
              <CardGroup>
                {(() => {
                  if (localStorage["numberBankAcc"] === "") {
                    return <div>someCase</div>;
                  } else {
                    return (
                      <Card>
                        <Card.Body>
                          <Card.Title>Konta:</Card.Title>
                          <Card.Text>
                            {localStorage["accName"]}
                            {localStorage["Accounts"]}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  }
                })()}

                <Card>
                  <Card.Body>
                    <Card.Title>Saldo</Card.Title>
                    <Card.Text>
                      <ul>{localStorage["Waluty"]}</ul>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to="/withdraw" className="btn btn-primary">
                      Wykonaj przelew
                    </Link>
                  </Card.Footer>
                </Card>
              </CardGroup>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Card>
          <Card.Body>
            <Card.Title>
              <Alert>Nie jesteś zalogowany!</Alert>
            </Card.Title>
          </Card.Body>
          <Card.Footer>
            <Link className="nav-link" to={"/login"}>
              Logowanie
            </Link>
          </Card.Footer>
        </Card>
      );
    }
  }
}
