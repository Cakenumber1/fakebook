/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {useAuth} from '../../../contexts/AuthContext';
import React, {useRef} from "react";
import Overlay from '../../Overlay/Overlay';
import img1 from '../../../img/prof.jpg'
import {db} from '../../../firebase'
import Message from './Message';

function Chat() {

	const {currentUser} = useAuth();
	var messageListElement = useRef();
	var messageFormElement = useRef();
	var messageInputElement = useRef();
	var submitButtonElement = useRef();
	var imageButtonElement = useRef();
	var imageFormElement = useRef();
	var mediaCaptureElement = useRef();
	var signInSnackbarElement = useRef();
	// var userPicElement = document.getElementById('user-pic');
	// var userNameElement = document.getElementById('user-name');
	// var signInButtonElement = document.getElementById('sign-in');
	// var signOutButtonElement = document.getElementById('sign-out');
	//
	//
	// // Saves message on form submit.
	// messageFormElement.addEventListener('submit', onMessageFormSubmit);
	// // signOutButtonElement.addEventListener('click', signOut);
	// // signInButtonElement.addEventListener('click', signIn);
	//
	// // Toggle for the button.
	// messageInputElement.addEventListener('keyup', toggleButton);
	// messageInputElement.addEventListener('change', toggleButton);
	//
	// // Events for image upload.
	// imageButtonElement.addEventListener('click', function (e) {
	// 	e.preventDefault();
	// 	mediaCaptureElement.click();
	// });
	// mediaCaptureElement.addEventListener('change', onMediaFileSelected);


	// Returns the signed-in user's display name.
	function getUserName() {
		return currentUser.displayName;
	}


	// Returns the signed-in user's profile Pic URL.
	function getProfilePicUrl() {
		return img1;
	}

	// Returns true if a user is signed-in.
	function isUserSignedIn() {
		return !!currentUser;
	}

	// // Saves a new message on the Firebase DB.
	// function saveMessage(messageText) {
	// 	// Add a new message entry to the database.
	// 	return db.collection('messages/chat2/messages').add({
	// 		name: getUserName(),
	// 		text: messageText,
	// 		profilePicUrl: getProfilePicUrl(),
	// 		timestamp: db.FieldValue.serverTimestamp()
	// 	}).catch(function (error) {
	// 		console.error('Error writing new message to database', error);
	// 	});
	// }
	// const smth =
	// 	{
	// 		id: "",
	// 		timestamp: "",
	// 		name: "",
	// 		text: "",
	// 		profilePic: "",
	// 		imageUrl: ""
	// 	}

	let mes_arr = [];

	// Loads chat messages history and listens for upcoming ones.
	function loadMessages() {
		// Create the query to load the last 12 messages and listen for new ones.
		const query = db
			.collection('messages/chat2/messages')
			.orderBy('timestamp', 'desc')
			.limit(12);

		// Start listening to the query.
		query.onSnapshot(function (snapshot) {
			snapshot.docChanges().forEach(function (change) {
				if (change.type === 'removed') {
					//deleteMessage(change.doc.id);
				} else {
					const message = change.doc.data();
					// const smth =
					// 	{
					// 		id: change.doc.id,
					// 		timestamp: message.timestamp,
					// 		name: message.name,
					// 		text: message.text,
					// 		profilePic: message.profilePicUrl,
					// 		imageUrl: message.imageUrl
					// 	}
					mes_arr.push([change.doc.id, message.timestamp, message.name,
						message.text, message.profilePicUrl, message.imageUrl]);
					//displayMessage(change.doc.id, message.timestamp, message.name,
					//message.text, message.profilePicUrl, message.imageUrl);
				}
			});
		});
	}

	// // Saves a new message containing an image in Firebase.
	// // This first saves the image in Firebase storage.
	// function saveImageMessage(file) {
	// 	// 1 - We add a message with a loading icon that will get updated with the shared image.
	// 	db.collection('messages/chat2/messages').add({
	// 		name: getUserName(),
	// 		imageUrl: LOADING_IMAGE_URL,
	// 		profilePicUrl: getProfilePicUrl(),
	// 		timestamp: db.FieldValue.serverTimestamp()
	// 	}).then(function (messageRef) {
	// 		// 2 - Upload the image to Cloud Storage.
	// 		var filePath = currentUser.uid + '/' + messageRef.id + '/' + file.name;
	// 		return db.ref(filePath).put(file).then(function (fileSnapshot) {
	// 			// 3 - Generate a public URL for the file.
	// 			return fileSnapshot.ref.getDownloadURL().then((url) => {
	// 				// 4 - Update the chat message placeholder with the image's URL.
	// 				return messageRef.update({
	// 					imageUrl: url,
	// 					storageUri: fileSnapshot.metadata.fullPath
	// 				});
	// 			});
	// 		});
	// 	}).catch(function (error) {
	// 		console.error('There was an error uploading a file to Cloud Storage:', error);
	// 	});
	// }
	//
	// // Saves the messaging device token to the datastore.
	// function saveMessagingDeviceToken() {
	// 	mess.getToken().then(function (currentToken) {
	// 		if (currentToken) {
	// 			console.log('Got FCM device token:', currentToken);
	// 			// Saving the Device Token to the datastore.
	// 			db.collection('fcmTokens').doc(currentToken)
	// 				.set({uid: auth.currentUser.uid});
	// 		} else {
	// 			// Need to request permissions to show notifications.
	// 			requestNotificationsPermissions();
	// 		}
	// 	}).catch(function (error) {
	// 		console.error('Unable to get messaging token.', error);
	// 	});
	// }
	//
	// // Requests permissions to show notifications.
	// function requestNotificationsPermissions() {
	// 	console.log('Requesting notifications permission...');
	// 	mess.requestPermission().then(function () {
	// 		// Notification permission granted.
	// 		saveMessagingDeviceToken();
	// 	}).catch(function (error) {
	// 		console.error('Unable to get permission to notify.', error);
	// 	});
	// }
	//
	// // Triggered when a file is selected via the media picker.
	// function onMediaFileSelected(event) {
	// 	event.preventDefault();
	// 	var file = event.target.files[0];
	//
	// 	// Clear the selection in the file picker input.
	// 	imageFormElement.reset();
	//
	// 	// Check if the file is an image.
	// 	if (!file.type.match('image.*')) {
	// 		var data = {
	// 			message: 'You can only share images',
	// 			timeout: 2000
	// 		};
	// 		signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
	// 		return;
	// 	}
	// 	// Check if the user is signed-in
	// 	if (checkSignedInWithMessage()) {
	// 		saveImageMessage(file);
	// 	}
	// }
	//
	// // Triggered when the send new message form is submitted.
	// function onMessageFormSubmit(e) {
	// 	e.preventDefault();
	// 	// Check that the user entered a message and is signed in.
	// 	if (messageInputElement.value && checkSignedInWithMessage()) {
	// 		saveMessage(messageInputElement.value).then(function () {
	// 			// Clear message text field and re-enable the SEND button.
	// 			resetMaterialTextfield(messageInputElement);
	// 			toggleButton();
	// 		});
	// 	}
	// }
	//
	// // Triggers when the auth state change for instance when the user signs-in or signs-out.
	// function authStateObserver(user) {
	// 	if (user) { // User is signed in!
	// 		// Get the signed-in user's profile pic and name.
	// 		var profilePicUrl = getProfilePicUrl();
	// 		var userName = getUserName();
	//
	// 		// Set the user's profile pic and name.
	// 		userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
	// 		userNameElement.textContent = userName;
	//
	// 		// Show user's profile and sign-out button.
	// 		userNameElement.removeAttribute('hidden');
	// 		userPicElement.removeAttribute('hidden');
	// 		signOutButtonElement.removeAttribute('hidden');
	//
	// 		// Hide sign-in button.
	// 		signInButtonElement.setAttribute('hidden', 'true');
	//
	// 		// We save the Firebase Messaging Device token and enable notifications.
	// 		saveMessagingDeviceToken();
	// 	} else { // User is signed out!
	// 		// Hide user's profile and sign-out button.
	// 		userNameElement.setAttribute('hidden', 'true');
	// 		userPicElement.setAttribute('hidden', 'true');
	// 		signOutButtonElement.setAttribute('hidden', 'true');
	//
	// 		// Show sign-in button.
	// 		signInButtonElement.removeAttribute('hidden');
	// 	}
	// }
	//
	// // Returns true if user is signed-in. Otherwise false and displays a message.
	// function checkSignedInWithMessage() {
	// 	// Return true if the user is signed in Firebase
	// 	if (isUserSignedIn()) {
	// 		return true;
	// 	}
	//
	// 	// Display a message to the user using a Toast.
	// 	var data = {
	// 		message: 'You must sign-in first',
	// 		timeout: 2000
	// 	};
	// 	signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
	// 	return false;
	// }
	//
	// // Resets the given MaterialTextField.
	// function resetMaterialTextfield(element) {
	// 	element.value = '';
	// 	element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
	// }
	//
	// // Template for messages.
	// var MESSAGE_TEMPLATE =
	// 	'<div class="message-container">' +
	// 	'<div class="spacing"><div class="pic"></div></div>' +
	// 	'<div class="message"></div>' +
	// 	'<div class="name"></div>' +
	// 	'</div>';
	//
	// // Adds a size to Google Profile pics URLs.
	// function addSizeToGoogleProfilePic(url) {
	// 	if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
	// 		return url + '?sz=150';
	// 	}
	// 	return url;
	// }
	//
	// // A loading image URL.
	// var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';
	//
	// // Delete a Message from the UI.
	// function deleteMessage(id) {
	// 	var div = document.getElementById(id);
	// 	// If an element for that message exists we delete it.
	// 	if (div) {
	// 		div.parentNode.removeChild(div);
	// 	}
	// }
	//
	// function createAndInsertMessage(id, timestamp) {
	// 	const container = document.createElement('div');
	// 	container.innerHTML = MESSAGE_TEMPLATE;
	// 	const div = container.firstChild;
	// 	div.setAttribute('id', id);
	//
	// 	// If timestamp is null, assume we've gotten a brand new message.
	// 	// https://stackoverflow.com/a/47781432/4816918
	// 	timestamp = timestamp ? timestamp.toMillis() : Date.now();
	// 	div.setAttribute('timestamp', timestamp);
	//
	// 	// figure out where to insert new message
	// 	const existingMessages = messageListElement.children;
	// 	if (existingMessages.length === 0) {
	// 		messageListElement.appendChild(div);
	// 	} else {
	// 		let messageListNode = existingMessages[0];
	//
	// 		while (messageListNode) {
	// 			const messageListNodeTime = messageListNode.getAttribute('timestamp');
	//
	// 			if (!messageListNodeTime) {
	// 				throw new Error(
	// 					`Child ${messageListNode.id} has no 'timestamp' attribute`
	// 				);
	// 			}
	//
	// 			if (messageListNodeTime > timestamp) {
	// 				break;
	// 			}
	//
	// 			messageListNode = messageListNode.nextSibling;
	// 		}
	//
	// 		messageListElement.insertBefore(div, messageListNode);
	// 	}
	//
	// 	return div;
	// }
	//
	// // Displays a Message in the UI.
	// function displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
	// 	var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);
	//
	// 	// profile picture
	// 	if (picUrl) {
	// 		div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
	// 	}
	//
	// 	div.querySelector('.name').textContent = name;
	// 	var messageElement = div.querySelector('.message');
	//
	// 	if (text) { // If the message is text.
	// 		messageElement.textContent = text;
	// 		// Replace all line breaks by <br>.
	// 		messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
	// 	} else if (imageUrl) { // If the message is an image.
	// 		var image = document.createElement('img');
	// 		image.addEventListener('load', function () {
	// 			messageListElement.scrollTop = messageListElement.scrollHeight;
	// 		});
	// 		image.src = imageUrl + '&' + new Date().getTime();
	// 		messageElement.innerHTML = '';
	// 		messageElement.appendChild(image);
	// 	}
	// 	// Show the card fading-in and scroll to view the new message.
	// 	setTimeout(function () {
	// 		div.classList.add('visible')
	// 	}, 1);
	// 	messageListElement.scrollTop = messageListElement.scrollHeight;
	// 	messageInputElement.focus();
	// }
	//
	// Enables or disables the submit button depending on the values of the input
	// fields.
	// function toggleButton() {
	// 	if (messageInputElement.value) {
	// 		submitButtonElement.removeAttribute('disabled');
	// 	} else {
	// 		submitButtonElement.setAttribute('disabled', 'true');
	// 	}
	// }

	loadMessages();
	console.log(mes_arr)
	console.log("length of array " + mes_arr.length)

	return (
		<div>
			<Overlay/>
			<main className="mdl-layout__content mdl-color--grey-100">
				<div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">
					<div id="messages-card"
						 className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop">
						<div className="mdl-card__supporting-text mdl-color-text--grey-600">
							<div ref={messageListElement} id="messages">
								{mes_arr.map((props) =>
									console.log(props)
								)}
							</div>
							<form ref={messageFormElement} id="message-form" action="#">
								<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
									<input className="mdl-textfield__input" type="text" ref={messageInputElement}
										   id="message" autoComplete="off"/>
									<label className="mdl-textfield__label" htmlFor="message">Message...</label>
								</div>
								<button id="submit" ref={submitButtonElement} disabled type="submit"
										className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
									Send
								</button>
							</form>
							<form id="image-form" ref={imageFormElement} action="#">
								<input id="mediaCapture" ref={mediaCaptureElement} type="file" accept="image/*"
									   capture="camera"/>
								<button id="submitImage" ref={imageButtonElement} title="Add an image"
										className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white">
								</button>
							</form>
						</div>
					</div>
					<div id="must-signin-snackbar" ref={signInSnackbarElement} className="mdl-js-snackbar mdl-snackbar">
						<div className="mdl-snackbar__text"></div>
						<button className="mdl-snackbar__action" type="button"></button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Chat

// Signs-in Friendly Chat.
// function signIn() {
// 	// Sign into Firebase using popup auth & Google as the identity provider.
// 	var provider = new firebase.auth.GoogleAuthProvider();
// 	firebase.auth().signInWithPopup(provider);
// }
//
// // Signs-out of Friendly Chat.
// function signOut() {
// 	// Sign out of Firebase.
// 	firebase.auth().signOut();
// }

// Initiate firebase auth.
// function initFirebaseAuth() {
// 	// Listen to auth state changes.
// 	firebase.auth().onAuthStateChanged(authStateObserver);
// }


// // Checks that the Firebase SDK has been correctly setup and configured.
// function checkSetup() {
// 	if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
// 		window.alert('You have not configured and imported the Firebase SDK. ' +
// 			'Make sure you go through the codelab setup instructions and make ' +
// 			'sure you are running the codelab using `firebase serve`');
// 	}
// }
//
// // Checks that Firebase has been imported.
// checkSetup();
//
// // Shortcuts to DOM Elements.


// initialize Firebase
// initFirebaseAuth();

// TODO: Enable Firebase Performance Monitoring.
// firebase.performance();
// We load currently existing chat messages and listen to new ones.

