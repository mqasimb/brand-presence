const React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row } = require('react-bootstrap');
const NewQuestionForm = require('./new-question-form');

class NewQuestion extends React.Component {
    render() {
        var newQuestionStyle={
            paddingTop: '30px'
        }
        return(
            <div style={newQuestionStyle}>
            <NewQuestionForm form='NewQuestionForm' onSubmit={(values) => console.log(values)}/>
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return( {

    } )
}

var Container = connect(mapStateToProps)(NewQuestion);

module.exports = Container;