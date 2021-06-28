import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert, Container} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const {login} = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push('/fakebook/home');
		} catch {
			setError('Failed to log in');
		}

		setLoading(false);
	}

	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Log In</h2>
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
						<Button disabled={loading} className="w-100 mt-3" type="submit">
							Log In
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/fakebook/forgot-password">Forgot Password?</Link>
					</div>
					<div className="w-100 text-center mt-2">
						Need an account? <Link to="/fakebook/signup">Sign Up</Link>
					</div>
				</Card.Body>
			</Card>

		</Container>
	);
};

export default Login;
