const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('react-bootstrap');
const actions = require('../actions/index');

const validate = values => {
  const errors = {}
  if (!values.url) {
    errors.username = 'Please enter a url'
  }
  return errors
}

const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class AddURLForm extends React.Component {
  render() {
  var formStyle = {
    paddingTop: '30px',
    textAlign: 'center'
  }
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='add-url-form'>
            <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <FormGroup controlId="formHorizontalAddURL">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field controlId="formHorizontalAddURL" name="url" type="text" component={renderField} label="URL" placeholder="Provide a url..."/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col>
                <Button bsStyle="info" type="submit" disabled={pristine || submitting}>Submit URL</Button>
              </Col>
            </FormGroup>
            </Form>
    </div>
  )
}
}

AddURLForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(AddURLForm);

module.exports = AddURLForm;