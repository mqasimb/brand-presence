const React = require('react');
const { connect } = require('react-redux');
const router = require('react-router');
const actions = require('../actions/index');
const { Button, Col, Media } = require('react-bootstrap');
const { reset } = require('redux-form');
const EditIssueForm = require('./edit-issue-form');
const AddURLForm = require('./add-url-form');
const URLList = require('./url-list');
const SolutionForm = require('./solution-form');
const moment = require('moment');

class Issue extends React.Component {
    componentDidMount() {
        if(this.props.auth.authenticated === false) {
            router.hashHistory.push('/login');
        }
        if(this.props.issueData.length === 0) {
            this.props.dispatch(actions.getIssues())
        }
    }
    constructor(props) {
        super(props);
        this.state = {edit: false, addURL: false, solutionEdit: false}
    }
    mouseOver(event) {
        event.target.style.backgroundColor = '#00AEFF'
    }
    mouseLeave(event) {
        event.target.style.backgroundColor = '#0E86CA'
    }
    editIssue(values) {
        this.props.dispatch(actions.editIssue(values, this.props.params.id))
            .then((boolean) => {
                this.setState({edit: false})
            })
    }
    deleteIssue(values) {
        this.props.dispatch(actions.deleteIssue(this.props.params.id))
        .then(function(response) {
            router.hashHistory.push('/');
        })
    }
    markAsSolved(toggle) {
        this.props.dispatch(actions.markIssueSolved(toggle, this.props.params.id))
    }
    solutionEdit(toggle) {
        this.setState({solutionEdit: toggle})
    }
    submitSolutionEdit(values) {
        this.props.dispatch(actions.editSolution(values, this.props.params.id))
        this.setState({solutionEdit: false})
    }
    deleteSolution() {
        this.props.dispatch(actions.deleteSolution(this.props.params.id))
    }
    submitSolution(values) {
        this.props.dispatch(actions.addSolution(values, this.props.params.id))
        .then(response => {
            this.props.dispatch(actions.markIssueSolved(true, this.props.params.id))
        })
    }
    addURLToggle(toggle) {
        this.setState({addURL: toggle})
    }
    addHelpfulURL(values) {
        this.props.dispatch(actions.addNewURL(values, this.props.params.id))
        this.props.dispatch(reset("AddURLForm-"+this.props.params.id))
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
            backgroundColor: '#0E86CA',
            color: '#ffffff',
            fontSize: '1em',
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingRight: '5px',
            paddingLeft: '5px',
            borderRadius: '0',
            borderColor: '#10A1DE',
            marginRight: '20px',
            marginTop: '20px',
            marginBottom: '10px'
        }
        var headingStyle = {
            fontFamily: 'TitilliumSemiBold',
            fontSize: '1.6em',
            color: '#ffffff',
        }
        var titleStyle = {
            fontFamily: 'TitilliumBold',
            fontSize: '1.75em',
            color: '#ffffff'
        }
        var colStyle = {
            paddingLeft: '0px',
            marginTop: '10px',
            marginBottom: '10px'
        }
        var divStyle = {
            marginTop: '20px',
        }
        var status = null;
        var currentIssue = null;
        var firstIndex = this.props.issueData.findIndex((issue) =>
            issue._id == this.props.params.id
        )
        if(firstIndex > -1) {
            currentIssue = this.props.issueData[firstIndex];
            status = (currentIssue.solved) ? ("Solved") : ("Open");
        }
        return (
            <div style={newIssueStyle}>
                {(currentIssue) ? (<div>
                    <Media>
                        <Media.Body>
                            <Media.Heading>
                                <span style={titleStyle}>{currentIssue.title}</span>
                            </Media.Heading>
                            <Col style={colStyle} xs={4} xsOffset={0}>
                                <span style={headingStyle}>Status: {status}</span>
                            </Col>
                            <Col style={colStyle} xs={4} xsOffset={0}>
                                <span style={headingStyle}>Topic: {currentIssue.topic}</span>
                            </Col>
                            <Col style={colStyle} xs={4} xsOffset={0}>
                                <span style={headingStyle}>Posted: {moment(currentIssue.date).calendar()}</span>
                            </Col>
                        </Media.Body>
                        <div style={divStyle}><span style={headingStyle}>Issue: </span>{currentIssue.issue}</div>
                        {(this.state.edit) ? (<EditIssueForm form={"EditIssueForm-"+currentIssue.id} onSubmit={this.editIssue.bind(this)} cancelEdit={this.cancelEdit.bind(this)} initialValues={{topic: currentIssue.topic, title: currentIssue.title, issue: currentIssue.issue}}/>) : (<div><Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} onClick={this.enableEdit.bind(this)}>Edit Issue</Button><Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} onClick={this.deleteIssue.bind(this)}>Delete Issue</Button></div>)}
                    </Media>
                    {(this.state.solutionEdit) ? (<SolutionForm cancelEdit={this.solutionEdit.bind(this, false)} onSubmit={this.submitSolutionEdit.bind(this)} initialValues={{solution: currentIssue.solution}} form={"SolutionEditForm-"+currentIssue._id} isEdit={true} />) : ((currentIssue.solution) ? (<div style={divStyle}><span style={headingStyle}>Solution: </span>{currentIssue.solution}<br/><Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} onClick={this.solutionEdit.bind(this, true)}>Edit Solution</Button></div>) : (<SolutionForm form={"SolutionForm-"+currentIssue.id} onSubmit={this.submitSolution.bind(this)} cancelEdit={this.solutionEdit.bind(this, false)} isEdit={false} />))}
                    <div style={divStyle}><span style={headingStyle}>URLs: </span></div>
                    <URLList postID={this.props.params.id} list={currentIssue.helpfulLinks}/>
                    {(this.state.addURL) ? (<Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} onClick={this.addURLToggle.bind(this, false)}>Cancel</Button>) : (<Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={buttonStyle} onClick={this.addURLToggle.bind(this, true)}>Add URL</Button>)}
                    {(this.state.addURL) ? (<AddURLForm form={"AddURLForm-"+this.props.params.id} onSubmit={this.addHelpfulURL.bind(this)}/>) : (null)}
                </div>) : (null)}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return( {
        auth: state.app.auth,
        issueData: state.app.issueData,
        singleIssue: state.app.singleIssue
    } )
}

var Container = connect(mapStateToProps)(Issue);

module.exports = Container;