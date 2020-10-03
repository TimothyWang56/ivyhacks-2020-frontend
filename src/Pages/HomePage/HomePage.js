import React from "react";
import { Grid, Box, TextField, Button, Icon } from "@material-ui/core";
import "./HomePage.scss";
import Illustration from "../../Assets/homepage.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const question1 = [
  {
    value: "15",
  },
  {
    value: "30",
  },
  {
    value: "45",
  },
  {
    value: "60",
  },
];

const question2 = [
  {
    value: "15",
  },
  {
    value: "30",
  },
  {
    value: "45",
  },
  {
    value: "60",
  },
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", time: "" };
  }

  componentDidMount() {
    // make api calls? if using sockets, maybe not, have to think about this
  }

  handleTextChange(e) {
    this.setState({ username: e.target.value });
  }

  handleTimeChange = (e) => {
    this.setState({ time: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="header">Welcome to Lunchmeat! </div>
        <div className="header" style={{ fontSize: 24 }}>
          Lunchmeat is a way for you to meet other working people during your
          lunch break!
        </div>
        <Box
          style={{
            display: "flex",
            // alignItems: "center",
            // alignContent: "center",
          }}
        >
          <img
            src={Illustration}
            alt="Two people meeting up at a windowsill"
            style={{ margin: "auto", width: "25%" }}
          />
        </Box>
        <div className="header" style={{ marginTop: "25px", fontSize: 24 }}>
          Let’s get started with your username!
        </div>
        <form className="header" style={{ marginTop: "25px" }}>
          <TextField
            id="filled-basic"
            label="Username"
            variant="filled"
            onChange={(e) => this.handleTextChange(e)}
          />
        </form>
        <div className="header" style={{ fontSize: 24, marginTop: "20px" }}>
          Here are some questions to help us match you with others
        </div>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Grid xs={3} style={{ marginLeft: "12.5%" }}>
            <div>How long do you plan on eating for?</div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Duration</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={this.state.value}
                onChange={(e) => this.handleTimeChange(e)}
              >
                {question1.map((questionValue) => {
                  return (
                    <FormControlLabel
                      value={questionValue.value}
                      control={<Radio />}
                      label={questionValue.value}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <div>How long do you plan on eating for?</div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Duration</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={this.state.value}
                onChange={(e) => this.handleTimeChange(e)}
              >
                {question1.map((questionValue) => {
                  return (
                    <FormControlLabel
                      value={questionValue.value}
                      control={<Radio />}
                      label={questionValue.value}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Grid xs={3} style={{ marginLeft: "12%" }}>
            <div>How long do you plan on eating for?</div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Duration</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={this.state.value}
                onChange={(e) => this.handleTimeChange(e)}
              >
                {question1.map((questionValue) => {
                  return (
                    <FormControlLabel
                      value={questionValue.value}
                      control={<Radio />}
                      label={questionValue.value}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <div>How long do you plan on eating for?</div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Duration</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={this.state.value}
                onChange={(e) => this.handleTimeChange(e)}
              >
                {question1.map((questionValue) => {
                  return (
                    <FormControlLabel
                      value={questionValue.value}
                      control={<Radio />}
                      label={questionValue.value}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <div style={{ height: "100px", display: "flex" }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "auto" }}
            onClick={() => alert("clicked")}
          >
            Match with someone!
          </Button>
        </div>
      </div>
    );
  }
}

export default HomePage;
