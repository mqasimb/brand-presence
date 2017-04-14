var React = require('react');
var { connect } = require('react-redux');
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