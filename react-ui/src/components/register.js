var React = require('react');
var { connect } = require('react-redux');
const actions = require('../actions/index');
var fetch = require('isomorphic-fetch');
var axios = require('axios');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('react-bootstrap');
const RegistrationForm = require('./registration-form');

class Register extends React.Component {
    render(props) {
        return (
            <div>
            <RegistrationForm/>
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return({
        registerInput: state.app.registerInput
    })
}

var Container = connect(mapStateToProps)(Register);

module.exports = Container;