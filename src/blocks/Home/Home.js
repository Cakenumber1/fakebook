import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useAuth} from '../../contexts/AuthContext';

import Create from './Create/Create';
import Post from './News/Post';
import FindF from './FindF/FindF';
import Header from '../Header/Header';
import {Button} from 'react-bootstrap';

import {rmap} from '../../router';
import {db} from '../../firebase';

const Home = () => {

	const [error, setError] = useState('');
	const {currentUser, logout} = useAuth();
	const history = useHistory();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection("news")
			.orderBy('timestamp', 'desc')
			.onSnapshot(snapshot =>
				setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
			);
	}, []);

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
			{posts.map(post => (
				<Post
					key={post.id}
					profilePic={post.data.profilePic}
					message={post.data.message}
					timestamp={post.data.timestamp}
					username={post.data.username}
					userUid={post.data.userUid}
					image={post.data.image}
					likes={post.data.likes}
					comments={post.data.comments}
					key2={post.id}
				/>
			))}
			<FindF/>
			<div>{currentUser.displayName}</div>
			<Button variant="link" onClick={handleLogout}>
				Log Out
			</Button>
		</div>
	);
};

export default Home;
