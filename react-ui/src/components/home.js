const React = require('react');
const router = require('react-router');
const Link = router.Link;
const { connect } = require('react-redux');
const actions = require('../actions/index');
const uuid = require('uuid');
const Issue = require('./issue');

class Home extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getIssues())
    }
    
    render() {
        var issues = this.props.issueData.map((issue) => {
            return <Issue key={issue.date} id={issue._id} topic={issue.topic} title={issue.title} issue={issue.issue} date={issue.date} helpfulLinks={issue.helpfulLinks}/>
        })
        return (
            <div>
            {issues}
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return ( {
        issueData: state.app.issueData
    })
}

var Container = connect(mapStateToProps)(Home);

module.exports = Container;