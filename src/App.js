import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import {AuthProvider} from "./contexts/AuthContext";

import PrivateRoute from "./blocks/PrivateRoute";
import Signup from './blocks/Signup'
import Login from "./blocks/Login";
import ForgotPassword from "./blocks/ForgotPassword";
import Home from "./blocks/Home/Home";
import Friends from "./blocks/Friends/Friends";
import Messages from "./blocks/Messages/Messages";
import Notifications from "./blocks/Notifications/Notifications";
import Search from "./blocks/Search/Search";
import Overlay from "./blocks/Overlay/Overlay";


function App() {
  return (
    <div>
      <Router>
      <AuthProvider>
        <Switch>
          <Route path="/fakebook/signup" component={Signup}/>
          <Route path="/fakebook/login" component={Login}/>
          <Route path="/fakebook/forgot-password" component={ForgotPassword}/>
          <PrivateRoute exact path="/fakebook" component={Home}/>
          <PrivateRoute path="/fakebook/home" component={Home}/>
          <PrivateRoute path="/fakebook/friends" component={Friends}/>
          <PrivateRoute path="/fakebook/messages" component={Messages}/>
          <PrivateRoute path="/fakebook/notifications" component={Notifications}/>
          <PrivateRoute path="/fakebook/search" component={Search}/>
          <PrivateRoute path="/fakebook/overlay__friends" render={() => <Overlay prev="/fakebook/friends/"/>}/>
          <PrivateRoute path="/fakebook/overlay__home" render={() => <Overlay prev="/fakebook/home/"/>}/>
          <PrivateRoute path="/fakebook/overlay__messages" render={() => <Overlay prev="/fakebook/messages/"/>}/>
          <PrivateRoute path="/fakebook/overlay__notifications" render={() => <Overlay prev="/fakebook/notifications/"/>}/>
        </Switch>
      </AuthProvider>
      </Router>
    </div>
  )
}

export default App
