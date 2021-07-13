import React, {useRef, useState} from 'react';
import {rmap} from '../../../router';
import {db, fieldValue, str} from '../../../firebase';
import {NavLink, useHistory} from 'react-router-dom';
import {useAuth} from '../../../contexts/AuthContext';


const CreatePost = () => {

	const history = useHistory();
	const {currentUser} = useAuth();
	const [loading, setLoading] = useState(false);
	const post__text = useRef();
	const send__button = useRef();
	const imageButtonElement = useRef();
	const imageFormElement = useRef();
	const mediaCaptureElement = useRef();
	const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';
	let selectedFile = null;

	function onMediaFileSelected(event) {
		event.preventDefault();
		var file = event.target.files[0];

		// Clear the selection in the file picker input.
		imageFormElement.reset();

		// Check if the file is an image.
		if (!file.type.match('image.*')) {
			var data = {
				message: 'You can only share images',
				timeout: 2000
			};
			console.log(data);
			return 0;
		}

	}

	// This first saves the image in Firebase storage.
	function saveImageMessage(file) {
		setLoading(true)
		// 1 - We add a message with a loading icon that will get updated with the shared image.
		db.collection('news/').add({
			comments: [],
			image: LOADING_IMAGE_URL,
			likes: [],
			message: post__text.current.value,
			profilePic: "https://lh3.googleusercontent.com/a/AATXAJwaJPpAFh4sWy_OSDtSHthSsHWNcV2FbkGL-ALm=s96-c",
			timestamp: fieldValue.serverTimestamp(),
			userUid: currentUser.uid,
			username: currentUser.displayName
		}).then(function(messageRef) {
			// 2 - Upload the image to Cloud Storage.
			var filePath = currentUser.uid + '/' + messageRef.id + '/' + file.name;
			return str.ref(filePath).put(file).then(function(fileSnapshot) {
				// 3 - Generate a public URL for the file.
				return fileSnapshot.ref.getDownloadURL().then((url) => {
					// 4 - Update the chat message placeholder with the image's URL.
					return messageRef.update({
						image: url,
						storageUri: fileSnapshot.metadata.fullPath
					});
				});
			});
		}).catch(function(error) {
			console.error('There was an error uploading a file to Cloud Storage:', error);
		});
		history.push(rmap.get("url_home"));
		setLoading(false);
	}
	// This first saves the image in Firebase storage.
	function saveMessage() {
		setLoading(true)
		// 1 - We add a message with a loading icon that will get updated with the shared image.
		db.collection('news/').add({
			comments: [],
			likes: [],
			message: post__text.current.value,
			profilePic: "https://lh3.googleusercontent.com/a/AATXAJwaJPpAFh4sWy_OSDtSHthSsHWNcV2FbkGL-ALm=s96-c",
			timestamp: fieldValue.serverTimestamp(),
			userUid: currentUser.uid,
			username: currentUser.displayName
		}).catch(function(error) {
			console.error('smth went wrong', error);
		});
		history.push(rmap.get("url_home"));
		setLoading(false);
	}


	const showImage = event => {
		selectedFile = event.target.files[0];
	}

	const fileUploadHandler = () => {
		console.log(selectedFile)
		if(!selectedFile)
			saveMessage()
		else
		saveImageMessage(selectedFile)
	}

	return (
		<div>
			<div className="overlay create__message__top">
				<div className="overlay__h__top">
					<NavLink to={rmap.get("url_home")} className="">Отмена</NavLink>
					<div>Новая публикация</div>
					<button ref={send__button} type="button">Создать</button>
				</div>
			</div>
			<div className="adressant">
				<div>photo</div>
				<div>
					<div>name</div>
					<div>Аудитория: Все польователи</div>
				</div>
			</div>
			<textarea ref={post__text} className="first__message__input" placeholder="Написать сообщение..." rows="5"/>
			<div className="first__message__addons">
				<div>aa</div>
			</div>
			<form ref={imageFormElement} action="#">
				<input ref={mediaCaptureElement} type="file" accept="image/*" capture="camera" onChange={showImage}/>
				<button type="button" onClick={fileUploadHandler}>Upload</button>
			</form>
		</div>
	);

}

export default CreatePost