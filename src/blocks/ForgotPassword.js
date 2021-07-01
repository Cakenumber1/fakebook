import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {useAuth} from '../contexts/AuthContext';
import {rmap} from '../router';

const ForgotPassword = () => {
	const emailRef = useRef();
	const {resetPassword} = useAuth();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage('');
			setError('');
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox for further instructions');
		} catch {
			setError('Failed to reset password');
		}

		setLoading(false);
	}

	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{minHeight: "100vh"}}
		>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Password Reset</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control ref={emailRef} required type="email"/>
						</Form.Group>
						<Button disabled={loading} className="w-100 mt-3" type="submit">
							Reset Password
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to={rmap.get("url_login")}>Login</Link>
					</div>
					<div className="w-100 text-center mt-2">
						Need an account? <Link to={rmap.get("url_signup")}>Sign Up</Link>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default ForgotPassword;
