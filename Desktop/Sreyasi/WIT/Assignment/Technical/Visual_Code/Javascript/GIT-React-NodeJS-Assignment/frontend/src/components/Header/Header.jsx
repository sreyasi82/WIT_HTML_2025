//import REACT from "react"
import logo from "../../img/logo.png";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "./Header.css" ;


let Header = () => {
	return(
      <>        
            <Navbar className="bg-body-tertiary justify-content-center header_container" >
                <Container>
                    <Navbar.Brand href="/home">
                        <img
                        src={logo}
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                        alt="To-Do App logo"
                        />
                    </Navbar.Brand>
                   <Nav.Item>
                        <Nav.Link href="/home">Home</Nav.Link>                    
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/Todos">Task list</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Calender View</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>Help</Nav.Link>
                    </Nav.Item>
                </Container>
            </Navbar>        
      </>  
    );
}

export default Header;