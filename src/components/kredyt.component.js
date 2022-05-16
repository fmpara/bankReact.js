import React, { useEffect, useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Nav from "./nav.component";
import { Card, CardGroup } from "react-bootstrap";
import { Alert } from "@mui/material";

const Kredyt = () => {
  let history = useHistory();
  console.log(sessionStorage["token"])
  const [months, setMonths] = useState("");
  const [amount, setAmount] = useState("");
  
  const [isValid, setIsValid] = useState(false);
  const [waluts, setWaluts] = useState("");
  var wynik = amount/months
  sessionStorage.setItem("miesiace",wynik)
  
  /*months - ilosc miesiecy
  amounMonth - miesieczny koszt to wynik*/
  




  console.log(wynik)
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
  async function kredyt() {
    let formField = new FormData();
    let formField1 = new FormData();

    
    if (waluts.includes("USD")) {
      formField.append("amount", amount);
      formField.append("numberAcc", numberBankNadawcyUSD[0]);
      formField.append("token",sessionStorage["token"])
      
      formField.append("months",months);
      formField.append("amountMonth", sessionStorage["miesiace"]);
      

      await axios({
        method: "post",
        url: "https://lorekdev.pl/api/kredyt/",
        data: formField,
      }).then((res) => {
        setIsValid(true);
        localStorage.setItem("loggedIn", "1");
        
        
      });
    }
    if (waluts.includes("EUR")) {
      formField.append("amount", amount);
      formField.append("numberAcc", numberBankNadawcyEUR[0]);
      formField.append("months",months);
      formField.append("amountMonth", sessionStorage["miesiace"]);
      formField.append("token",sessionStorage["token"])
      

      await axios({
        method: "post",
        url: "https://lorekdev.pl/api/kredyt/",
        data: formField,
      }).then((res) => {
        setIsValid(true);
        localStorage.setItem("loggedIn", "1");
        
      });
    }
    if (waluts.includes("PLN")) {
      
      formField.append("amount", amount);
      formField.append("numberAcc", numberBankNadawcy[0]);
      formField.append("months",months);
      formField.append("amountMonth", sessionStorage["miesiace"]);
      formField.append("token",sessionStorage["token"])

      await axios({
        method: "post",
        url: "https://lorekdev.pl/api/kredyt/",
        data: formField,
      }).then((res) => {
        setIsValid(true);
        localStorage.setItem("loggedIn", "1");
        
      });
    }
  }
  function handleSubmission() {
   

    

    setIsValid(false);
    kredyt();
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
            <Alert variant="success">Udało się wziąć kredyt,
            miesieczny koszt to {sessionStorage["miesiace"]}</Alert>
          ) : null}

          <h3>Kredyt</h3>
          <div className="form-group">
            <label>Na jakie konto chcesz wziąc kredyt</label>
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
            <label>Kwota kredytu</label>

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
            <label>Ilość miesięcy</label>
            <input
              type="number"
              className="form-control"
              placeholder="miesieczny koszt"
              name="amountMonth"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
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
export default Kredyt;
