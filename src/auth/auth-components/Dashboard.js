import React, { useState } from 'react'
import { Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    console.log(currentUser.email)
    const navigate = useNavigate()
    async function handleLogout(){
        setError("");

        try {
            await logout()
            navigate("/login")
        } catch {
            setError("FAil logout")
        }
    }

  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}
    >
    <div id='login-page' style={{marginLeft: "auto", marginRight: "auto", width: 400}}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email:</strong> {currentUser.email}
                <Link to="/update-profile" className='btn btn-primary w-100 mt-3'>Update profile</Link>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <Button variant='link' onClick={handleLogout}>Log out</Button>
        </div>
    </div>
    </Container>
  )
}
