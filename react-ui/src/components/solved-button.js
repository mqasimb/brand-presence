const React = require('react');
const { connect } = require('react-redux');
const { Link } = require('react-router');
const actions = require('../actions/index');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row, Media } = require('react-bootstrap');
const { reset } = require('redux-form');
const EditIssueForm = require('./edit-issue-form');
const AddURLForm = require('./add-url-form');
const URLList = require('./url-list');
const SolutionForm = require('./solution-form');

class Issue extends React.Component {
    state = {edit: false, addURL: false, solutionEdit: false}

    editIssue = (values) => {
        this.props.dispatch(actions.editIssue(values, this.props.id))
            .then((boolean) => {
                this.setState({edit: false})
            })
    }
    deleteIssue = (values) => {
        this.props.dispatch(actions.deleteIssue(this.props.id))
    }
    markAsSolved = () => {
        this.props.dispatch(actions.markIssueSolved(this.props.solved, this.props.id))
    }
    solutionEdit = (toggle) => {
        this.setState({solutionEdit: toggle})
    }
    submitSolutionEdit = (values) => {
        this.props.dispatch(actions.editSolution(values, this.props.id))
        this.setState({solutionEdit: false})
    }
    deleteSolution = () => {
        this.props.dispatch(actions.deleteSolution(this.props.id))
    }
    submitSolution = (values) => {
        this.props.dispatch(actions.addSolution(values, this.props.id))
    }
    addURLToggle = (toggle) => {
        this.setState({addURL: toggle})
    }
    addHelpfulURL = (values) => {
        this.props.dispatch(actions.addNewURL(values, this.props.id))
        this.props.dispatch(reset("AddURLForm-"+this.props.id))
    }
    enableEdit = () => {
        this.setState({edit: true});
    }
    cancelEdit = () => {
        this.setState({edit: false});
    }
    render() {
        var newIssueStyle={
            paddingTop: '15px',
            paddingBottom: '15px',
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: '#FBFBF5',
            color: '#000000',
            maxWidth: '1000px',
            margin: '20px auto',
            padding: '20px'
        }
        var buttonStyle = {
            backgroundColor: '#F4C23A',
            color: '#ffffff',
            fontSize: '1.25em',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingRight: '10px',
            paddingLeft: '10px',
            borderRadius: '0',
            borderColor: '#F4C23A'
        }
        var headingStyle = {
            fontFamily: 'TitilliumSemiBold',
            fontSize: '1.5em',
            color: '#7FC8D0'
        }
        return (
            <div style={newIssueStyle}>
                {(this.state.edit) ? (<EditIssueForm form={"EditIssueForm-"+this.props.id} onSubmit={this.editIssue} cancelEdit={this.cancelEdit} initialValues={{topic: this.props.topic, title: this.props.title, issue: this.props.issue}}/>) : (<div><Button style={buttonStyle} onClick={this.enableEdit}>Edit</Button><Button style={buttonStyle} onClick={this.deleteIssue}>Delete</Button>
                <Media>
                    <Media.Body>
                        <Media.Heading style={headingStyle}>{this.props.title}{this.props.date}</Media.Heading>
                        <p>{this.props.issue}</p>
                        <Media.Left>
                            {this.props.topic}
                        </Media.Left>
                    </Media.Body>
                </Media>
                <div className="issue-solution">{(!this.props.solution || (this.props.solution === '')) ? (<SolutionForm form={"SolutionForm-"+this.props.id} onSubmit={this.submitSolution} cancelEdit={this.solutionEdit.bind(this, false)} isEdit={false} />) : (this.props.solution)}</div>
                {(this.props.solution && this.state.solutionEdit) ? (<SolutionForm form={"SolutionEditForm-"+this.props.id} initialValues={{solution: this.props.solution}} onSubmit={this.submitSolutionEdit} cancelEdit={this.solutionEdit.bind(this, false)} isEdit={true} />) : (<Button onClick={this.solutionEdit.bind(this, true)}>Edit Your Solution</Button>)}
                {(this.props.solved) ? (<Button style={buttonStyle} onClick={this.markAsSolved}>Solved</Button>) : (<Button style={buttonStyle} onClick={this.markAsSolved}>Mark Issue As Solved</Button>)}
                {(this.state.addURL) ? (<Button style={buttonStyle} onClick={this.addURLToggle.bind(this, false)}>Hide</Button>) : (<Button style={buttonStyle} onClick={this.addURLToggle.bind(this, true)}>Show</Button>)}
                {(this.state.addURL) ? (<AddURLForm form={"AddURLForm-"+this.props.id} onSubmit={this.addHelpfulURL}/>) : (null)}
                <URLList postID={this.props.id} list={this.props.helpfulLinks}/></div>)}
            </div>
        )
    }
}

const Container = connect((state, props)=>{return {}})(Issue);

module.exports = Container;