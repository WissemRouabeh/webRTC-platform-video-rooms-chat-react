import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Room from "./Room.js";
import Chat from "./Chat.js";
import videochat from "./Videochat.js";
import OneToN from "./OneToN.js";
import Accueil from "./Accueil.js";
import Login from "./Login.js";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/room/:roomID" component={Room} />
        <Route path="/chat/:roomID" component={Chat} />
        <Route path="/oneton/:roomID" component={OneToN} />
        <Route path="/chatting" component={videochat} />
        <Route path="/accueil" component={Accueil} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
