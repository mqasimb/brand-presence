const React = require('react');
const moment = require('moment');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const router = require('react-router');
const { ListGroupItem, Panel, Modal, Button, Media } = require('react-bootstrap');
const EditURLForm = require('./edit-url-form');

class URL extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {edit: false};
    }
    submitEdit(values) {
    	this.props.dispatch(actions.editURL(values, this.props.postID, this.props.id))
    }
    editOn() {
    	this.setState({edit: true})
    }
    editOff() {
    	this.setState({edit: false})
    }
    deleteURL() {
    	this.props.dispatch(actions.deleteURL(this.props.postID, this.props.id))
   	}
    render(props) {
        return (
            <div>
            {(this.state.edit) ? (<EditURLForm cancelEdit={this.editOff.bind(this)} onSubmit={this.submitEdit.bind(this)} form={"EditURLForm-"+this.props.id} initialValues={{url: this.props.link}}/>) : (<div>{this.props.link}<button onClick={this.editOn.bind(this)}>Edit URL</button>
            <button onClick={this.deleteURL.bind(this)}>Delete URL</button></div>)}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
  return({
  })
}

var Container = connect(mapStateToProps)(URL);

module.exports = Container;
