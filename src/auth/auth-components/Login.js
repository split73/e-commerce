import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch(error) {
            console.log("QQ", error)
            setError("fail login")
        }
        setLoading(false)
    }

  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}
    >
    <div id='login-page' style={{marginLeft: "auto", marginRight: "auto", width: 400}}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>log in</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control ref={emailRef} type="email" required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>password</Form.Label>
                        <Form.Control ref={passwordRef} type="password" required />
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100'>log in</Button>
                </Form>
                <div className='w-100 text-center mt-3'>
                    <Link to="/forgot-password">Forget password</Link>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            create account 
            <Link to="/signup">sign up</Link>
        </div>
    </div>
    </Container>
  )
}
