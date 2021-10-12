import React from "react";
import ReactiveChessBoard from "./components/ReactiveChessBoard";
import ChessPlayer from "./components/ChessPlayer";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ReactiveChessBoard />
        </Route>
        <Route path="/player">
          <ChessPlayer />
        </Route>
      </Switch>
    </Router>
  );

}

export default App;