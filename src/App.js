import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import {AuthProvider} from './contexts/AuthContext';

import PrivateRoute from './blocks/PrivateRoute';
import Signup from './blocks/Signup';
import Login from './blocks/Login';
import ForgotPassword from './blocks/ForgotPassword';
import Home from './blocks/Home/Home';
import Friends from './blocks/Friends/Friends';
import Messages from './blocks/Messages/Messages';
import Notifications from './blocks/Notifications/Notifications';
import Search from './blocks/Search/Search';
import Overlay from './blocks/Overlay/Overlay';
import Chat from './blocks/Messages/Chat/Chat';
import {rmap} from './router';


function App() {
	return (
		<div>
			<Router>
				<AuthProvider>
					<Switch>
						<Route path={rmap.get("url_signup")} component={Signup}/>
						<Route path={rmap.get("url_login")} component={Login}/>
						<Route path={rmap.get("url_for_pass")} component={ForgotPassword}/>
						<PrivateRoute exact path={rmap.get("url_home")} component={Home}/>
						<PrivateRoute path={rmap.get("url_friends")} component={Friends}/>
						<PrivateRoute path={rmap.get("url_messages")} component={Messages}/>
						<PrivateRoute path={rmap.get("url_notifications")} component={Notifications}/>
						<PrivateRoute path={rmap.get("url_search")} component={Search}/>
						<PrivateRoute path={rmap.get("url_ov_friends")} component={Overlay}/>
						<PrivateRoute path={rmap.get("url_ov_home")} component={Overlay}/>
						<PrivateRoute exact path={rmap.get("url_ov_messages")} component={Overlay}/>
						<PrivateRoute path={rmap.get("url_chat")} component={Chat}/>
						<PrivateRoute path={rmap.get("url_ov_notifications")} component={Overlay}/>
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	)
}

export default App
