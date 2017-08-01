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
    <div style={{height: '34'}}>
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
          backgroundColor: '#0D355D'
      }
      var buttonStyle = {
          backgroundColor: '#0E86CA',
          color: '#ffffff',
          fontFamily: 'TitilliumSemiBold',
          fontSize: '.9em',
          paddingTop: '5px',
          paddingBottom: '5px',
          paddingRight: '10px',
          paddingLeft: '10px',
          borderRadius: '0',
          borderColor: '#10A1DE',
          height: '34px',
          marginRight: '10px'
      }
      var textStyle = {
          color: '#00AEFF',
          textAlign: 'left',
          marginBottom: '10px'
      }
      const { handleSubmit, pristine, submitting } = this.props
      return (
              <div className='search-issue-form'>
                  <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
                      <FormGroup style={{margin: '0px', verticalAlign: 'middle'}} controlId="formHorizontalSearchIssue">
                          <Col xs={12} sm={6} md={4} lg={4}>
                              <Field controlId="formHorizontalNewIssue" name="search" type="text" component={renderField} label="Title" placeholder="Search issue name..."/>
                          </Col>
                          <Col xs={12} sm={6} md={6} lg={6}>
                              <Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} bsStyle="info" type="submit" disabled={pristine || submitting}>Search Issue</Button>
                              {(this.props.showCancel) ? (<Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} bsStyle="info" onClick={this.props.cancelSearch.bind(this)} type="submit" disabled={pristine || submitting}>Cancel</Button>) : (null)}
                          </Col>
                      </FormGroup>
                  </Form>
              </div>

      )
  }
}

SearchIssueForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(SearchIssueForm);

module.exports = SearchIssueForm;