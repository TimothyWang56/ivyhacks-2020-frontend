import socketIOClient from "socket.io-client";
import React, { Component } from "react";
import logo from "../../assets/logo.png";
import "./Header.scss";
// The Header creates links that can be used to navigate
// between routes.
var socket;
class Header extends Component {
  /* Creating a Socket client and exporting it at the end to be used across the Place Order, Kitchen, etc components*/
  constructor() {
    super();
    this.state = {
      endpoint: "https://butchery.herokuapp.com/",
      // endpoint: "http://localhost:2000",
    };
    socket = socketIOClient(this.state.endpoint);
  }
  render() {
    return <div>{/* <img src={logo} alt="Lunchmeat logo"></img> */}</div>;
  }
}

export { Header, socket };
