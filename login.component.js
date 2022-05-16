import React, { useEffect, useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Nav from "./nav.component";

const LoginTest = () => {
  let history = useHistory();

  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    let formField = new FormData();
    formField.append("username", username);
    formField.append("password", password);

    let data1 = [];
    let data0 = [];

    let loggedin = 1;
    await axios({
      method: "post",
      url: "https://lorekdev.pl/api/login/",
      data: formField,
    }).then((res) => {
      data1 = res.data[1];
      data0 = res.data[0];
      
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);
      localStorage.setItem("loggedIn", "1");
      sessionStorage.setItem("token", data1["pk"]);
      
      data();
    });

    async function data() {
      let usernameT = [];
      let numberBank = [];
      let first_nameT = [];
      let last_nameT = [];

      let formField = new FormData();
      formField.append("token", sessionStorage["token"]);
      await axios({
        method: "post",
        url: "https://lorekdev.pl/api/bankNumbers/",
        data: formField,
      })
        .then((res) => {
          var zmienna = [];
          var zmiennaCurrency = [];
          console.log(res);
          var zmiennaWaluty = [];
          zmiennaCurrency[0] = "wybierz konto";
          res.data.forEach((element) => {
            zmienna.push(element["fields"]["accName"]);
          });
          res.data.forEach((element) => {
            zmiennaCurrency.push(
              element["fields"]["accName"] + " " + element["fields"]["waluts"]
            );
            console.log("dziala")
            console.log(zmiennaCurrency)
            
          });
          res.data.forEach((element) => {
            zmiennaWaluty.push(
              element["fields"]["balance"] + " " + element["fields"]["waluts"]
              
            );
           
          });
          sessionStorage.setItem("Accounts", JSON.stringify(zmienna));
          sessionStorage.setItem("Waluty", JSON.stringify(zmiennaWaluty));
          sessionStorage.setItem(
            "AccountsCurrency",
            JSON.stringify(zmiennaCurrency)
          );

          usernameT = data0.fields["username"];
          first_nameT = data0.fields["first_name"];
          last_nameT = data0.fields["last_name"];

          localStorage.setItem("array", res.data.fields);
          numberBank = localStorage.setItem("user", res.data["NumbersAccBank"]);
          localStorage.setItem("id", res.data["id"]);
          sessionStorage.setItem("username", usernameT);
          console.log("test");
          check();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function check() {
      if (localStorage["loggedIn"] === "1") history.push("./user");
    }
  };

  return (
    <div className="auth-wrapper">
      <Nav />
      <div className="auth-inner">
        <h3>Logowanie</h3>

        <div className="form-group">
          <label>Nazwa użytkownika</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nazwa użytkownika"
            name="username"
            value={username}
            onChange={(e) => setName(e.target.value)}
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
        <button className="btn btn-outline-primary btn-block" onClick={Login}>
          Zaloguj
        </button>
      </div>
    </div>
  );
};

export default LoginTest;
