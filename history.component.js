import React, { Component, useEffect, useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Nav from "./nav.component";
import { render } from "@testing-library/react";

export default class History extends Component {
    
    
    
    render(){  
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
                                <td>AccName</td>
                                <td>{item["amount"]}</td>
                                <td>{item["data"]}</td>
                                <td>{item["description"]}</td>

                        </tr>))}
                        </tbody>
                    </table></div>
        </div>)
    }
          
}

