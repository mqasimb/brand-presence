const React = require('react');
const { connect } = require('react-redux');
const RegistrationForm = require('./registration-form');

const Register = () => {
    return (
        <div>
            <RegistrationForm/>
        </div>
    )
}

module.exports = Register;