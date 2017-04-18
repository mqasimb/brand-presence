const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Col, ControlLabel} = require('react-bootstrap');

const validate = values => {
  const errors = {}
  if (!values.url) {
    errors.url = 'Please enter a url'
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

class EditURLForm extends React.Component {
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
      borderColor: '#10A1DE',
      marginRight: '10px'
  }
  var textStyle = {
      color: '#ffffff',
      textAlign: 'left',
      marginBottom: '10px'
  }
  var colStyle = {
    textAlign: 'right'
  }
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='edit-url-form'>
            <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <FormGroup controlId="formHorizontalEditURL">
              <Col componentClass={ControlLabel} style={textStyle} xs={12} sm={12}>
                Edit URL
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <Field controlId="formHorizontalEditURL" name="url" type="text" component={renderField} label="URL" placeholder="Please enter a URL..."/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col style={colStyle} xs={12} sm={12} md={8} lg={8}>
                <Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} type="submit" disabled={pristine || submitting}>Edit</Button>
                <Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} onClick={this.props.cancelEdit}>Cancel</Button>
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