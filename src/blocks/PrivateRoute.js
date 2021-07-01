import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {useAuth} from '../contexts/AuthContext';
import {rmap} from '../router';

const PrivateRoute = ({component: Component, ...rest}) => {
	const {currentUser} = useAuth();
	return (
		<Route
			{...rest}
			render={props => currentUser ? <Component {...props}/> : <Redirect to={rmap.get("url_login")}/>}
		/>
	);
};

export default PrivateRoute;
