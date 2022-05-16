import React, { useEffect, useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Nav from "./nav.component";
import { Card, CardGroup } from "react-bootstrap";
import { Alert } from "@mui/material";

const Withdraw = () => {
  let history = useHistory();
  
  const [AccNumber, setAccNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [waluts, setWaluts] = useState("");

  var saldo = [];
  var numberBankNadawcy = [];
  var saldoUSD = [];
  var saldoEUR = [];
  var numberBankNadawcyEUR = [];
  var numberBankNadawcyUSD = [];
  var num = JSON.parse(sessionStorage.getItem("AccountsCurrency"));
  console.log(num)
  localStorage.setItem("loggedIn", "1");

  async function data() {
    let formField = new FormData();

    formField.append("token",sessionStorage["token"]);
    await axios({
      method: "post",
      url: "https://lorekdev.pl/api/bankNumbers/",
      data: formField,
    })
      .then((res) => {
        res.data.forEach((element) => {
          if (waluts.includes("PLN")) {
            if (element["fields"]["waluts"] === "PLN") {
              saldo.push(element["fields"]["balance"]);
              numberBankNadawcy.push(element["fields"]["accNumber"]);
              console.log("WITAM WITAM")
            }
          }
          if (waluts.includes("EUR")) {
            if (element["fields"]["waluts"] === "EUR") {
              saldoEUR.push(element["fields"]["balance"]);
              numberBankNadawcyEUR.push(element["fields"]["accNumber"]);
            }
          }
          if (waluts.includes("USD")) {
            if (element["fields"]["waluts"] === "USD") {
              saldo.push(element["fields"]["balance"]);
              numberBankNadawcyUSD.push(element["fields"]["accNumber"]);
            }
          }
        });

        handleSubmission();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function przelew() {
    let formField = new FormData();
    let formField1 = new FormData();

    if (saldo[0] < amount) {
      console.log("niewystarczajce srodki, aby wykonac przelew");
    }
    if (waluts.includes("USD")) {
      formField.append("amount", amount);
      formField.append("fromBank", numberBankNadawcyUSD[0]);
      formField.append("toBank", AccNumber);
      formField.append("description", description);
      console.log(numberBankNadawcyUSD[0]);

      await axios({
        method: "post",
        url: "https://lorekdev.pl/api/przelew/",
        data: formField,
      }).then((res) => {
        setIsValid(true);
        localStorage.setItem("loggedIn", "1");
        return <a href="./user"></a>
        
      });
    }
    if (waluts.includes("EUR")) {
      formField.append("amount", amount);
      formField.append("fromBank", numberBankNadawcyEUR[0]);
      formField.append("toBank", AccNumber);
      formField.append("description", description);
      console.log("gitara siemano");
      console.log(numberBankNadawcyEUR[0]);

      await axios({
        method: "post",
        url: "https://lorekdev.pl/api/przelew/",
        data: formField,
      }).then((res) => {
        setIsValid(true);
        localStorage.setItem("loggedIn", "1");
        history.push("./user");
      });
    }
    if (waluts.includes("PLN")) {
      
      formField.append("amount", amount);
      formField.append("fromBank", numberBankNadawcy[0]);
      formField.append("toBank", AccNumber);
      formField.append("description", description);

      await axios({
        method: "post",
        url: "https://lorekdev.pl/api/przelew/",
        data: formField,
      }).then((res) => {
        setIsValid(true);
        localStorage.setItem("loggedIn", "1");
        history.push("./user");
      });
    }
  }
  function handleSubmission() {
    setIsValid(false);
    przelew();
  }
  async function reload(){
    history.push("./user")
    window.location.reload(false);
  }

  if (localStorage["loggedIn"] === "1") {
    return (
      <div className="auth-wrapper">
        <Nav />
        <div className="auth-przelew">
          {isValid ? (
            <Alert variant="success">Udało się wykonać przelew</Alert>
          ) : null}

          <h3>Przelew</h3>

          <div className="form-group">
            <label>Numer konta bankowego odbiorcy</label>
            <input
              type="number"
              className="form-control"
              placeholder="numer konta"
              name="AccNumber"
              value={AccNumber}
              onChange={(e) => setAccNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Z jakiego konta wykonujesz przelew</label>
            <select
            className="form-control"
              selected="choose"
              onChange={(e) => setWaluts(e.target.value)}
            >
              {num.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
              </select>
          </div>
          <div className="form-group">
            <label>Kwota przelewu</label>

            <input
              type="number"
              className="form-control"
              placeholder="kwota"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Opis</label>
            <input
              type="text"
              className="form-control"
              placeholder="opis"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <br></br>
          <button className="btn btn-outline-primary btn-block" onClick={data}>
            Wykonaj przelew
          </button>
          <br></br>
          <br></br>
          <button className="btn btn-outline-primary btn-block" onClick={reload}>
            Powrót
          </button>
               

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
};
export default Withdraw;
