import React from 'react';
import './VideoChatPage.scss';
import DailyIFrame from '@daily-co/daily-js';
import TopicList from '../../Components/TopicList/TopicList';
import SocketIOClient from 'socket.io-client';
import { socket } from "./Header";

class VideoChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.iframeRef = React.createRef();
        this.state = {
            time: 0,
            status: "form",
            url: "",
        }
    }

    formComplete = () => this.setState({status: "matching"});
    setUrl = (data) => {this.setState({url: data, status: "video"}); this.updateIFrame();};
    
    async componentDidMount() {
        socket.on("matched", this.setUrl);
    }

    async componentWillUnmount() {
        socket.off("matched");
    }

    updateIFrame() {
        if (this.state.time !== 0) return;
        this.callFrame = DailyIFrame.wrap(this.iframeRef.current);
        this.callFrame.join({ url: this.state.url });
        setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
    }
    
    formatTime(secs) {
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v,i) => v !== '00' || i > 0)
            .join(':');
      }

    

    render() {
        const { status } = this.state;
        const renderStatus = () => {
            if (status === "form") {
                return <button onClick={this.formComplete}>submit</button>
            } if (status === "matching"){
              return <div>status</div>
            } else {
              return (<><div className="topic-list">
              <TopicList topics={["Interests", "Hobbies", "Games", "Food", "Work", "Travel"]}/>
          </div>
          <div className="leave-button" onClick={() => console.log("leave pressed")}>LEAVE</div>
          <iframe className="video-frame"
              title="video call iframe"
              ref={this.iframeRef}
              allow="camera; microphone; fullscreen"
          />
          <div className="video-timer">
              {this.formatTime(this.state.time)}
          </div></>)
            }
          }
        return (
            <div className="video-page-container">
                hello
                {renderStatus()}
           </div>
        );
    }
}

export default VideoChatPage;
