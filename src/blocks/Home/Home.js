import React, {useEffect, useState, Suspense} from 'react';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

import {useAuth} from '../../contexts/AuthContext';
import Create from './Create/Create';
import Header from '../Header/Header';
import {rmap} from '../../router';
import {db} from '../../firebase';

const Post = React.lazy(() => import('./News/Post'));
const FindF = React.lazy(() => import('./FindF/FindF'));

const Home = () => {

	const {currentUser, logout} = useAuth();
	const history = useHistory();

	const [error, setError] = useState('');
	const [posts, setPosts] = useState([]);

	useEffect(async () => {
		db.collection('news')
			.orderBy('timestamp', 'desc')
			.onSnapshot(snapshot =>
				setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
			);
	}, []);

	async function handleLogout() {
		setError('');

		try {
			await logout();
			history.push(rmap.get('url_login'));
		} catch {
			setError('Failed to log out');
		}
	}

	return (
		<div className="full__home">
			<Header/>
			<Create/>
			<Suspense fallback={<div className="h-100">Грузим</div>}>
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
						key2={post.id}
					/>
				))}
			<FindF/>
			<div>{currentUser.displayName}</div>
			<Button variant="link" onClick={handleLogout}>
				Log Out
			</Button>
			</Suspense>
		</div>
	);
};

export default Home;
