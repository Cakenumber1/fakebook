import React, {useRef, useState} from 'react';
import {NavLink} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {rmap} from '../../../router';
import {db, fieldValue} from '../../../firebase';
import {useAuth} from '../../../contexts/AuthContext';


const CreateChat = () => {

	const users = [];
	const [target, setTarget] = React.useState(users[0]);
	const nesf2 = useRef();
	const send__button = useRef();
	const {currentUser} = useAuth();
	const [loading, setLoading] = useState(false);

	function getData() {
		db.collection('users').get().then((qS) => {
			qS.forEach((data) => {
				if (data.id !== currentUser.uid) {
					let temp = {
						name: "",
						id: ""
					}
					temp.id = data.id
					db.collection('users').doc(data.id).get().then((curUser) => {
						temp.name = curUser.data().name
						users.push(temp)
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
				getOptionLabel={(option) => option.name}
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

	function add(messageText, docRef, user_id) {
		db.collection('users/' + user_id + '/chats').doc(docRef.id).collection('messages').add({
			userId: currentUser.uid,
			username: currentUser.displayName,
			text: messageText,
			profilePicUrl: currentUser.photoURL,
			timestamp: fieldValue.serverTimestamp()
		})
	}

	function create(messageText, user_id, target_id) {
		db.collection('users/' + user_id + '/chats').add({
			with: target_id
		}).then((docRef) => {
			add(messageText, docRef, user_id)
		}).catch((error) => {
			console.error("Error adding document: ", error);
		})
	}

	function check(messageText, user_id, target_id) {
		let st = false;
		db.collection('users/' + user_id + '/chats').get().then((i) => {
			i.forEach((j) => {
				if ((j.data().with === target_id)) {
					st = true
					add(messageText, j, user_id,);
				}
			})
			if (st === false) {
				create(messageText, user_id, target_id)
			}
		})
	}

	function createChat() {
		try {
			setLoading(true);
			let messageText = nesf2.current.value;
			check(messageText, target.id, currentUser.uid)
			check(messageText, currentUser.uid, target.id)
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
