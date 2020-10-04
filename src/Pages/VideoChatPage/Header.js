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
      // endpoint: 'https://butchery.herokuapp.com/'
      endpoint: "http://localhost:2000",
    };
    socket = socketIOClient(this.state.endpoint);
  }
  render() {
<<<<<<< HEAD
    return <div>header (holds socket)</div>;
=======
    return <div></div>
>>>>>>> a770f2f48b8917db7a840317cac45793db67a9db
  }
}

export { Header, socket };
