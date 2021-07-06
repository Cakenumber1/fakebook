import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useAuth} from '../../contexts/AuthContext';

import Create from './Create/Create';
import News from './News/News';
import FindF from './FindF/FindF';
import Header from '../Header/Header';
import {Button} from 'react-bootstrap';

import {rmap} from '../../router';

const Home = () => {

	const [error, setError] = useState('');
	const {currentUser, logout} = useAuth();
	const history = useHistory();

	async function handleLogout() {
		setError('');

		try {
			await logout();
			history.push(rmap.get("url_login"));
		} catch {
			setError("Failed to log out");
		}
	}

	return (
		<div className="full__home">
			<Header/>
			<Create/>
			<News/>
			<FindF/>
			<div>{currentUser.displayName}</div>
			<Button variant="link" onClick={handleLogout}>
				Log Out
			</Button>
		</div>
	);
};

export default Home;
