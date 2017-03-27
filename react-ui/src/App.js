import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button, Select, Glyphicon } from 'react-bootstrap';

const router = require('react-router');
const Link = router.Link;
const actions = require('./actions/index');
const { connect } = require('react-redux');
const axios = require('axios');
const { LinkContainer } = require('react-router-bootstrap');

class App extends React.Component {
    userLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.logoutAction());
        router.hashHistory.push('/login');
    }
    userLogin(event) {
        event.preventDefault();
        router.hashHistory.push('/login');
    }
    userRegister(event) {
        event.preventDefault();
        router.hashHistory.push('/register');
    }
    render(props) {
        var isLoggedIn = this.props.auth.authenticated;
        const LinkStyle = {
            'color': '#06D7D4',
            textAlign: 'center'
        }
        var iconSize = {
            height: '20px',
            fill: '#01b8c5'
        }
        var navButtonStyle = {
            textAlign: 'center'
        }
        var textStyle = {
            fontColor: '#01b8c5'
        }
        var loggedOutUser = <Nav pullRight>
        <LinkContainer to='/login'><NavItem eventKey={1}>Login</NavItem></LinkContainer>
        <LinkContainer to='/register'><NavItem eventKey={2}>Register</NavItem></LinkContainer>
        </Nav>;
        var loggedInUser = <Nav pullRight><NavItem className="nav-text-container" style={LinkStyle} href='' onClick={this.userLogout.bind(this)}><div style={navButtonStyle}></div><span className='nav-text'>Logout</span></NavItem></Nav>;
        var topStyle={
            'overflowX': 'hidden',
            height: '100vh',
            marginTop: '100px'
        }
        var brandStyle = {
            color: '#06D7D4',
            fontFamily: 'UbuntuLight',
            fontSize: '1.5em'
        }
        return (
            <div className="top-nav" style={topStyle}>
            <div className='nav-bar'>
            <Navbar className="fixed-top-nav" fixedTop>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to='/'>Smarter Student</Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Form pullLeft>
                </Navbar.Form>
                <Navbar.Collapse>
                    {(isLoggedIn) ? (loggedInUser) : (loggedOutUser)}
                </Navbar.Collapse>
              </Navbar>
              </div>
              <div className='children'>
              {this.props.children}
              </div>
        </div>
            )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth
    })
}

var Container = connect(mapStateToProps)(App);

module.exports = Container;