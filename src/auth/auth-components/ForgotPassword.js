import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword} = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("check inbox")
        } catch(error) {
            console.log("QQ", error)
            setError("fail reset")
        }
        setLoading(false)
    }

  return (
    <div id='login-page' style={{marginLeft: "auto", marginRight: "auto", width: 400}}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Password reset</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control ref={emailRef} type="email" required />
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100'>Reset password</Button>
                </Form>
                <div className='w-100 text-center mt-3'>
                    <Link to="/login">Login</Link>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            create account 
            <Link to="/signup">sign up</Link>
        </div>
    </div>
  )
}
