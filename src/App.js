import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./components/Recipe";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/recipe" component={RecipePage} />
      </Switch>
    </Router>
  );
};

export default App;
