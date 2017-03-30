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
            paddingTop: '30px'
        }
        return(
            <div style={newIssueStyle}>
            {(this.state.edit) ? (<EditIssueForm form={"EditIssueForm-"+this.props.id} onSubmit={this.editIssue.bind(this)} cancelEdit={this.cancelEdit.bind(this)} initialValues={{topic: this.props.topic, title: this.props.title, issue: this.props.issue}}/>) : (<div><button onClick={this.enableEdit.bind(this)}>Edit</button><button onClick={this.deleteIssue.bind(this)}>Delete</button>{this.props.topic}
            {this.props.title}
            {this.props.issue}
            {this.props.date}
            {(!this.props.solution || (this.props.solution === '')) ? (<SolutionForm form={"SolutionForm-"+this.props.id} onSubmit={this.submitSolution.bind(this)} cancelEdit={this.solutionEdit.bind(this, false)} isEdit={false} />) : (this.props.solution)}
            {(this.props.solution && this.state.solutionEdit) ? (<SolutionForm form={"SolutionEditForm-"+this.props.id} initialValues={{solution: this.props.solution}} onSubmit={this.submitSolutionEdit.bind(this)} cancelEdit={this.solutionEdit.bind(this, false)} isEdit={true} />) : (<button onClick={this.solutionEdit.bind(this, true)}>Edit Solution</button>)}
            {(this.props.solved) ? (<button onClick={this.markAsSolved.bind(this)}>Solved</button>) : (<button onClick={this.markAsSolved.bind(this)}>Mark As Solved</button>)}
            {(this.state.addURL) ? (<button onClick={this.addURLToggle.bind(this, false)}>Hide</button>) : (<button onClick={this.addURLToggle.bind(this, true)}>Show</button>)}
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