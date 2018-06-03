const React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const { Button } = require('react-bootstrap');
const EditURLForm = require('./edit-url-form');

class URL extends React.Component {
    state = {edit: false};
    
    submitEdit = (values) => {
    	this.props.dispatch(actions.editURL(values, this.props.postID, this.props.id))
    }
    editOn = () => {
    	this.setState(currentState => ({edit: true}))
    }
    editOff = () => {
    	this.setState(currentState => ({edit: false}))
    }
    deleteURL = () => {
    	this.props.dispatch(actions.deleteURL(this.props.postID, this.props.id))
   	}
    render(props) {
        return (
            <div style={style.divStyle}>
                {(this.state.edit) ? (<EditURLForm cancelEdit={this.editOff} onSubmit={this.submitEdit} form={"EditURLForm-"+this.props.id} initialValues={{url: this.props.link}}/>) : (<div>{this.props.link}<br/><Button style={style.buttonStyle} onClick={this.editOn}>Edit URL</Button>
                <Button style={style.buttonStyle} onClick={this.deleteURL}>Delete URL</Button></div>)}
            </div>
        )
    }
}

const style = {
    buttonStyle: {
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
    },
    divStyle: {
        paddingTop: '5px',
        paddingBottom: '5px'
    }
}

const Container = connect((state, props) => {return {}})(URL);

module.exports = Container;
