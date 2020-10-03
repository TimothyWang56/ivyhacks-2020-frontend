import socketIOClient from "socket.io-client";
import React, { Component } from "react";
// The Header creates links that can be used to navigate
// between routes.
var socket;
class Header extends Component {
/* Creating a Socket client and exporting it at the end to be used across the Place Order, Kitchen, etc components*/
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:2000/'
    };
socket = socketIOClient(this.state.endpoint);
  }
  render() {
    return <div>header (holds socket)</div>
  }
}

export { Header, socket };