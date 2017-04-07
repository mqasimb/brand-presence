const React = require('react');
const router = require('react-router');
const Link = router.Link;
const { connect } = require('react-redux');
const actions = require('../actions/index');
const uuid = require('uuid');
const Issue = require('./issue');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row, Media, Jumbotron } = require('react-bootstrap');

import HTMLSVG from '../svg/html.svg';
import CODINGSVG from '../svg/programming.svg';
import BookmarkSVG from '../svg/bookmark.svg';
import ListingSVG from '../svg/listing.svg';
import ThumbsUpSVG from '../svg/thumbs-up.svg';

class Home extends React.Component {
    componentDidMount() {
        if(this.props.auth.authenticated === true) {
            this.props.dispatch(actions.getIssues())
        }
    }

    submitLoginDemoAccount() {
          this.props.dispatch(actions.loginAction({username:'DemoAccount', password:'123456789'}))
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, this.props)
        if(this.props.auth.authenticated !== nextProps.auth.authenticated) {
            this.props.dispatch(actions.getIssues())
        }
    }
    mouseOver(event) {
        event.target.style.backgroundColor = '#00AEFF'
    }
    mouseLeave(event) {
        event.target.style.backgroundColor = '#0E86CA'
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
            backgroundColor: '#0D355D',
            color: '#ffffff',
            maxWidth: '1000px',
            margin: '20px auto',
            padding: '20px',
        }
        var issueLabelsStyle = {
            paddingTop: '15px',
            paddingBottom: '15px',
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: '#0D355D',
            color: '#ffffff',
            maxWidth: '1000px',
            margin: '20px auto',
            padding: '20px',
            fontFamily: 'TitilliumSemiBold',
            fontSize: '1.25em'
        }
        var svgStyle = {
            height: '100px',
            marginTop: '20px',
            marginBottom: '20px'
        }
        var textStyle = {
            color: '#ffffff',
            fontSize: '1.25em',
            fontFamily: 'TitilliumBold'
        }
        var mainTextStyle = {
            color: '#009AE4',
            fontSize: '3em',
            fontFamily: 'TitilliumBold'
        }
        var jumbotronStyle = {
            backgroundColor: '#0D355D',
            color: '#ffffff',
            margin: '20px auto',
            padding: '20px',
            textAlign: 'center'
        }
        var demoButtonStyle = {
            backgroundColor: '#0E86CA',
            color: '#ffffff',
            fontFamily: 'TitilliumSemiBold',
            fontSize: '1em',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingRight: '10px',
            paddingLeft: '10px',
            borderRadius: '0',
            borderColor: '#10A1DE',
            marginTop: '10px',
            whiteSpace: 'normal'
        }
        var demoButtonTextStyle = {
            textAlign: 'center',
            color: '#ffffff'
        }
        var listStyle = {
            textAlign: 'center',
            marginTop: '50px'
        }
        return (
            <div>
            {(this.props.auth.authenticated) ? (<div>
            <div style={issueLabelsStyle}>
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
            </div>) : (
            <div style={newIssueStyle}>
            <Jumbotron style={jumbotronStyle}>
            <span style={mainTextStyle}>{'<Code Solutions />'}</span><br/>
            <span style={textStyle}>Save All Issues You Face While Coding</span><br/>
            <FormGroup>
              <Col style={demoButtonTextStyle} xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick={this.submitLoginDemoAccount.bind(this)} style={demoButtonStyle}>Demo Account / Login</Button>
              </Col>
            </FormGroup>
            </Jumbotron>
            <div style={listStyle}>
            <span style={textStyle}>Add Solutions To All Your Coding Issues</span><br/><img src={CODINGSVG} style={svgStyle}/><br/>
            <span style={textStyle}>Save URL's For All Your Solutions</span><br/><img src={ListingSVG} style={svgStyle}/><br/>
            <span style={textStyle}>Stop Filling Up Your Bookmarks!</span><br/><img src={BookmarkSVG} style={svgStyle}/><br/>
            <span style={textStyle}>Sign Up Today And Start Solving!</span><br/><img src={ThumbsUpSVG} style={svgStyle}/><br/>
            </div>
            </div>)}
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