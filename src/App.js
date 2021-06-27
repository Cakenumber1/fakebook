import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './blocks/Header/Header';
import Home from './blocks/Home/Home';
import Messages from './blocks/Messages/Messages';
import Friends from './blocks/Friends/Friends';
import Notifications from './blocks/Notifications/Notifications';
import Search from './blocks/Search/Search';
import Overlay from './blocks/Overlay/Overlay';

const App = () => (
	<BrowserRouter>
		<Header/>
		<Route path="/fakebook/home" component={Home}/>
		<Route path="/fakebook/friends" component={Friends}/>
		<Route path="/fakebook/messages" component={Messages}/>
		<Route path="/fakebook/notifications" component={Notifications}/>
		<Route path="/fakebook/search" component={Search}/>
		<Route path="/fakebook/overlay__friends" render={() => <Overlay prev="/fakebook/friends/"/>}/>
		<Route path="/fakebook/overlay__home" render={() => <Overlay prev="/fakebook/home/"/>}/>
		<Route path="/fakebook/overlay__messages" render={() => <Overlay prev="/fakebook/messages/"/>}/>
		<Route path="/fakebook/overlay__notifications" render={() => <Overlay prev="/fakebook/notifications/"/>}/>
	</BrowserRouter>
);

export default App;
