const React = require('react');
const router = require('react-router');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const LoginForm = require('./login-form');

class Login extends React.Component {
    submitLogin = (values) => {
        this.props.dispatch(actions.loginAction(values)).then(function(bool) {
            if(bool) {
                router.hashHistory.push('/');
            }
        });
    }
    submitLoginDemoAccount = () => {
        this.props.dispatch(actions.loginAction({username:'DemoAccount', password:'123456789'})).then(function(bool) {
            if(bool) {
                //If user logs in succesfully redirect to the home page
                router.hashHistory.push('/');
            } 
        });
    }
    
    render(props) {
        return (
            <div>
                <LoginForm demoButtonAction={this.submitLoginDemoAccount} onSubmit={this.submitLogin}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return({
        auth: state.app.auth
    })
}

var Container = connect(mapStateToProps)(Login);

module.exports = Container;