import { useContext } from "react";

import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home"
import Register from "./pages/register/Register";
import Login from "./pages/login/Login"
import Write from "./pages/write/Write"
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Settings from "./pages/settings/Settings"
import Single from "./pages/single/Single"
import { Context } from "./context/Context";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


function App() {
  const { user } = useContext(Context)
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            {user ? <Home /> : <Register />}
          </Route>
          <Route path="/login">
          {user ? <Home /> : <Login />}
          </Route>
          <Route path="/write">
          {user ? <Write /> : <Login />}
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/settings">
          {user ? <Settings /> : <Login />}
          </Route>
          <Route path="/post/:postId">
            <Single />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
