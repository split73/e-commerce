import React, { useEffect, useState } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { db } from '../auth/firebase';
import { collection, getDocs } from "firebase/firestore";
import Cart from './Cart';
import PrivateRoute from '../auth/auth-components/PrivateRoute';
import "./assets/TopNavbar.css";
import "react-toggle/style.css"

export default function TopNavbar() {


  const [showSideBar, setShowSideBar] = useState(false);
  const { currentUser } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [passSearchInput, setPassSearchInput] = useState("");
  const [cartItemsCounter, setCartItemsCounter] = useState(0)
  const navigate = useNavigate();

  const increaseCartItemsCounter = () => {
    setCartItemsCounter(prev => prev + 1)
  }

  const decreaseCartItemsCounter = () => {
    setCartItemsCounter(prev => prev - 1)
  }

  const fetchPost = async () => {
    if (currentUser !== null){
      await getDocs(collection(db, currentUser.email))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
              setCartItemsCounter(newData.length);                
          })
    }
  }

useEffect(() => {
  fetchPost()
}, [])

const handleSearchInputKeyDown = (e) => {
  if (e.code === "Enter"){
    e.preventDefault()
  }
}

const handleSearchInput = (e) => {
  e.preventDefault()
  setSearchInput(e.target.value);
}

const handleSearchButton = () => {
  navigate("/");
  setPassSearchInput(searchInput);
  setSearchInput("")
}

  const handleShowSideBar = () => {
    setShowSideBar(true)
}; 

const handleHideSideBar = () => {
  setShowSideBar(false)
};  

  function handleProfileSettings(){
    navigate("/profile-settings")
  }

  function handleGoToCart(){
    navigate("/cart")
  }

  function handleChangeProfile(){
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
    <Navbar expand="lg"  className="fixed-top" id='top-navbar'> 
      <Container fluid>
        <button id='to-sideBar' onClick={handleShowSideBar}>
        <Navbar.Brand style={{position: "relative", left: "9px"}}>Side bar</Navbar.Brand>
        </button>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={handleGoToHome}>Home</Nav.Link>
            <Nav.Link onClick={handleGoToCart}>Cart <FontAwesomeIcon icon={faCartShopping} />{cartItemsCounter}</Nav.Link>
            <NavDropdown title="Profile" id="navbarScrollingDropdown">
              <NavDropdown.Item  onClick={handleChangeProfile} >Change profile</NavDropdown.Item>
              <NavDropdown.Item  onClick={handleProfileSettings}>
               Settings
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleNavigateToProfSettings}>
              {currentUser && <div>{currentUser.email}</div>}
            </Nav.Link>
            
          </Nav>
          
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => handleSearchInput(e)}
              onKeyDown={handleSearchInputKeyDown}
              value={searchInput}
            />
            <Button variant="outline-success" onClick={handleSearchButton}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <SideNavbar showSideBarProp={showSideBar} hideSideBarProp={handleHideSideBar} ></SideNavbar>
    <Routes>
    <Route path="/" element={<Content passSearchInput={passSearchInput} increaseCartItemsCounter={increaseCartItemsCounter}/>}/>
    <Route path="/cart" element={
        <PrivateRoute>
          <Cart decreaseCartItemsCounter={decreaseCartItemsCounter}/>
        </PrivateRoute>
      }/>
    </Routes>
    
    </div>
  )
}
