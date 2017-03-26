const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('react-bootstrap');
const actions = require('../actions/index');
const { connect } = require('react-redux');

const validate = values => {
  const errors = {}
  if (!values.question) {
    errors.question = 'Please enter a question'
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
    <FormControl {...input} name={name} componentClass="select" placeholder="JavaScript">
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

class NewQuestionForm extends React.Component {
  render() {
  var formStyle = {
    paddingTop: '30px',
    textAlign: 'center'
  }
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='new-question-form'>
            <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>

            <FormGroup controlId="formControlsSelect">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field name="topic" component={renderSelect} label="Question Topic"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalNewQuestion">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field controlId="formHorizontalNewQuestion" name="title" type="text" component={renderField} label="Title" placeholder="Question title..."/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalNewQuestion">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field controlId="formHorizontalNewQuestion" name="question" type="text" component={renderTextArea} label="Question" placeholder="Write a question..."/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col>
                <Button bsStyle="info" type="submit" disabled={pristine || submitting}>Submit Question</Button>
              </Col>
            </FormGroup>
            </Form>
    </div>
  )
}
}

NewQuestionForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(NewQuestionForm);

module.exports = NewQuestionForm;