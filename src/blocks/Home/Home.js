import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {useAuth} from '../../contexts/AuthContext';

import Create from './Create/Create';
import News from './News/News';
import FindF from './FindF/FindF';
import Header from '../Header/Header';
import {Button} from 'react-bootstrap';

const Home = () => {
	// A error
	const [setError] = useState('');
	const {currentUser, logout} = useAuth();
	const history = useHistory();

	async function handleLogout() {
		setError('');

		try {
			await logout();
			history.push('/fakebook/login');
		} catch {
			setError('Failed to log out');
		}
	}

	return (
		<div className="full__home">
			<Header/>
			<Create/>
			<News/>
			<FindF/>
			<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
				Update Profile
			</Link>
			<div>{currentUser.email}</div>
			<Button variant="link" onClick={handleLogout}>
				Log Out
			</Button>
		</div>
	);
};

export default Home;
