const React = require('react');
const { connect } = require('react-redux');
const router = require('react-router');
const actions = require('../actions/index');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row } = require('react-bootstrap');
const { reset } = require('redux-form');
const EditIssueForm = require('./edit-issue-form');
const AddURLForm = require('./add-url-form');
const URLList = require('./url-list');
const SolutionForm = require('./solution-form');

class Issue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {edit: false, addURL: false, solutionEdit: false}
    }
    editIssue(values) {
        this.props.dispatch(actions.editIssue(values, this.props.id))
            .then((boolean) => {
                this.setState({edit: false})
            })
    }
    deleteIssue(values) {
        this.props.dispatch(actions.deleteIssue(this.props.id))
    }
    markAsSolved() {
        this.props.dispatch(actions.markIssueSolved(this.props.solved, this.props.id))
    }
    solutionEdit(toggle) {
        this.setState({solutionEdit: toggle})
    }
    submitSolutionEdit(values) {
        this.props.dispatch(actions.editSolution(values, this.props.id))
        this.setState({solutionEdit: false})
    }
    deleteSolution() {
        this.props.dispatch(actions.deleteSolution(this.props.id))
    }
    submitSolution(values) {
        this.props.dispatch(actions.addSolution(values, this.props.id))
    }
    addURLToggle(toggle) {
        this.setState({addURL: toggle})
    }
    addHelpfulURL(values) {
        this.props.dispatch(actions.addNewURL(values, this.props.id))
        this.props.dispatch(reset("AddURLForm-"+this.props.id))
    }
    enableEdit() {
        this.setState({edit: true});
    }
    cancelEdit() {
        this.setState({edit: false});
    }
    render() {
        var newIssueStyle={
            paddingTop: '30px',
            paddingBottom: '30px',
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: '#ffffff',
            color: '#242B33'
        }
        var buttonStyle = {
            backgroundColor: '#77BA33',
            color: '#ffffff',
            fontFamily: 'UbuntuBold',
            fontSize: '1.25em',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingRight: '10px',
            paddingLeft: '10px',
            borderRadius: '0',
            borderColor: '#77BA33'
        }
        return(
            <div style={newIssueStyle}>
            {(this.state.edit) ? (<EditIssueForm form={"EditIssueForm-"+this.props.id} onSubmit={this.editIssue.bind(this)} cancelEdit={this.cancelEdit.bind(this)} initialValues={{topic: this.props.topic, title: this.props.title, issue: this.props.issue}}/>) : (<div><Button style={buttonStyle} onClick={this.enableEdit.bind(this)}>Edit</Button><Button style={buttonStyle} onClick={this.deleteIssue.bind(this)}>Delete</Button>{this.props.topic}
            {this.props.title}
            {this.props.issue}
            {this.props.date}
            {(!this.props.solution || (this.props.solution === '')) ? (<SolutionForm form={"SolutionForm-"+this.props.id} onSubmit={this.submitSolution.bind(this)} cancelEdit={this.solutionEdit.bind(this, false)} isEdit={false} />) : (this.props.solution)}
            {(this.props.solution && this.state.solutionEdit) ? (<SolutionForm form={"SolutionEditForm-"+this.props.id} initialValues={{solution: this.props.solution}} onSubmit={this.submitSolutionEdit.bind(this)} cancelEdit={this.solutionEdit.bind(this, false)} isEdit={true} />) : (<Button onClick={this.solutionEdit.bind(this, true)}>Edit Solution</Button>)}
            {(this.props.solved) ? (<Button style={buttonStyle} onClick={this.markAsSolved.bind(this)}>Solved</Button>) : (<Button style={buttonStyle} onClick={this.markAsSolved.bind(this)}>Mark As Solved</Button>)}
            {(this.state.addURL) ? (<Button style={buttonStyle} onClick={this.addURLToggle.bind(this, false)}>Hide</Button>) : (<Button style={buttonStyle} onClick={this.addURLToggle.bind(this, true)}>Show</Button>)}
            {(this.state.addURL) ? (<AddURLForm form={"AddURLForm-"+this.props.id} onSubmit={this.addHelpfulURL.bind(this)}/>) : (null)}
            <URLList postID={this.props.id} list={this.props.helpfulLinks}/></div>)}
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