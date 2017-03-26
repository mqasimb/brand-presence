const React = require('react');
const router = require('react-router');
const Link = router.Link;
const { connect } = require('react-redux');
const actions = require('../actions/index');
const uuid = require('uuid');
const NewQuestion = require('./new-question')

class Home extends React.Component {
    componentDidMount() {
    }
    
    render() {
        return (
            <div>
            <NewQuestion/>
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return ( {
    })
}

var Container = connect(mapStateToProps)(Home);

module.exports = Container;