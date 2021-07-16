import React, {useRef, useState} from 'react';
import {Alert, Button, Card, Container, Form} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';

import {auth, db} from '../firebase'
import {useAuth} from '../contexts/AuthContext';
import {rmap} from '../router';

const Signup = () => {

	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const userName = useRef();
	const {signup} = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			await auth.currentUser.updateProfile({
				displayName: userName.current.value,
				photoURL: 'https://lh3.googleusercontent.com/a/AATXAJwaJPpAFh4sWy_OSDtSHthSsHWNcV2FbkGL-ALm=s96-c'
			})
			addUser();
			history.push(rmap.get("url_home"));
		} catch {
			setError('Failed to create an account');
		} finally {
			setLoading(false);
		}
	}

	function addUser(){
		db.collection("users").doc(auth.currentUser.uid).set({
			name: userName.current.value,
			photoUrl: 'https://lh3.googleusercontent.com/a/AATXAJwaJPpAFh4sWy_OSDtSHthSsHWNcV2FbkGL-ALm=s96-c'

		})
			.then(() => {
				console.log("Document written");
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	}

	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{minHeight: "100vh"}}>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control ref={emailRef} required type="email"/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control ref={passwordRef} required type="password"/>
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control ref={passwordConfirmRef} required type="password"/>
						</Form.Group>
						<Form.Group id="name">
							<Form.Label>Name</Form.Label>
							<Form.Control ref={userName} required type="text"/>
						</Form.Group>
						<Button disabled={loading} className="w-100 mt-3" type="submit">
							Sign Up
						</Button>
					</Form>
					<div className="w-100 text-center mt-2">
						Already have an account? <Link to={rmap.get("url_login")}>Log In</Link>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Signup;
