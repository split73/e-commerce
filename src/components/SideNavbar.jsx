import React from 'react'
import { Container, Offcanvas, Form } from 'react-bootstrap';  
export default function SideNavbar(props) {

    
  return (
    <>  
    <Container className='p-4'>  
      <Offcanvas show={props.showSideBarProp} onHide={props.hideSideBarProp}>  
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
          Some dummy text, we can have any text or element at at this place.  
        </Offcanvas.Body>  
      </Offcanvas>  
      </Container>  
    </>  
  )
}
