import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Nav from "./nav.component";
export default function Register() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isValid, setIsValid] = useState(false);

  const [errorD, setError] = useState(false);

  function handleSubmission() {
    setIsValid(false);
    addNewUser();
  }

  async function addNewUser() {
    let formField = new FormData();
    formField.append("username", username);
    formField.append("password", password);
    formField.append("first_name", name);
    formField.append("last_name", surname);
    formField.append("email", email);

    await axios({
      method: "post",
      url: "https://lorekdev.pl/api/createUser/ ",
      data: formField,
    })
      .then((response) => {
        sessionStorage.setItem("error", "Poprawnie stworzono uzytkownika!");
        setIsValid(true);
      })
      .catch((err) => {});
  }

  return (
    <div className="auth-wrapper">
      <Nav />
      <div className="auth-register">
        {isValid ? (
          <Alert variant="success">{sessionStorage["error"]}</Alert>
        ) : null}

        <h3>Rejestracja</h3>

        <div className="form-group">
          <label>Imię</label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Imię"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nazwisko</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nazwisko"
            name="nazwisko"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nazwa uzytkownika</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nazwa uzytkownika"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="text"
            className="form-control"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Hasło</label>
          <input
            type="password"
            className="form-control"
            placeholder="Hasło"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br></br>
        <button
          className="btn btn-outline-primary btn-block"
          onClick={handleSubmission}
        >
          Zarejestruj się
        </button>
      </div>
    </div>
  );
}
