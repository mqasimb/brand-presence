const React = require('react');
const router = require('react-router');
const Link = router.Link;
const { connect } = require('react-redux');
const actions = require('../actions/index');
const uuid = require('uuid');
const Issue = require('./issue');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row, Media } = require('react-bootstrap');

class Home extends React.Component {
    componentDidMount() {
        if(this.props.auth.authenticated === false) {
            router.hashHistory.push('/login');
        }
        this.props.dispatch(actions.getIssues())
    }
    
    render() {
        var issues = this.props.issueData.map((issue) => {
            return <Issue key={issue.date} id={issue._id} solution={issue.solution} solved={issue.solved} topic={issue.topic} title={issue.title} issue={issue.issue} date={issue.date} helpfulLinks={issue.helpfulLinks}/>
        })
        var newIssueStyle={
            paddingTop: '15px',
            paddingBottom: '15px',
            marginTop: '10px',
            marginBottom: '10px',
            fontFamily: 'TitilliumBold',
            fontSize: '1.25em',
            color: '#ffffff',
            maxWidth: '1000px',
            margin: '20px auto',
            padding: '20px'
        }
        return (
            <div>
            <div style={newIssueStyle}>
            <Media>
              <Media.Body>
              <Media.Heading></Media.Heading>
                <Col xs={3} xsOffset={0}>
                Issue 
                </Col>
                <Col xs={3} xsOffset={0}>
                Topic
                </Col>
                <Col xs={3} xsOffset={0}>
                Status
                </Col>
                <Col xs={3} xsOffset={0}>
                Posted Date
                </Col>
              </Media.Body>
            </Media>
            </div>
            {issues}
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return ( {
        auth: state.app.auth,
        issueData: state.app.issueData
    })
}

var Container = connect(mapStateToProps)(Home);

module.exports = Container;