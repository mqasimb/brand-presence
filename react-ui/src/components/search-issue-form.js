const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Col, ControlLabel, Panel} = require('react-bootstrap');

const validate = values => {
    const errors = {}
    if (!values.seach) {
        errors.issue = 'Please enter something to search...'
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

class SearchIssueForm extends React.Component {
  mouseOver(event) {
      event.target.style.backgroundColor = '#00AEFF'
  }
  mouseLeave(event) {
      event.target.style.backgroundColor = '#0E86CA'
  }
  render() {
      var formStyle = {
          paddingTop: '30px',
          paddingBottom: '30px',
          textAlign: 'center',
          backgroundColor: '#0D355D',
          maxWidth: '1000px',
          margin: '0 auto',
          paddingLeft: '30px',
          paddingRight: '30px'
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
      var panelStyle = {
          backgroundColor: '#0D355D',
          color: '#00AEFF',
          textAlign: 'center',
          fontFamily: 'TitilliumSemiBold',
          fontSize: '1.5em',
          borderRadius: '0',
          borderColor: '#0D355D'
      }
      var textStyle = {
          color: '#00AEFF',
          textAlign: 'left',
          marginBottom: '10px'
      }
      const { handleSubmit, pristine, submitting } = this.props
      return (
          <Col xs={12} xsOffset={0} sm={12} smOffset={0} md={12} mdOffset={0} lg={12} lgOffset={0}>
              <div className='search-issue-form'>
                  <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
                      <FormGroup controlId="formHorizontalNewIssue">
                          <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                              <Field controlId="formHorizontalNewIssue" name="search" type="text" component={renderField} label="Title" placeholder="Type and issue name..."/>
                          </Col>
                      </FormGroup>
                      
                      <FormGroup>
                          <Col>
                              <Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} bsStyle="info" type="submit" disabled={pristine || submitting}>Search Issue</Button>
                          </Col>
                      </FormGroup>
                  </Form>
              </div>
          </Col>
      )
  }
}

SearchIssueForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(SearchIssueForm);

module.exports = SearchIssueForm;