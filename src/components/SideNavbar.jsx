import React, {useState} from 'react'
import { Container, Offcanvas, Form } from 'react-bootstrap';  
import Toggle from "react-toggle";
import "./assets/sideBar.css";
export default function SideNavbar(props) {
  const [isDark, setIsDark] = useState(true);
    
  return (
    <>  
    <Container className='p-4' >  
      <Offcanvas show={props.showSideBarProp} id="sideBar" onHide={props.hideSideBarProp}>  
        <Offcanvas.Header closeButton>  
          <Offcanvas.Title>Sidebar Title</Offcanvas.Title>  
        </Offcanvas.Header>  
        <Offcanvas.Body>  
        <Form>
        <div className="mb-3">
          <Form.Check
            type={"checkbox"}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
        </div>
      
    </Form>
    <div>Dark mode</div>
          <Toggle
              checked={isDark}
              onChange={({ target }) => setIsDark(target.checked)}
              icons={{ checked: "", unchecked: "" }}
              aria-label="Dark mode toggle"
            />
        </Offcanvas.Body>  
      </Offcanvas>  
      </Container>  
    </>  
  )
}
