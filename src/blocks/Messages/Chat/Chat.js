import {useAuth} from '../../../contexts/AuthContext';
import React, {useEffect, useRef, useState} from 'react';
import Overlay from '../../Overlay/Overlay';
import {db, fieldValue} from '../../../firebase'
import Message from './Message';

const Chat = () => {

	const message_inp = useRef();
	const send__button = useRef();
	const {currentUser} = useAuth();
	const [mess, setMess] = useState([]);
	const [loading, setLoading] = useState(false);
	const messagesEnd = useRef();

	function split(url) {
		const urlArr = url.split('/');
		return urlArr[urlArr.length - 1];
	}

	const result = split(window.location.href)
	//const result = /[^/]*$/.exec(window.location.href)[0];

	useEffect(async () => {
		db.collection("users/" + currentUser.uid + "/chats/" + result + "/messages")
			.orderBy('timestamp', 'asc')
			.onSnapshot(snapshot =>
				setMess(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
			);
	}, []);

	async function addMessage(messageText, user_id, docRef) {
		await db.collection('users/' + user_id + '/chats').doc(docRef).collection('messages').add({
			userId: currentUser.uid,
			username: currentUser.displayName,
			text: messageText,
			profilePic: currentUser.photoURL,
			timestamp: fieldValue.serverTimestamp()
		})
		await db.collection('users/').doc(user_id + '/chats/' + docRef).update({
			username: currentUser.displayName,
			timestamp: fieldValue.serverTimestamp(),
			lastMessage: messageText
		})
	}

	async function getChat(user_id) {
		let ans;
		await db.collection('users/' + user_id + '/chats')
			.where("with", "==", currentUser.uid).get()
			.then((qs) => {
				qs.forEach((doc) => {
					ans = doc.id
				})
			})
		return ans
	}

	async function sendMessage() {
		setLoading(true);
		try {
			let messageText = message_inp.current.value;
			let target = await db.collection('users/' + currentUser.uid + '/chats')
				.doc(result)
				.get()
				.then((doc) => {
						return (doc.data().with)
					}
				)
			let path = await getChat(target);
			addMessage(messageText, currentUser.uid, result);
			addMessage(messageText, target, path);
		} catch (e) {
			console.log('smth went wrong' + e)
		}
		message_inp.current.value = '';
		setLoading(false);
	}

	const scrollToBottom = () => {
		messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [mess]);

	return (
		<div>
			<Overlay/>
			<div className="mt-5 marg__bot">
				{mess.map(one => (
					<Message
						key={one.id}
						text={one.data.text}
						profilePicUrl={one.data.profilePic}
						timestamp={one.data.timestamp}
						userId={one.data.userId}
						username={one.data.username}
					/>
				))}
			</div>
			<div  ref={messagesEnd} />
			<div className="position-fixed bottom-0 w-100 d-flex">
				<textarea className="w-75" ref={message_inp} rows="5"/>
				<button className="w-25" ref={send__button} type="button" onClick={sendMessage}>Отправить</button>
			</div>
		</div>
	);
}

export default Chat



