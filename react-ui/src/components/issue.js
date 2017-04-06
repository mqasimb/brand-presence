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
const moment = require('moment');

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
            paddingTop: '15px',
            paddingBottom: '15px',
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: '#0D355D',
            color: '#ffffff',
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
            fontSize: '1.25em',
            color: '#009AE4'
        }
        var status = (this.props.solved) ? ("Solved") : ("Open");
        return(
            <div style={newIssueStyle}>
            <Media>
              <Media.Body>
                <Media.Heading></Media.Heading>
                <Col xs={3} xsOffset={0}>
                <Link to={'/issue/'+this.props.id} style={headingStyle}>{this.props.title}</Link>
                </Col>
                <Col xs={3} xsOffset={0}>
                {this.props.topic}
                </Col>
                <Col xs={3} xsOffset={0}>
                {status}
                </Col>
                <Col xs={3} xsOffset={0}>
                {moment(this.props.date).calendar()}
                </Col>
              </Media.Body>
            </Media>
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