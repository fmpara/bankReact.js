import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import Nav from "./nav.component";
const CurrencyConverter = () => {
  const [uSDAUD, setUSDAUD] = useState("");
  const [first, setFirst] = useState("AUD");
  const [second, setSecond] = useState("USD");
  const [rate, setRate] = useState([]);

  console.log(sessionStorage["loggedIn"]);
  const getRate = (first, second) => {
    axios({
      method: "GET",
      url: "https://api.currencyfreaks.com/latest?apikey=7c79bdb9c1dd422aa069e40a573170f8",
    })
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("loggedIn", "1");
        setRate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="user-layout">
      <Nav />
      <div className="user-box">
        <div className="form">
          <div>siema</div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
