const React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const Issue = require('./issue');
const { FormGroup, Button, Col, Media, Jumbotron } = require('react-bootstrap');

import CodingSVG from '../svg/programming.svg';
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
        var issues = this.props.issueData.map((issue) =>
            <Issue key={issue.date} id={issue._id} solution={issue.solution} solved={issue.solved} topic={issue.topic} title={issue.title} issue={issue.issue} date={issue.date} helpfulLinks={issue.helpfulLinks}/>
        )
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
            fontSize: '1.1em',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingRight: '15px',
            paddingLeft: '15px',
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
        }
        return (
            <div>
                {(this.props.auth.authenticated) ? (<div>
                <div style={issueLabelsStyle}>  
                    Show: All Open Solved
                </div> 
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
                {issues.reverse()}
                </div>) : (
                <div style={newIssueStyle}>
                <Jumbotron style={jumbotronStyle}>
                <span style={mainTextStyle}>{'<Code Solutions />'}</span><br/>
                <span style={textStyle}>Save All Issues You Face While Coding</span><br/>
                </Jumbotron>
                <div style={listStyle}>
                <span style={textStyle}>Add Solutions To All Your Coding Issues</span><br/><img role="presentation" src={CodingSVG} style={svgStyle}/><br/>
                <span style={textStyle}>Save URL's For All Your Solutions</span><br/><img role="presentation" src={ListingSVG} style={svgStyle}/><br/>
                <span style={textStyle}>Stop Filling Up Your Bookmarks!</span><br/><img role="presentation" src={BookmarkSVG} style={svgStyle}/><br/>
                <span style={textStyle}>Sign Up Today And Start Solving!</span><br/><img role="presentation" src={ThumbsUpSVG} style={svgStyle}/><br/>
                </div>
                <Jumbotron style={jumbotronStyle}>
                <FormGroup>
                  <Col style={demoButtonTextStyle} xs={6} xsOffset={3} sm={6} smOffset={3}>
                    <Button onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick={this.submitLoginDemoAccount.bind(this)} style={demoButtonStyle}>Demo Account / Login</Button>
                  </Col>
                </FormGroup>
                </Jumbotron>
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