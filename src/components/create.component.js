import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Nav from "./nav.component";
export default function CreateBankAcc() {
  let history = useHistory();
    console.log(sessionStorage["token"])
  const [name, setAccName] = useState("");
  const [waluts, SetWaluts] = useState("");
    console.log(waluts)
  const [isValid, setIsValid] = useState(false);
  const [errorM,setErrorM]=useState("")
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
      url: "https://lorekdev.pl/api/createBankAcc/",
      data: formField,
    })
      .then((response) => {
        history.push("./login")
        window.location.reload(false);


      })
      .catch((err)=>{
        setIsValid(true);
        setErrorM(err.response.data["error"]);
       console.log(err.response.data["error"])
      });
  }

  return (
    <div className="auth-wrapper">
      <Nav />
      
      <div className="auth-error">
        {isValid?<Alert variant="danger" >{errorM}</Alert>:null}
      </div>
      <div className="auth-inner">
        <h3>Tworzenie konta</h3>

        
        
        
        <div className="form-group">
          <label>Nazwa konta</label>
          <input
            type="text"
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
          Utwórz konto
        </button>
      </div>
    </div>
  );
}