import React, { Component } from "react";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import { Card, CardGroup } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Nav from "./nav.component";
import { Alert } from "@mui/material";

export default class User extends React.Component {
  componentDidMount() {
    sessionStorage.removeItem("wynik")
    data();
    async function data() {
      let formField = new FormData();
      localStorage.setItem("loggedIn", "1");
      console.log(sessionStorage["username"])
      console.log(sessionStorage["password"]);
      console.log(sessionStorage["token"])
      formField.append("username", sessionStorage["username"]);
      formField.append("password", sessionStorage["password"]);
      sessionStorage.setItem("token", sessionStorage["token"]);
     
      let data1 = [];
      let data0 = [];
      await axios({
        method: "post",
        url: "https://lorekdev.pl/api/login/",
        data: formField,
      }).then((res) => {
        data1 = res.data[1];
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
    let formField = new FormData();
    var accountslist = JSON.parse(sessionStorage.getItem("Accounts"));

    var accountslistSelect = JSON.parse(
     sessionStorage.getItem("AccountsCurrency")
    );
    var walutsList = JSON.parse(sessionStorage.getItem("Waluty"));
      
    if (localStorage["loggedIn"] === "1") {
      return (
        <div className="user-layout">
          <Nav />
          <div className="user-box">
            <div className="form">
              <Card sx={{ minWidth: 200 }}>
                <CardContent>
                  
                  <h2>Witaj w LLM, {sessionStorage["username"]} </h2>
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
                            {accountslist.map((account) => (
                              <li>{account}</li>
                            ))}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Link
                            to="/create"
                            onClick={localStorage.setItem("loggedIn", "1")}
                            className="btn btn-primary"
                          >
                            Utwórz konto bankowe
                          </Link>
                        </Card.Footer>
                      </Card>
                    );
                  }
                })()}

                <Card>
                  <Card.Body>
                    <Card.Title>Saldo</Card.Title>
                    <Card.Text>
                      {walutsList.map((currency) => (
                        <li>{currency}</li>
                      ))}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link
                      to="/withdraw"
                      onClick={sessionStorage.setItem("przelew", "1")}
                      className="btn btn-primary"
                    >
                      Wykonaj przelew
                    </Link>
                  </Card.Footer>
                </Card>
              </CardGroup>
              <CardGroup>
                <Card>
                  <Card.Body>
                    <Card.Title>Historia</Card.Title>
                    <Card.Text>
                      
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  <Link
                      to="/selectHistory"
                      onClick={localStorage.setItem("loggedIn", "1")}
                      className="btn btn-primary"
                    >
                      historia przelewów
                    </Link>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Przelewy cykliczne</Card.Title>
                    <Card.Text></Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to="/cyclical" className="btn btn-primary">
                      Ustaw przelew cykliczny
                    </Link>
                  </Card.Footer>
                </Card>
              </CardGroup>
              <CardGroup>
                <Card>
                  <Card.Body>
                    <Card.Title>Kredyt</Card.Title>
                    <Card.Footer>
                    <Link to="/kredyt" className="btn btn-primary">
                      Weź kredyt
                    </Link>
                    </Card.Footer>
                  </Card.Body>
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
