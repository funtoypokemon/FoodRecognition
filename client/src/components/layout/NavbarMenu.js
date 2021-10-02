import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import laCuisineLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const NavbarMenu = () => {
  const { logoutUser } = useContext(AuthContext);
  const logout = () => logoutUser();
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={laCuisineLogo}
          alt="laCuisineLogo"
          width="32"
          height="32"
          className="mr-2"
          style={{ marginLeft: 10 }}
        />
        LaCuisine
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white btnBHide btnBDisplay"
            to="/blog"
            as={Link}
          >
            Blog
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white btnBHide btnBDisplay"
            to="/write"
            as={Link}
          >
            Write
          </Nav.Link>

          <Nav.Link
            className="font-weight-bolder text-white btnBHide btnBDisplay {}"
            to="/dashboard"
            as={Link}
          >
            FlashCard
          </Nav.Link>

          <Nav.Link
            className="font-weight-bolder text-white btnBHide btnBDisplay"
            to="/food"
            as={Link}
          >
            Food
          </Nav.Link>

          <Nav.Link
            className="font-weight-bolder text-white btnBHide btnBDisplay"
            to="/ingredient"
            as={Link}
          >
            Ingredient
          </Nav.Link>

          <Nav.Link
            className="font-weight-bolder text-white btnBHide btnBDisplay"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav style={{ marginRight: 15 }}>
        <Nav.Link className="font-weight-bolder text-white" disabled>
          Welcome {username}
        </Nav.Link>
        <Button
          variant="secondary"
          className="font-weight-bolder text-white"
          onClick={logout}
        >
          <img
            src={logoutIcon}
            alt="logoutIcon"
            width="32"
            height="32"
            className="mr-2"
          />
          Logout
        </Button>
        <Nav></Nav>
      </Nav>
    </Navbar>
  );
};

export default NavbarMenu;
