import React, { Component, useEffect, useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Nav from "./nav.component";
import { render } from "@testing-library/react";

const History=()=> {
    let history = useHistory();
    async function reload(){
        history.push("./user")
        window.location.reload(false);
      }
    
    
     
        
        
        sessionStorage.removeItem("wynik")
        var arrayData = JSON.parse(sessionStorage.getItem("saldo"))
        console.log(arrayData)
        console.log(sessionStorage["token"])
        return (
            <div className="user-layout">
                <Nav />
                <div className="user-history">
                 
                    <table className="table">
                        <thead>
                            
                            <tr>
                                <th scope="col">accName</th>
                                <th scope="col">Kwota</th>
                                <th scope="col">Data</th>
                                <th scope="col">Opis</th>
                            </tr>

                        </thead>
                        <tbody>
                        {arrayData.map((item) => (
                              
                            
                            <tr>
                                
                                <td>{item["toBank"]}</td>



                                <td>{item["amount"]}</td>
                                <td>{item["data"]}</td>
                                <td>{item["description"]}</td>

                        </tr>))}
                        </tbody>
                    </table><div className="button-exit">
                    <button className="btn btn-outline-primary btn-block" onClick={reload}>
            Powrót
          </button>
                    </div></div>
                    
        </div>)
   
          
}
export default History;
