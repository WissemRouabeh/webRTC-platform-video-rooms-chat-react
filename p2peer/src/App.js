import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Room from "./Room.js";
import Chat from "./Chat.js";
import videochat from "./Videochat.js";
import OneToN from "./OneToN.js";
import Accueil from "./Accueil.js";
import Login from "./Login.js";
import Landing from "./Landing.js";
import Cardpage from "./Cardpage.js";
import Register from "./Register.js";
import Roomi from "./Roomi.js";
import Profile from "./Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/roomi/:roomID"
            component={(props) => <Roomi {...props} />}
          />
          <Route path="/room/:roomID" component={Room} />
          <Route path="/chat/:roomID" component={Chat} />
          <Route path="/oneton/:roomID" component={OneToN} />
          <Route path="/chatting" component={videochat} />
          <Route path="/accueil" component={Accueil} />
          <Route path="/login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/landing" component={Landing} />
          <Route path="/preparing" component={Cardpage} />
          <Route path="/profile/:profileid" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
