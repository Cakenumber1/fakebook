import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './blocks/Header/Header';
import Home from './blocks/Home/Home';
import Messages from './blocks/Messages/Messages';
import Friends from './blocks/Friends/Friends';
import Notifications from './blocks/Notifications/Notifications';
import Search from './blocks/Search/Search';
import User from './blocks/User/User';

const App = () => (
	<BrowserRouter>
		<Header/>
		<Route path="/fakebook/home" component={Home}/>
		<Route path="/fakebook/friends" component={Friends}/>
		<Route path="/fakebook/messages" component={Messages}/>
		<Route path="/fakebook/notifications" component={Notifications}/>
		<Route path="/fakebook/search" component={Search}/>
		<Route path="/fakebook/user1" component={User}/>
	</BrowserRouter>
);

export default App;
