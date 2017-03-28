const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('react-bootstrap');
const actions = require('../actions/index');
const { connect } = require('react-redux');

const validate = values => {
  const errors = {}
  if (!values.url) {
    errors.url = 'Please enter a url'
  }
  return errors
}

const renderField = ({ input, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class EditURLForm extends React.Component {
  render() {
  var formStyle = {
    paddingTop: '30px',
    textAlign: 'center'
  }
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='edit-url-form'>
            <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <FormGroup controlId="formHorizontalEditURL">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field controlId="formHorizontalEditURL" name="url" type="text" component={renderField} label="URL" placeholder="Please enter a URL..."/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col>
                <Button bsStyle="info" type="submit" disabled={pristine || submitting}>Edit</Button>
              </Col>

              <Col>
                <Button bsStyle="info" onClick={this.props.cancelEdit}>Cancel</Button>
              </Col>
            </FormGroup>
            </Form>
    </div>
  )
}
}

EditURLForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(EditURLForm);

module.exports = EditURLForm;