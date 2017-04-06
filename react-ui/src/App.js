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
        <LinkContainer className="nav-link" to='/login'><NavItem eventKey={1}><span className="nav-link">Login</span></NavItem></LinkContainer>
        <LinkContainer className="nav-link" to='/register'><NavItem eventKey={2}><span className="nav-link">Register</span></NavItem></LinkContainer>
        </Nav>;
        var loggedInUser = <Nav pullRight>
        <LinkContainer className="nav-link" to='/new-issue'><NavItem className="nav-text-container" style={LinkStyle}><div style={navButtonStyle}></div><span className="nav-link">Post New Issue</span></NavItem></ LinkContainer>
        <NavItem className="nav-text-container" style={LinkStyle} href='' onClick={this.userLogout.bind(this)}><div style={navButtonStyle}></div><span className="nav-link">Logout</span></NavItem></Nav>;
        var topStyle={
            'overflowX': 'hidden',
            backgroundColor: '#002A54',
            height: '100vh',
        }
        var brandStyle = {
            color: '#00AEFF',
            fontFamily: 'TitilliumBold',
            fontSize: '2em'
        }
        var navBarStyle = {
            backgroundColor: '#0E3762',
            borderColor: '#0E3762',
            paddingTop: '15px',
            paddingBottom: '15px'
        }
        var childrenStyle = {
            marginTop: '100px',
        }
        return (
            <div className="top-nav" style={topStyle}>
            <div className='nav-bar'>
            <Navbar style={navBarStyle} className="fixed-top-nav" fixedTop>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link style={brandStyle} to='/'>Smarter Student</Link>
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
              <div style={childrenStyle}>
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