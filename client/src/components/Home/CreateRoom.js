import React, { Component, useEffect, useRef } from "react";
import Axios from "axios";
import clientSocket from "../../ClientSocket.js";

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createRoom: false,
      code: ""
    };
  }

  // determines whether or not "create room" is shown
  handleClick = event => {
    this.setState({ createRoom: !this.state.createRoom });
    event.preventDefault();
  };

  // handles changes to text field for room code
  handleChange = event => {
    this.setState({
      code: event.target.value
    });
  };

  // submits room code to database
  handleSubmit = event => {
    event.preventDefault();

    alert("You submitted Room Code to Create: " + this.state.code);

    // need to connect with backend database and implement verification
    let tempName = "temporary name that will be updated in lobby";

    //first check if the it exists
    if (!this.checkExistence(this.state.code)) {
      this.pushCodeToBackend(this.state.code, tempName);
    } else {
      alert("This room already exists, pick another name");
    }

    //clears the fields, this is just to make it look better
    this.setState({ code: "" });
  };

  //get request to see if it exists (true if it exists)
  async checkExistence(roomCode) {
    try {
      await Axios.get(`http://localhost:5000/homeLobby/${roomCode}`).then(
        res => {
          const matches = res.data;
          if (matches.length > 0) {
            //this means if it exists, return true
            return true;
          } else {
            return false;
          }
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log("There was an error with get Room");
    }
  }

  // uses axios to post client socket id and creates room
  async pushCodeToBackend(roomCode, tempName) {
    try {
      await Axios.post("http://localhost:5000/homeLobby", { roomCode: roomCode, users: { name: tempName, socket: clientSocket.id } });
      console.log("Room was succesfully created");
    } catch (error) {
      console.log("There was an error with post");
    }
  }

  render() {
    return (
      <div>
        <h2 onClick={this.handleClick}>or, create a room</h2>
        {this.state.createRoom ? (
          <form onSubmit={this.handleSubmit}>
            <label>
              Room Code:
              <input name="code" type="text" value={this.state.code} onChange={this.handleChange} />
            </label>
          </form>
        ) : null}
      </div>
    );
  }
}

export default CreateRoom;
