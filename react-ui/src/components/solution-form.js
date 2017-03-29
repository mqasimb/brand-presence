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

const renderField = ({ input, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

const renderTextArea = ({ input, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} componentClass="textarea" name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class SolutionForm extends React.Component {
  render() {
  var formStyle = {
    paddingTop: '30px',
    textAlign: 'center'
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
                <Button bsStyle="info" type="submit" disabled={pristine || submitting}>Submit Issue</Button>
              </Col>
              {(this.props.isEdit) ? (<Col>
                <Button bsStyle="info" onClick={this.props.cancelEdit.bind(this)}>Cancel Edit</Button>
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