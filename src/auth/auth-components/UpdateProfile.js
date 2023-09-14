import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordConfirmRef = useRef();
    const passwordRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('PASS dont match')
        }

        const promises = [];
        setLoading(true);
        setError("")
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value !== currentUser.password) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            setError('failed to update')
        }).finally(() => {
            setLoading(false)
        })

    
    }

  return (
    <Container className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh"}}
    >
    <div id='login-page' style={{marginLeft: "auto", marginRight: "auto", width: 400}}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>update profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control ref={emailRef} type="email" required defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>password</Form.Label>
                        <Form.Control ref={passwordRef} type="password" placeholder='leave blank'/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>password confirm</Form.Label>
                        <Form.Control ref={passwordConfirmRef} type="passwordConfirmRef" placeholder='leave blank'/>
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100'>update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <Link to="/">cancel</Link>
        </div>
    </div>
    </Container>
  )
}
