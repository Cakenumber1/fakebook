import React, {useEffect, useRef, useState} from 'react';

import {useAuth} from '../../../contexts/AuthContext';
import Overlay from '../../Overlay/Overlay';
import {db} from '../../../firebase'
import Post from './Post';

const PostInfo = () => {
	const {currentUser} = useAuth();
	const message_inp = useRef();
	const send__button = useRef();

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	function split(url) {
		const urlArr = url.split('/');
		return urlArr[urlArr.length - 1];
	}

	const result = split(window.location.href)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await db.collection('news')
					.doc(result)
					.get();
				let data = {title: 'not found'};
				if (response.exists) {
					data = response.data();
				}
				setData(data);
				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();

	}, []);

	function createComment() {
		return {
			likes: [],
			likeCount: 0,
			profilePic: currentUser.photoURL,
			text: message_inp.current.value,
			userUid: currentUser.uid,
			username: currentUser.displayName
		}
	}

	async function addComment() {
		setLoading(true);
		try {
			await db.collection('news/'+ result+'/comments')
				.add(createComment());
		} catch (e) {
			console.log('smth went wrong' + e);
		}
		message_inp.current.value = '';
		setLoading(false);
	}

	return (
		<div>
			<Overlay/>
			<div className="mt-5 marg__bot">
				{!loading && <Post
					profilePic={data.profilePic}
					message={data.message}
					timestamp={data.timestamp}
					username={data.username}
					userUid={data.userUid}
					image={data.image}
					likes={data.likes}
					comments={data.comments}
					key2={result}
				/>}
			</div>
			<div className="position-fixed bottom-0 w-100 d-flex">
				<textarea className="w-75" ref={message_inp} rows="5"/>
				<button className="w-25" ref={send__button} type="button" onClick={addComment}>Отправить</button>
			</div>
		</div>
	);

}

export default PostInfo
