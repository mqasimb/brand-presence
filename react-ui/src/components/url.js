const React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const { Button } = require('react-bootstrap');
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
        var buttonStyle = {
            backgroundColor: '#0E86CA',
            color: '#ffffff',
            fontSize: '.75em',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingRight: '10px',
            paddingLeft: '10px',
            borderRadius: '0',
            borderColor: '#10A1DE',
            marginRight: '20px',
        }
        var divStyle = {
            paddingTop: '5px',
            paddingBottom: '5px'
        }
        return (
            <div style={divStyle}>
            {(this.state.edit) ? (<EditURLForm cancelEdit={this.editOff.bind(this)} onSubmit={this.submitEdit.bind(this)} form={"EditURLForm-"+this.props.id} initialValues={{url: this.props.link}}/>) : (<div>{this.props.link}<br/><Button style={buttonStyle} onClick={this.editOn.bind(this)}>Edit URL</Button>
            <Button style={buttonStyle} onClick={this.deleteURL.bind(this)}>Delete URL</Button></div>)}
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
