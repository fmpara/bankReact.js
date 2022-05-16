import React, { Component, useEffect, useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Nav from "./nav.component";
import { render } from "@testing-library/react";

const HistoryFirst=()=>  {
    
    let history = useHistory();
    
        var numberBank = [];
        
        
        async function check(){
        
        var num = sessionStorage["wynik"];
        console.log(sessionStorage["token"])
        console.log(num)
        let formField = new FormData();
        
        
        formField.append("token",sessionStorage["token"]);
        await axios({
            method: "post",
            url: "https://lorekdev.pl/api/bankNumbers/",
            data: formField,
        }).then((res) => {
            console.log("test")
          res.data.forEach((element) => {
          if ((element["fields"]["accName"] + " " + element["fields"]["waluts"]) === num) {
            localStorage.setItem("loggedIn","1")
              numberBank.push(element["fields"]["accNumber"]);
              console.log(numberBank[0])
              console.log("DZIALAFIRST")
              historyFinder()
          }
            
            });
        })}
        var saldo =[];
        async function historyFinder(){
            let formField = new FormData();
            formField.append("accNumber",numberBank[0])
            await axios({
                method: "post",
                url: "https://lorekdev.pl/api/history/",
                data: formField,
              }).then((res) => {
                
                res.data.forEach((element) => {
                    saldo.push(element["fields"]);
                    console.log("DZIALA FINDER")
                })
                sessionStorage.setItem("saldo",JSON.stringify(saldo))
                console.log(sessionStorage["saldo"])
               localStorage.setItem("storage",JSON.stringify(res.data))
               history.push("./history")
               
               sessionStorage.removeItem("wynik")
              })
        }
    

    var accountslistSelect = JSON.parse(
        sessionStorage.getItem("AccountsCurrency")
       );
    return( 
                <div className="auth-wrapper">
                <Nav />
                <div className="auth-inner">
                <h3>Wybierz konto</h3>

                <div className="form-group">
                    <label>Nazwa konta</label>
                    <select className="form-control" onChange={(e)=>sessionStorage.setItem("wynik",e.target.value)}>
                                {accountslistSelect.map((amount)=>(
                                <option key = {amount} value={amount}>{amount}</option>
                                ))}</select>
                </div>
                
                <br></br>
                <button className="btn btn-outline-primary btn-block" onClick={check}>
                    Zobacz historię
                </button>
                </div>
            </div>
            );
}
export default HistoryFirst

