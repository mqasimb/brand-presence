const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('react-bootstrap');
const actions = require('../actions/index');
const { connect } = require('react-redux');

const validate = values => {
  const errors = {}
  if (!values.solution) {
    errors.solution = 'Please enter a solution'
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
const renderField = ({ input, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl style={inputStyle} {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span style={errorStyle}>{warning}</span>))}</ControlLabel>
    </div>
)

const renderTextArea = ({ input, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl style={inputStyle} {...input} componentClass="textarea" name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class SolutionForm extends React.Component {
  mouseOver(event) {
        event.target.style.backgroundColor = '#00AEFF'
  }
    mouseLeave(event) {
        event.target.style.backgroundColor = '#0E86CA'
  }
  render() {
  var formStyle = {
    paddingTop: '30px',
    textAlign: 'center'
  }
  var buttonStyle = {
      backgroundColor: '#0E86CA',
      color: '#ffffff',
      fontFamily: 'TitilliumSemiBold',
      fontSize: '1em',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingRight: '30px',
      paddingLeft: '30px',
      borderRadius: '0',
      borderColor: '#10A1DE'
  }
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='solution-form'>
            <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>

            <FormGroup controlId="formHorizontalSolution">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field controlId="formHorizontalSolution" name="solution" type="text" component={renderTextArea} label="Solution" placeholder="Write a solution..."/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col>
                <Button style={buttonStyle} type="submit" disabled={pristine || submitting}>Submit Issue</Button>
              </Col>
              {(this.props.isEdit) ? (<Col>
                <Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} onClick={this.props.cancelEdit.bind(this)}>Cancel Edit</Button>
              </Col>) : (null)}
            </FormGroup>
            </Form>
    </div>
  )
}
}

SolutionForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(SolutionForm);

module.exports = SolutionForm;