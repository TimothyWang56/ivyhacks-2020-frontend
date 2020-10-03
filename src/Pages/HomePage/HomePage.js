import React from "react";
import { TextField } from "@material-ui/core";
import "./HomePage.scss";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // make api calls? if using sockets, maybe not, have to think about this
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            fontSize: 64,
          }}
        >
          Welcome to Lunchmeat!{" "}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            fontSize: 24,
          }}
        >
          Lunchmeat is a way for you to meet other working people during your
          lunch break!
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            fontSize: 24,
            marginTop: "50px",
          }}
        >
          Let’s get started with your username!
        </div>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            fontSize: 24,
            // marginTop: "50px",
          }}
        >
          <TextField id="filled-basic" label="Username" variant="filled" />
        </form>
      </div>
    );
  }
}

export default HomePage;
