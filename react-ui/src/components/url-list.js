const React = require('react');
const { connect } = require('react-redux');
const URL = require('./url');
const { ListGroup } = require('react-bootstrap');
const uuid = require('uuid');

const URLList = ({postID, list}) => {
        let urls = list.map((url) =>
            <URL key={uuid.v4()} postID={postID} id={url._id} link={url.url} />
        )
        return (
            <div>
                <ListGroup>
                    {urls}
                </ListGroup>
            </div>
        )
}

module.exports = URLList;
