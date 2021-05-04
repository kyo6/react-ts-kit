import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./components";
import { history } from "./helpers";
import { LoginPage } from "./pages/login";
import TodoPage from "./pages/todo";
import SimpleRedux from './pages/simple-redux/04'
import { HomePage, Sharepoint } from "./pages/home";
import AppProvider from "./hooks";

function App() {
  return (
    <Router history={history}>
      <AppProvider>
        <Switch>
        <Route path="/redux" component={SimpleRedux} />
          <Route path="/todo" component={TodoPage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/sharepoint/:id" component={Sharepoint} />
          <Redirect from="*" to="/" />
        </Switch>
      </AppProvider>
    </Router>
  );
}

export default App;
