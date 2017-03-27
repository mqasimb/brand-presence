const React = require('react');
const { connect } = require('react-redux');
const router = require('react-router');
const actions = require('../actions/index');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row } = require('react-bootstrap');
const { reset } = require('redux-form');
const EditIssueForm = require('./edit-issue-form');

class Issue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {edit: false}
    }
    editIssue(values) {
        this.props.dispatch(actions.editIssue(values, this.props.id))
            .then((boolean) => {
                this.setState({edit: false})
            })
    }
    enableEdit() {
        this.setState({edit: true});
    }
    cancelEdit() {
        this.setState({edit: false});
    }
    render() {
        var newIssueStyle={
            paddingTop: '30px'
        }
        return(
            <div style={newIssueStyle}>
            {(this.state.edit) ? (<EditIssueForm form={"EditIssueForm-"+this.props.id} onSubmit={this.editIssue.bind(this)} cancelEdit={this.cancelEdit.bind(this)} initialValues={{topic: this.props.topic, title: this.props.title, issue: this.props.issue}}/>) : (<div><button onClick={this.enableEdit.bind(this)}>Edit</button>{this.props.topic}
            {this.props.title}
            {this.props.issue}
            {this.props.date}</div>)}
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return( {

    } )
}

var Container = connect(mapStateToProps)(Issue);

module.exports = Container;