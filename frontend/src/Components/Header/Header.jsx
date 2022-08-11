import { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Athletes</Navbar.Brand>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
