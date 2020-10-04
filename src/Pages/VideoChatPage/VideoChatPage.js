import React from "react";
import "./VideoChatPage.scss";
import DailyIFrame from "@daily-co/daily-js";
import TopicList from "../../Components/TopicList/TopicList";
import { socket } from "./Header";
import banana from "./banana.gif";
import { Grid, Box, TextField, Button } from "@material-ui/core";
import "./HomePage.scss";
import Illustration from "../../assets/homepage.png";
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
      food: ""
    };
  }

    validateForm = () => {
        const {username, duration, meat, beatle, food} = this.state;
        return (!username.length || !duration.length || !meat.length || !beatle.length || !food.length)
    }

    formComplete = () => {
        if (this.validateForm()) {
            alert("Please fill out form");
            return;
        }
        this.setState({status: "matching"});
        const picked = (({ username, duration, meat, beatle, food}) => ({ username, duration, meat, beatle, food}))(this.state);
        socket.emit("surveyComplete", picked);
        console.log("sent survey");
    }
    setUrl = (data) => {
        this.setState({url: data, status: "video"});
        this.updateIframe();
        console.log(data);
    };


  async updateIframe() {
    if (this.state.time !== 0) return;
    this.setState({ time: parseInt(this.state.duration) * 60 });
    this.callFrame = DailyIFrame.wrap(this.iframeRef.current);
    this.callFrame.join({ url: this.state.url });
    this.interval = setInterval(() => {
        if (this.state.time >= 0) {
            this.setState({ time: this.state.time - 1 });
        }
    }, 1000);
  }

  onLeave() {
      clearInterval(this.interval);
      this.setState({
          time: 0,
          status: "form",
          url: "",
      })
      socket.emit("leaveCall");
  }

  handleUserLeft(data) {
      console.log(data);
      alert("The other user, " + data.name + " has left!");
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

  render() {
    const { status } = this.state;
    const renderStatus = () => {
      if (status === "form") {
        return (
          <div>
            <div className="header">Welcome to Lunchmeat! </div>
            <div className="header" style={{ fontSize: 24 }}>
              Lunchmeat is a way for you to meet other working people during
              your lunch break!
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
              <Grid item={true} xs={3} style={{ marginLeft: "12.5%" }}>
                <div>How long do you plan on eating for?</div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Duration</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={this.state.value}
                    onChange={(e) => this.handleDurationChange(e)}
                  >
                    {question1.map((questionValue, index) => {
                      return (
                        <FormControlLabel
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
              <Grid item={true} xs={3}>
                <div>Pick your preferred lunch meat</div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Meat</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={this.state.value}
                    onChange={(e) => this.handleMeatChange(e)}
                  >
                    {question2.map((questionValue, index) => {
                      return (
                        <FormControlLabel
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
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: "20px" }}
            >
              <Grid item={true} xs={3} style={{ marginLeft: "12%" }}>
                <div>Who's your favorite Beatle?</div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Beatle</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={this.state.value}
                    onChange={(e) => this.handleBeatleChange(e)}
                  >
                    {question3.map((questionValue, index) => {
                      return (
                        <FormControlLabel
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
              <Grid item={true} xs={3}>
                <div>I'm eating...</div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Food</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={this.state.value}
                    onChange={(e) => this.handleFoodChange(e)}
                  >
                    {question4.map((questionValue, index) => {
                      return (
                        <FormControlLabel
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
            </Grid>
            <div style={{ height: "100px", display: "flex" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: "auto" }}
                onClick={() => this.formComplete()}
              >
                Match with someone!
              </Button>
            </div>
          </div>
        );
      }
      else if (status === "matching") {
        return (
          <div className="video-page-container">
            <div><img src={banana} alt="banana spin"></img></div>
          </div>
        );
      } else {
        return (
          <>
            <div className="video-page-container">
              <div className="topic-list">
                <TopicList
                  topics={[
                    "Interests",
                    "Hobbies",
                    "Games",
                    "Food",
                    "Work",
                    "Travel",
                  ]}
                />
              </div>
              <div
                className="leave-button"
                onClick={() => this.onLeave()}
              >
                LEAVE
              </div>
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
