const React = require('react');
const { connect } = require('react-redux');
const URL = require('./url');
const { Link } = require('react-router');
const actions = require('../actions/index')
const { ListGroup } = require('react-bootstrap');
const uuid = require('uuid');
const moment = require('moment');

class URLList extends React.Component {
    render(props) {
        var urls = this.props.list.map((url) => {
            return <URL key={uuid.v4()} postID={this.props.postID} id={url._id} link={url.url} />;
        })
        return (
            <div>
            <ListGroup>{urls}</ListGroup>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
    })
}
var Container = connect(mapStateToProps)(URLList);

module.exports = Container;