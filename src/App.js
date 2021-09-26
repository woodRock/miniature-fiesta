import "./App.css";
import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Map from "./pages/Map";
import Dice from "./components/Dice";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route
          component={ Map }
          exact
          path={ "/" }
        />
        <Route
          component={ Dice }
          exact
          path={ "/dice" }
        />
      </Router>
    </div>
  );
};

export default App;
