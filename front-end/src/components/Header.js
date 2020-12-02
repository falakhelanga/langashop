import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Route } from "react-router-dom";
import Search from "./Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";

import * as userActions from "../store/actions/userActions";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [navBarClass, setNavBarClass] = useState(["navbar-wraper"]);
  const [mobileClass, setMobileClass] = useState(["mobile_nav "]);
  const cartState = useSelector((state) => state.addToCart);
  const userState = useSelector((state) => state.userLogin);
  const wishListState = useSelector((state) => state.getWishLists);
  const dispatch = useDispatch();
  const { cart } = cartState;
  const { token, user, isAdmin } = userState;
  const isAuth = token != null;

  const [searh, setSearch] = useState("");
  const { wishList, loading } = wishListState;

  const searchHandler = (e) => {
    e.preventDefault();
  };
  const mobileNavBarHandler = () => {
    const newNavBarClass = [...navBarClass];
    const newMobileClass = [...mobileClass];
    newNavBarClass.push("showNav");
    newMobileClass.push("showMobile");

    setNavBarClass(newNavBarClass);
    setMobileClass(newMobileClass);
    setOpenNav(true);
  };

  const closeMobileNav = () => {
    const newNavBarClass = [...navBarClass];
    const newMobileClass = [...mobileClass];
    newNavBarClass.pop();
    newMobileClass.pop();

    setNavBarClass(newNavBarClass);
    setMobileClass(newMobileClass);
    setOpenNav(false);
  };
  return (
    <div className={navBarClass.join(" ")}>
      <div
        className="pl-2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
          width: "100%",
        }}
      >
        {" "}
        <LinkContainer
          to="/"
          style={{
            fontWeight: "bold",
            fontFamily: "'Oswald', sans-serif",
            cursor: "pointer",
          }}
        >
          <h1 className="header_h1">ProComputers</h1>
        </LinkContainer>
        <Route render={({ history }) => <Search history={history} />} />
        <div>
          <Nav
            className="ml-auto  d-none d-lg-flex "
            style={{
              fontSize: "1rem",
              fontFamily: "'Oswald', sans-serif",
            }}
          >
            <LinkContainer to="/cart">
              <Nav.Link className="text-dark">
                {" "}
                <Badge
                  className="mr-2"
                  badgeContent={cart.length}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <ShoppingCartIcon fontSize="small" />
                </Badge>
                Cart
              </Nav.Link>
            </LinkContainer>
            {isAuth && (
              <LinkContainer to="/wishList">
                <Nav.Link className="text-danger">
                  {" "}
                  <Badge
                    className="mr-1"
                    badgeContent={wishList ? wishList.length : null}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <FavoriteIcon fontSize="small" />
                  </Badge>
                  <span className="text-dark"> My List</span>
                </Nav.Link>
              </LinkContainer>
            )}

            {isAuth ? (
              <NavDropdown
                title={<span className="text-dark my-auto">{user.name}</span>}
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item className="text-dark">
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item
                  className="text-dark"
                  onClick={() => {
                    dispatch(userActions.userLogOut());
                  }}
                >
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/signin">
                <Nav.Link className="text-dark">
                  {" "}
                  <i className="fa fa-user" aria-hidden="true"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}

            {isAdmin && (
              <NavDropdown
                title={<span className="text-dark my-auto">Admin</span>}
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item className="text-dark">
                    Users
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item className="text-dark">
                    Admin Products
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item className="text-dark">
                    Orders
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
          <div className="d-flex align-items-center d-block d-lg-none ">
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link className="text-dark">
                  {" "}
                  <Badge
                    className="mr-2"
                    badgeContent={cart.length}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </Badge>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontFamily: "'Oswald', sans-serif",
                    }}
                  >
                    <span className="d-none d-md-block">Cart</span>
                  </span>
                </Nav.Link>
              </LinkContainer>
              {isAuth && (
                <LinkContainer to="/wishList">
                  <Nav.Link className="text-danger">
                    {" "}
                    <Badge
                      className="mr-1"
                      badgeContent={wishList ? wishList.length : null}
                      color="secondary"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <FavoriteIcon fontSize="small" />
                    </Badge>
                    <span className="text-dark d-none d-md-block">
                      {" "}
                      My List
                    </span>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            {openNav ? (
              <CloseIcon
                className="d-block d-lg-none "
                onClick={() => {
                  closeMobileNav();
                }}
              />
            ) : (
              <IconButton
                className="d-block d-lg-none "
                onClick={() => {
                  mobileNavBarHandler();
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </div>
        </div>
      </div>

      <div
        className={mobileClass.join(" ")}
        // style={{
        //   width: "50%",
        //   display: "flex",

        // }}
      >
        <Route render={(history) => <Search history={history} />} />
        <Nav
          className="ml-auto  d-flex flex-column d-lg-none text-left  w-100 mt-2"
          style={{
            fontSize: "1rem",
            fontFamily: "'Oswald', sans-serif",
          }}
        >
          {isAuth ? (
            <NavDropdown
              title={<span className="text-dark my-auto">{user.name}</span>}
              id="basic-nav-dropdown"
            >
              <LinkContainer
                to="/profile"
                onClick={() => {
                  closeMobileNav();
                }}
              >
                <NavDropdown.Item>Profle</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Item
                onClick={() => {
                  dispatch(userActions.userLogOut());

                  closeMobileNav();
                }}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer
              to="/signin"
              onClick={() => {
                closeMobileNav();
              }}
            >
              <Nav.Link>
                {" "}
                <i className="fa fa-user" aria-hidden="true"></i> Sign In
              </Nav.Link>
            </LinkContainer>
          )}

          {isAdmin && (
            <NavDropdown
              title={<span className="text-dark my-auto">Admin</span>}
              id="basic-nav-dropdown"
            >
              <LinkContainer
                to="/admin/users"
                onClick={() => {
                  closeMobileNav();
                }}
              >
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer
                to="/admin/products"
                onClick={() => {
                  closeMobileNav();
                }}
              >
                <NavDropdown.Item>Admin Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer
                to="/admin/orders"
                onClick={() => {
                  closeMobileNav();
                }}
              >
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </div>
    </div>
  );
  {
    /* <>
    <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect fixed="top">
        <Container className="justify-content-space-between">
          <LinkContainer to="/">
            <Navbar.Brand>LANGASHOP</Navbar.Brand>
          </LinkContainer>

          <Form
            inline
            className="d-none  d-md-flex  w-50 text-center justify-content-center  "
          >
            <FormControl
              type="text"
              placeholder="Search"
              className="w-50 mr-2"
            />
            <Button variant="outline-none " className="bg-light py-2">
              Search
            </Button>
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  {" "}
                  <Badge
                    className="mr-2"
                    badgeContent={cart.length}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </Badge>
                  Cart
                </Nav.Link>
              </LinkContainer>

              {isAuth ? (
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profle</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(userActions.userLogOut());
                    }}
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link>
                    {" "}
                    <i className="fa fa-user" aria-hidden="true"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {isAdmin && (
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Admin Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </> */
  }
};

export default Header;
