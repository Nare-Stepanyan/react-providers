import "./App.css";
import ClientsList from "./components/ClientsList";
import NotFound from "./components/NotFound";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ClientsList} />
          <Route path="/404" exact component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
