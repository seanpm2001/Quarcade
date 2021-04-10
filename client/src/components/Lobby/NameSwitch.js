import React, { Component } from "react";

import clientSocket from "../../ClientSocket.js";

class NameSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // should the name be in form mode to switch it 
      switchMode: false,
      currentName: this.props.player
    };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  handleSwitchName = () => {
    //it will change the state so the form will render
    this.setState({
      switchMode: true
    });
  }

  handleChange = (event) => {
    this.setState({
      currentName: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();    
    // set switch mode to false again
    this.setState({
      switchMode: false
    });
  }

  
  render() {
    return (
      <div>
        {this.state.switchMode ? (
          <form onSubmit={this.handleSubmit}>
            <label>Edit: </label>
            <input name="newName" type="text" value={this.state.currentName} onChange={this.handleChange}/>
          </form>
        ) : 
          <h1 onClick={this.handleSwitchName} key={this.props.key}>
            {this.state.currentName} 
          </h1>
        }
      </div>
    );
  }
}

export default NameSwitch;
