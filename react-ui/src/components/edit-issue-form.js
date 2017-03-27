const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('react-bootstrap');
const actions = require('../actions/index');
const { connect } = require('react-redux');

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

const renderSelect = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} name={name} componentClass="select">
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
  render() {
  var formStyle = {
    paddingTop: '30px',
    textAlign: 'center'
  }
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='new-issue-form'>
            <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>

            <FormGroup controlId="formHorizontalEditIssue">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field controlId="formHorizontalEditIssue" name="topic" component={renderSelect} label="Issue Topic"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEditIssue">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field controlId="formHorizontalEditIssue" name="title" type="text" component={renderField} label="Title" placeholder="Question title..."/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEditIssue">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field controlId="formHorizontalEditIssue" name="issue" type="text" component={renderTextArea} label="Issue" placeholder="Write an issue..."/>
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

EditIssueForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(EditIssueForm);

module.exports = EditIssueForm;