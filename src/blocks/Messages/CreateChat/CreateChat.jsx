import React, {useRef, useState} from 'react';
import {NavLink} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {rmap} from '../../../router';
import {db, fieldValue} from '../../../firebase';
import {useAuth} from '../../../contexts/AuthContext';


const CreateChat = () => {

	const nesf2 = useRef();
	const send__button = useRef();
	const {currentUser} = useAuth();

	const [target, setTarget] = React.useState(users[0]);
	const [loading, setLoading] = useState(false);

	const users = [];

	async function getData() {
		await db.collection('users')
			.get()
			.then((qS) => {
			qS.forEach((data) => {
				if (data.id !== currentUser.uid) {
					let temp = {
						displayName: "",
						uid: "",
						photoURL: ""
					};
					temp.uid = data.id;
					db.collection('users')
						.doc(data.id)
						.get()
						.then((curUser) => {
						temp.displayName = curUser.data().name;
						temp.photoURL = curUser.data().photoUrl;
						users.push(temp);
					})
				}
			})
		})
	}

	function ComboBox() {
		return (
			<Autocomplete
				id="chat-create-input"
				options={users}
				getOptionLabel={(option) => option.displayName}
				clearOnEscape
				value={target}
				onChange={(event, newValue) => {
					setTarget(newValue);
				}}
				renderInput={(params) => (
					<div ref={params.InputProps.ref}>
						<input type="text" {...params.inputProps} />
					</div>
				)}
			/>
		);
	}

	function sendButtonActivator() {
		if (!nesf1.current && !nesf2.current) {
			send__button.current.disabled = false;
		} else {
			send__button.current.disabled = true;
		}
	}

	async function addMessage(messageText, user_id, docRef) {
		await db.collection('users/' + user_id + '/chats')
			.doc(docRef.id)
			.collection('messages')
			.add({
			userId: currentUser.uid,
			username: currentUser.displayName,
			text: messageText,
			profilePic: currentUser.photoURL,
			timestamp: fieldValue.serverTimestamp()
		})
		await db.collection('users/')
			.doc(user_id + '/chats/'+docRef.id)
			.update({
			username: currentUser.displayName,
			timestamp: fieldValue.serverTimestamp(),
			lastMessage: messageText
		})
	}

	async function create(messageText, user, target) {
		const user_id = user.uid;
		await  db.collection('users/' + user_id + '/chats')
			.add({
			with: target.uid,
			withname: target.displayName,
			username: currentUser.displayName,
			profilePic: target.photoURL,
			timestamp: fieldValue.serverTimestamp(),
			lastMessage: messageText
		}).then((docRef) => {
			addMessage(messageText, user_id, docRef)
		}).catch((error) => {
			console.error("Error adding document: ", error);
		})
	}

	async function check(messageText, user, target) {
		let target_id = target.uid;
		let user_id = user.uid;
		let st = false;
		await db.collection('users/' + user_id + '/chats')
			.get()
			.then((i) => {
			i.forEach((j) => {
				if ((j.data().with === target_id)) {
					st = true
					addMessage(messageText, j, user_id);
				}
			})
			if (st === false) {
				create(messageText, user, target)
			}
		})
	}

	function createChat() {
		try {
			setLoading(true);
			let messageText = nesf2.current.value;
			check(messageText, target, currentUser)
			check(messageText, currentUser, target)
		} catch {
			console.log('smth went wrong')
		}
		setLoading(false);
		nesf2.current.value = '';
	}

	//sendButtonActivator();
	getData();

	return (
		<div>
			<div className="overlay create__message__top">
				<div className="overlay__h__top">
					<NavLink to={rmap.get("url_messages")} className="">Отмена</NavLink>
					<div>Новое сообщение</div>
					<button ref={send__button} type="button" onClick={createChat}>Отправить</button>
				</div>
			</div>
			<div className="adressant">
				<div className="adressant__left">Кому:</div>
				<div className="adressant__mid">
					<ComboBox/>
				</div>
				<div className="plus__icon">+</div>
			</div>
			<textarea ref={nesf2} className="first__message__input" placeholder="Написать сообщение..." rows="5"/>
			<div className="first__message__addons">
				<div>sa</div>
				<div>sa</div>
			</div>
		</div>
	);
}

export default CreateChat;

