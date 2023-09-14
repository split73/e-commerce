import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const emailRef = useRef();
    const passwordConfirmRef = useRef();
    const passwordRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('PASS dont match')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch(error) {
            console.log(error)
            setError("fail create acc")
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
                <h2 className='text-center mb-4'>Sign</h2>
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
                    <Form.Group id="password-confirm">
                        <Form.Label>password confirm</Form.Label>
                        <Form.Control ref={passwordConfirmRef} type="passwordConfirmRef" required />
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100'>sign</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            login
            <Link to="/login">login</Link>
        </div>
    </div>
    </Container>
  )
}
