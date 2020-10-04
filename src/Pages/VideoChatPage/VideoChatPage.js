import React from "react";
import DailyIFrame from "@daily-co/daily-js";
import TopicList from "../../Components/TopicList/TopicList";
import { socket } from "./Header";
import banana from "./banana.gif";
import { Grid, Box, TextField, Button } from "@material-ui/core";
import Illustration from "../../assets/homepage.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "./VideoChatPage.scss";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

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
    value: "Ham",
  },
  {
    value: "Turkey",
  },
  {
    value: "Roast Beef",
  },
  {
    value: "Vegeterian",
  },
];

const question3 = [
  {
    value: "John",
  },
  {
    value: "Paul",
  },
  {
    value: "Ringo",
  },
  {
    value: "George",
  },
];

const question4 = [
  {
    value: "Fresh out of my kitchen",
  },
  {
    value: "Takeout",
  },
  {
    value: "Food Delivery",
  },
  {
    value: "Leftovers",
  },
];

const question5 = [
  {
    value: "Waffles",
  },
  {
    value: "Pancakes",
  },
  {
    value: "Crepes",
  },
  {
    value: "French Toast",
  },
];

const question6 = [
  {
    value: "Student",
  },
  {
    value: "Professional",
  },
  {
    value: "Other",
  },
];

const question7 = [
  {
    value: "Student",
  },
  {
    value: "Professional",
  },
  {
    value: "Other",
  },
  {
    value: "Anyone",
  },
];

class VideoChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.iframeRef = React.createRef();
    this.state = {
      time: 0,
      status: "form",
      url: "",
      username: "",
      duration: "",
      meat: "",
      beatle: "",
      food: "",
      otherUser: "",
      breakfast: "",
      iAmA: "",
      preference: "",
      userRes: {},
      otherUserRes: {},
      overlappingResponses: {},
    };
  }

  validateForm = () => {
    const { username, duration, meat, beatle, food } = this.state;
    return (
      !username.length ||
      !duration.length ||
      !meat.length ||
      !beatle.length ||
      !food.length
    );
  };
  formComplete = () => {
    if (this.validateForm()) {
      alert("Please fill out form");
      return;
    }
    this.setState({ status: "matching" });
    const picked = (({
      username,
      duration,
      meat,
      beatle,
      food,
      breakfast,
      iAmA,
      preference,
    }) => ({
      username,
      duration,
      meat,
      beatle,
      food,
      breakfast,
      iAmA,
      preference,
    }))(this.state);
    socket.emit("surveyComplete", picked);
    console.log("sent survey");
  };
  setUrl = (data) => {
    this.setState({
      url: data.url,
      status: "video",
      otherUser: data.name,
      userRes: data.userResponse,
      otherUserRes: data.otherUserResponse,
    });
    this.overlappingResponses();
    this.updateIframe();
  };

  async updateIframe() {
    if (this.state.time !== 0) return;
    this.setState({ time: parseInt(this.state.duration) * 60 });
    this.callFrame = DailyIFrame.wrap(this.iframeRef.current);
    this.callFrame.join({ url: this.state.url });
    this.interval = setInterval(
      () => this.setState({ time: this.state.time - 1 }),
      1000
    );
  }

  onLeave() {
    clearInterval(this.interval);
    this.setState({
      time: 0,
      status: "form",
      url: "",
      otherUser: "",
    });
    socket.emit("leaveCall");
  }

  handleUserLeft(data) {
    console.log(data);
    alert(data.name + " has left!");
  }

  overlappingResponses() {
    let results = {};
    for (const [key, value] of Object.entries(this.state.userRes)) {
      console.log(key);
      if (this.state.otherUserRes[key] === value && key !== "duration") {
        results[key] = value;
      }
    }
    this.setState({ overlappingResponses: results });
  }

  async componentDidMount() {
    socket.on("matched", this.setUrl);
    socket.on("userLeft", this.handleUserLeft);
  }

  async componentWillUnmount() {
    socket.off("matched");
    socket.off("userLeft");
  }

  formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    return [hours, minutes, seconds]
      .map((v) => ("" + v).padStart(2, "0"))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  }

  handleTextChange(e) {
    this.setState({ username: e.target.value });
  }

  handleDurationChange = (e) => {
    this.setState({ duration: e.target.value });
  };

  handleMeatChange = (e) => {
    this.setState({ meat: e.target.value });
  };

  handleBeatleChange = (e) => {
    this.setState({ beatle: e.target.value });
  };

  handleFoodChange = (e) => {
    this.setState({ food: e.target.value });
  };

  handleBreakfastChange = (e) => {
    this.setState({ breakfast: e.target.value });
  };

  handleIAmAChange = (e) => {
    this.setState({ iAmA: e.target.value });
  };

  handlePreferenceChange = (e) => {
    this.setState({ preference: e.target.value });
  };

  inputName = () => {
    const { username } = this.state;
    if (!username.length) alert("Please enter a name");
    else {
      this.setState({ status: "question1" });
    }
  };

  render() {
    const { status } = this.state;
    const renderStatus = () => {
      if (status === "form") {
        return (
          <div
            className="super-center center-text"
            style={{ maxWidth: "100%" }}
          >
            <h1 className="header">Welcome to Lunchmeat! </h1>
            <div
              className="header center-text"
              style={{ fontSize: 24, maxWidth: "100%" }}
            >
              Lunchmeat is a way for you to meet other working people during
              your lunch break!
            </div>
            <Box
              style={{
                display: "flex",
              }}
            >
              <img
                src={Illustration}
                alt="Two people meeting up at a windowsill"
                style={{ margin: "auto", maxWidth: "100%", width: "300px" }}
              />
            </Box>
            <div className="header" style={{ marginTop: "25px", fontSize: 24 }}>
              Let’s get started with your name!
            </div>
            <form className="field" style={{ marginTop: "25px" }}>
              <TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                defaultValue={this.state.username}
                onChange={(e) => this.handleTextChange(e)}
              />
            </form>
            <div style={{ height: "100px", display: "flex" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: "auto" }}
                onClick={() => this.inputName()}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      } else if (status === "question1") {
        return (
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={10}>
              <div>How long do you plan on eating for (minutes)?</div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.value}
                  onChange={(e) => this.handleDurationChange(e)}
                >
                  {question1.map((questionValue, index) => {
                    return (
                      <FormControlLabel
                        checked={this.state.duration === questionValue.value}
                        value={questionValue.value}
                        control={<Radio />}
                        label={questionValue.value}
                        key={`question1-${index}`}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Grid>
            <div className="forward-backward-buttons">
              <div className="left-arrow">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "auto" }}
                  onClick={() => this.setState({ status: "form" })}
                >
                  <ArrowLeft />
                </Button>
              </div>
              <div className="right-arrow">
                <Button
                  variant="contained"
                  color={this.state.duration ? "secondary" : "#656565"}
                  style={{ margin: "auto" }}
                  onClick={() => this.state.duration ? this.setState({ status: "question2" }) : null}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </Grid>
        );
      } else if (status === "question2") {
        return (
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={10}>
              <div>Pick your preferred lunch meat</div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.value}
                  onChange={(e) => this.handleMeatChange(e)}
                >
                  {question2.map((questionValue, index) => {
                    return (
                      <FormControlLabel
                        checked={this.state.meat === questionValue.value}
                        value={questionValue.value}
                        control={<Radio />}
                        label={questionValue.value}
                        key={`question2-${index}`}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Grid>
            <div className="forward-backward-buttons">
              <div className="left-arrow">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "auto" }}
                  onClick={() => this.setState({ status: "question1" })}
                >
                  <ArrowLeft />
                </Button>
              </div>
              <div className="right-arrow">
                <Button
                  variant="contained"
                  color={this.state.meat ? "secondary" : "#656565"}
                  style={{ margin: "auto" }}
                  onClick={() => this.state.meat ? this.setState({ status: "question3" }) : null}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </Grid>
        );
      } else if (status === "question3") {
        return (
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={10}>
              <div>Who's your favorite Beatle?</div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.value}
                  onChange={(e) => this.handleBeatleChange(e)}
                >
                  {question3.map((questionValue, index) => {
                    return (
                      <FormControlLabel
                        checked={this.state.beatle === questionValue.value}
                        value={questionValue.value}
                        control={<Radio />}
                        label={questionValue.value}
                        key={`question3-${index}`}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Grid>
            <div className="forward-backward-buttons">
              <div className="left-arrow">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "auto" }}
                  onClick={() => this.setState({ status: "question2" })}
                >
                  <ArrowLeft />
                </Button>
              </div>
              <div className="right-arrow">
                <Button
                  variant="contained"
                  color={this.state.beatle ? "secondary" : "#656565"}
                  style={{ margin: "auto" }}
                  onClick={() => this.state.beatle ? this.setState({ status: "question4" }) : null}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </Grid>
        );
      } else if (status === "question4") {
        return (
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={10}>
              <div>I'm eating...</div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.value}
                  onChange={(e) => this.handleFoodChange(e)}
                >
                  {question4.map((questionValue, index) => {
                    return (
                      <FormControlLabel
                        checked={this.state.food === questionValue.value}
                        value={questionValue.value}
                        control={<Radio />}
                        label={questionValue.value}
                        key={`question4-${index}`}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Grid>
            <div className="forward-backward-buttons">
              <div className="left-arrow">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "auto" }}
                  onClick={() => this.setState({ status: "question3" })}
                >
                  <ArrowLeft />
                </Button>
              </div>
              <div className="right-arrow">
                <Button
                  variant="contained"
                  color={this.state.food ? "secondary" : "#656565"}
                  style={{ margin: "auto" }}
                  onClick={() => this.state.food ? this.setState({ status: "question5" }) : null}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </Grid>
        );
      } else if (status === "question5") {
        return (
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={10}>
              <div>I like my brunch with...</div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.value}
                  onChange={(e) => this.handleBreakfastChange(e)}
                >
                  {question5.map((questionValue, index) => {
                    return (
                      <FormControlLabel
                        checked={this.state.breakfast === questionValue.value}
                        value={questionValue.value}
                        control={<Radio />}
                        label={questionValue.value}
                        key={`question5-${index}`}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Grid>
            <div className="forward-backward-buttons">
              <div className="left-arrow">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "auto" }}
                  onClick={() => this.setState({ status: "question4" })}
                >
                  <ArrowLeft />
                </Button>
              </div>
              <div className="right-arrow">
                <Button
                  variant="contained"
                  color={this.state.breakfast ? "secondary" : "#656565"}
                  style={{ margin: "auto" }}
                  onClick={() => this.state.breakfast ? this.setState({ status: "question6" }) : null}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </Grid>
        );
      } else if (status === "question6") {
        return (
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={10}>
              <div>I am a...</div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.value}
                  onChange={(e) => this.handleIAmAChange(e)}
                >
                  {question6.map((questionValue, index) => {
                    return (
                      <FormControlLabel
                        checked={this.state.iAmA === questionValue.value}
                        value={questionValue.value}
                        control={<Radio />}
                        label={questionValue.value}
                        key={`question6-${index}`}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Grid>
            <div className="forward-backward-buttons">
              <div className="left-arrow">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "auto" }}
                  onClick={() => this.setState({ status: "question5" })}
                >
                  <ArrowLeft />
                </Button>
              </div>
              <div className="right-arrow">
                <Button
                  variant="contained"
                  color={this.state.iAmA ? "secondary" : "#656565"}
                  style={{ margin: "auto" }}
                  onClick={() => this.state.iAmA ? this.setState({ status: "question7" }) : null}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </Grid>
        );
      } else if (status === "question7") {
        return (
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={10}>
              <div>Match me with a...</div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.value}
                  onChange={(e) => this.handlePreferenceChange(e)}
                >
                  {question7.map((questionValue, index) => {
                    return (
                      <FormControlLabel
                        checked={this.state.preference === questionValue.value}
                        value={questionValue.value}
                        control={<Radio />}
                        label={questionValue.value}
                        key={`question6-${index}`}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Grid>
            <div className="forward-backward-buttons">
              <div className="left-arrow">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "auto" }}
                  onClick={() => this.setState({ status: "question6" })}
                >
                  <ArrowLeft />
                </Button>
              </div>
              <div className="right-arrow">
                <Button
                  variant="contained"
                  color={this.state.preference ? "secondary" : "#656565"}
                  style={{ margin: "auto" }}
                  onClick={() => this.state.preference ? this.setState({ status: "getMatched" }) : null}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </Grid>
        );
      } else if (status === "getMatched") {
        return (
          <div className="super-center">
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "auto" }}
              onClick={() => this.formComplete()}
            >
              Match Me!
            </Button>
          </div>
        );
      } else if (status === "matching") {
        return (
          <div className="super-center">
            <div className="center-text">
              <img src={banana} alt="banana spin"></img>
              <div>Finding you a match</div>
            </div>
          </div>
        );
      } else {
        return (
          <>
            <div className="video-page-container">
              <div className="left-panel">
                <div className="enjoy-text">
                  Enjoy your lunch with {this.state.otherUser}!
                </div>
                <div style={{ marginBottom: "12%" }}>
                  <div style={{ fontSize: "16px", fontWeight: 500 }}>
                    You both like{" "}
                  </div>
                  {Object.entries(this.state.overlappingResponses).map(
                    ([key, value]) => {
                      return (
                        <div>
                          {key}: {value}
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="topic-list">
                  <TopicList
                    topics={[
                      "What are you eating for lunch?",
                      "What do you do in your free time?",
                      "What's your favorite TV show?",
                      "What’s your dream job?",
                      "What is your ideal vacation spot?",
                      "What is your favorite restaurant?",
                    ]}
                  />
                </div>
              </div>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => this.onLeave()}
              >
                Leave Room
              </Button>
              <iframe
                className="video-frame"
                title="video call iframe"
                ref={this.iframeRef}
                allow="camera; microphone; fullscreen"
              />
              <div className="video-timer">
                {this.formatTime(this.state.time)}
              </div>
            </div>
          </>
        );
      }
    };
    return <div>{renderStatus()}</div>;
  }
}

export default VideoChatPage;
