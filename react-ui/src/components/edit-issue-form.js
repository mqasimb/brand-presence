const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Col, ControlLabel} = require('react-bootstrap');

const validate = values => {
  const errors = {}
  if (!values.issue) {
    errors.issue = 'Please enter an issue'
  }
  if (!values.topic) {
    errors.topic = 'Please choose a topic'
  }
  if (values.topic === "default") {
    errors.topic = 'Please choose a topic'
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

const renderSelect = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl style={inputStyle} {...input} name={name} componentClass="select">
                <option value="default">Choose A Topic</option>
                <option value="JavaScript">JavaScript</option>
                <option value="CSS">CSS</option>
                <option value="HTML">HTML</option>
                <option value="NodeJS">NodeJS</option>
                <option value="React">React</option>
                <option value="AngularJS">AngularJS</option>
                <option value="BackboneJS">BackboneJS</option>
                <option value="EmberJS">EmberJS</option>
                <option value="Algorithms">Algorithms</option>                
    </FormControl>
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class EditIssueForm extends React.Component {
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
      <div className='new-issue-form'>
            <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>

            <FormGroup controlId="formHorizontalEditIssue">
              <Col componentClass={ControlLabel} style={textStyle} xs={12} sm={12}>
                Issue
              </Col>
              <Col xs={12} sm={12} md={10} lg={10}>
                <Field controlId="formHorizontalEditIssue" name="topic" component={renderSelect} label="Issue Topic"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEditIssue">
              <Col componentClass={ControlLabel} style={textStyle} xs={12} sm={12}>
                Title
              </Col>
              <Col xs={12} sm={12} md={10} lg={10}>
                <Field controlId="formHorizontalEditIssue" name="title" type="text" component={renderField} label="Title" placeholder="Question title..."/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEditIssue">
              <Col componentClass={ControlLabel} style={textStyle} xs={12} sm={12}>
                Issue
              </Col>
              <Col xs={12} sm={12} md={10} lg={10}>
                <Field controlId="formHorizontalEditIssue" name="issue" type="text" component={renderTextArea} label="Issue" placeholder="Write an issue..."/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col style={colStyle} xs={12} sm={12} md={10} lg={10}>
                <Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} type="submit" disabled={pristine || submitting}>Edit</Button>
                <Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} onClick={this.props.cancelEdit}>Cancel</Button>
              </Col>
            </FormGroup>
            </Form>
    </div>
  )
}
}

EditIssueForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(EditIssueForm);

module.exports = EditIssueForm;