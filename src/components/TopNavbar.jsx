import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import { useAuth } from '../auth/contexts/AuthContext';
import Content from './Content';
import {  Routes, Route } from "react-router-dom";

export default function TopNavbar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const { currentUser } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [passSearchInput, setPassSearchInput] = useState("");

const handleSearchInput = (e) => {
  setSearchInput(e.target.value)
}

const handleSearchButton = () => {
  console.log("BBTN", searchInput)
  setPassSearchInput(searchInput)
}

  const handleShowSideBar = () => {
    setShowSideBar(true)
    console.log(showSideBar)
}; 

const handleHideSideBar = () => {
  setShowSideBar(false)
};  

  const navigate = useNavigate();


  function handleProfileSettings(){
    navigate("/profile-settings")
  }

  function handleGoToCart(){
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(typeof json.title))
    navigate("/cart")
  }

  function handleLogOut(){
    navigate("/login")
  }

  function handleNavigateToProfSettings(){
    navigate('/profile-settings')
  }

  function handleGoToHome(){
    navigate("/")
  }

  return (
    <div>
    <Navbar expand="lg"  className="bg-body-tertiary fixed-top"> 
      <Container fluid>
        <button style={{border: "none"}}onClick={handleShowSideBar}>
        <Navbar.Brand >Navbar scroll</Navbar.Brand>
        </button>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={handleGoToHome}>Home</Nav.Link>
            <Nav.Link onClick={handleGoToCart}>Cart</Nav.Link>
            <NavDropdown title="Profile" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={handleLogOut} >Log out</NavDropdown.Item>
              <NavDropdown.Item onClick={handleProfileSettings}>
               Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Change profile
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleNavigateToProfSettings}>
              {currentUser && currentUser.email}
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => handleSearchInput(e)}
            />
            <Button variant="outline-success" onClick={handleSearchButton}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <SideNavbar showSideBarProp={showSideBar} hideSideBarProp={handleHideSideBar}></SideNavbar>
    <Routes>
    <Route path="/" element={<Content passSearchInput={passSearchInput}/>}/>
    </Routes>
    
    </div>
  )
}
