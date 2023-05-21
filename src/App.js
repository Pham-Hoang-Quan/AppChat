import './App.css';

import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './componemts/Login';
import Register from './componemts/Register';
import Test from './componemts/Test';
import Home from './pages/Home';


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;