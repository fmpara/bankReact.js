import axios from "axios";
import React, { Component } from "react";
import Nav from "./nav.component";
import { Card, CardGroup } from "react-bootstrap";
import { Redirect, useHistory, Link } from "react-router-dom";
export default class Home extends Component {
  render() {
    return (
      <div className="auth-wrapper">
        <Nav />
        <div className="home-front">
          <div>
            <h3>Witamy w Banku LLM</h3>
            <br></br>
            <br></br>
            <br></br>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Waluty</Card.Title>
                  <Card.Text>
                    Wprowadzamy powoli mozliwość wielowalutowych kont. Sprawdz
                    juz po zalogowniu!
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/login" className="btn btn-primary">
                    Zaloguj
                  </Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Spełnij swoje marzenia!</Card.Title>
                  <Card.Text>
                    Darmowe zalozenie konta juz w mniej niz minute!
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/register" className="btn btn-primary">
                    Zarejestruj
                  </Link>
                </Card.Footer>
              </Card>
            </CardGroup>
          </div>
        </div>
      </div>
    );
  }
}
