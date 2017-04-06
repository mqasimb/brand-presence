const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Panel, Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel, Row} = require('react-bootstrap');
const actions = require('../actions/index');
const { connect } = require('react-redux');

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

var inputStyle = {
  backgroundColor: '#001932',
  color: '#ffffff',
  borderColor: '#4C5E6F'
}
var errorStyle = {
  color: '#ffffff',
}
const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl style={inputStyle} {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span style={errorStyle}>{warning}</span>))}</ControlLabel>
    </div>
)

class LoginForm extends React.Component {
    submitLogin(values) {
      console.log(values)
        this.props.dispatch(actions.registerAction(values))
    }
  render() {
  var formStyle = {
    backgroundColor: '#0D355D',
    paddingBottom: '20px',
    marginTop: '2.5em',
    borderRadius: '0'
  }
  var buttonStyle = {
    backgroundColor: '#0E86CA',
    color: '#ffffff',
    fontFamily: 'TitilliumSemiBold',
    fontSize: '1.25em',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingRight: '30px',
    paddingLeft: '30px',
    borderRadius: '0',
    borderColor: '#10A1DE'
  }
  var demoButtonStyle = {
    backgroundColor: '#0E86CA',
    color: '#ffffff',
    fontFamily: 'TitilliumSemiBold',
    fontSize: '1em',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '0',
    borderColor: '#10A1DE',
    marginTop: '10px',
    whiteSpace: 'normal'
  }
  var panelStyle = {
    backgroundColor: '#0E86CA',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'TitilliumSemiBold',
    fontSize: '1.5em',
    borderRadius: '0',
    borderColor: '#0E86CA'
  }
  var textStyle = {
    textAlign: 'center',
    color: '#ffffff'
  }
  var demoReminderStyle = {
    fontFamily: 'TitilliumSemiBold',
      textAlign: 'center',
      paddingTop: '20px',
      color: '#ffffff'
    }
  const { handleSubmit, pristine, submitting } = this.props
  return (
    <Col xs={12} xsOffset={0} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
      <div className='login-form'>
            <Form horizontal style={formStyle} onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <Panel style={panelStyle}>LOGIN</Panel>

            <div style={demoReminderStyle}>
            Click to access the demo account
            </div>
            <FormGroup>
              <Col style={textStyle} xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Button onClick={this.props.demoButtonAction} style={demoButtonStyle}>Demo Account / Login</Button>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalUsername">
              <Row><Col componentClass={ControlLabel} style={textStyle} xsOffset={3} smOffset={3} xs={6} sm={6}>
                Username
              </Col></Row>
              <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Field controlId="formHorizontalUsername" name="username" type="text" component={renderField} label="Username" placeholder="Username"/>
              </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalPassword">
              <Row><Col componentClass={ControlLabel} style={textStyle} xsOffset={4} smOffset={3} xs={4} sm={6}>
                Password
              </Col></Row>
              <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Field controlId="formHorizontalPassword" name="password" type="password" component={renderField} label="Password" placeholder="Password"/>
              </Col>
            </FormGroup>
            
             <FormGroup>
              <Col style={textStyle} xs={6} xsOffset={3}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col style={textStyle} xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Button style={buttonStyle} type="submit" disabled={pristine || submitting}>Submit</Button>
              </Col>
            </FormGroup>
            </Form>
    </div>
    </Col>
  )
}
}

function mapStateToProps(state) {
    return ({
        state: state
    })
}

LoginForm = connect(mapStateToProps)(LoginForm);

LoginForm = reduxForm({
  form: 'LoginForm',  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(LoginForm);

module.exports = LoginForm;