import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Nav from "./nav.component";

export default function Cyclical() {
  let history = useHistory();
    console.log(sessionStorage["token"])
    const [name, setAccName] = useState("");
    const [waluts, SetWaluts] = useState("");
    console.log(waluts)
  const [isValid, setIsValid] = useState(false);
console.log(name)
  function handleSubmission() {
    setIsValid(false);
    addNewUser();
  }

  async function addNewUser() {
    let formField = new FormData();
    
    formField.append("token",sessionStorage["token"])
    formField.append("name", name);
    formField.append("waluts", waluts);
    console.log(formField)
    await axios({
      method: "post",
      url: "https://lorekdev.pl/api/createBankAccc/",
      data: formField,
    })
      .then((response) => {
        sessionStorage.setItem("error", "Poprawnie stworzono uzytkownika!");
        setIsValid(true);

      })
      .catch((err) => {
          console.log("ERROR")
      });
  }

  return (
    <div className="auth-wrapper">
      <Nav />
      <div className="auth-register">
        {isValid ? (
          <Alert variant="success">{sessionStorage["error"]}</Alert>
        ) : null}

        <h3>Tworzenie konta</h3>

        
        
        
        <div className="form-group">
          <label>Kredyt</label>
          <input
            type="date"
            className="form-control"
            placeholder="Nazwa konta"
            name="Nazwa konta"
            value={name}
            onChange={(e) => setAccName(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Waluta konta</label>
          <br></br>
          <select onChange={(e)=>SetWaluts(e.target.value)}className="form-control">

            <option key = "PLN" value="PLN">PLN</option>
            <option key = "EUR" value="EUR">EUR</option>
            <option key = "USD" value="USD">USD</option>
                </select>
          
        </div>

        <br></br>
        <button
          className="btn btn-outline-primary btn-block"
          onClick={handleSubmission}
        >
          Weź kredyt
        </button>
      </div>
    </div>
  );
}