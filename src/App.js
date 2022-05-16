import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/register.component";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import user from "./components/usertest.component";
import Footer from "./components/footer";
import Login from "./components/login.component";
import Home from "./components/home.component";
import React, { useEffect, useState } from "react";
import Withdraw from "./components/withdraw.component";
import History from "./components/history.component";
import HistoryFirst from "./components/historyFirst.component";
import CreateBankAcc from "./components/create.component";
import Cyclical from "./components/cyclical.component";
import Kredyt from "./components/kredyt.component";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Footer />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/user" component={user} />
          <Route exact path="/withdraw" component={Withdraw} />
          <Route exact path="/history" component={History} />
          <Route exact path="/selectHistory" component={HistoryFirst} />
          <Route exact path="/create" component={CreateBankAcc} />
          <Route exact path="/cyclical" component={Cyclical}/>
          <Route exact path="/kredyt" component={Kredyt}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
