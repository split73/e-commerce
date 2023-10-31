import React, {useState} from 'react'
import { Container, Offcanvas, Form } from 'react-bootstrap';  
import Toggle from "react-toggle";
import "./assets/sideBar.css";
import GitHub_Logo from "./assets/image/GitHub_Logo.png"
import github_mark from "./assets/image/github-mark.png"

export default function SideNavbar(props) {
  const [isDark, setIsDark] = useState(true);
    
  return (
    <>  
    <Container className='p-4' >  
      <Offcanvas show={props.showSideBarProp} id="sideBar" onHide={props.hideSideBarProp}>  
        <Offcanvas.Header closeButton>  
          {/* <Offcanvas.Title>Links</Offcanvas.Title>   */}
        </Offcanvas.Header>  
        <Offcanvas.Body>  
        <a href='https://github.com/split73/e-commerce'>
        <img src={github_mark} alt='github' style={{height: "auto", width: "auto", maxHeight: "50px"}}></img>
        <img src={GitHub_Logo} alt='github' style={{height: "auto", width: "auto", maxHeight: "50px"}}></img>
        </a>
    {/* <div>Dark mode</div>
          <Toggle
              checked={isDark}
              onChange={({ target }) => setIsDark(target.checked)}
              icons={{ checked: "", unchecked: "" }}
              aria-label="Dark mode toggle"
            /> */}
        </Offcanvas.Body>  
      </Offcanvas>  
      </Container>  
    </>  
  )
}
