import React from 'react';
import './VideoChatPage.scss';
import DailyIFrame from '@daily-co/daily-js';
import TopicList from '../../Components/TopicList/TopicList';
import SocketIOClient from 'socket.io-client';
import { socket } from "./Header";
// const ENDPOINT = "localhost:2000";
const ENDPOINT = "192.168.99.194:2000"
const APIKEY = "";
// var socket;
class VideoChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.iframeRef = React.createRef();
        this.state = {
            time: 0,
            status: true,
            url: "",
        }
        // socket = SocketIOClient(ENDPOINT);
    }

    changeLoad = () => this.setState({status: false});
    setUrl = (data) => this.setState({url: data});

    async componentDidMount() { 
        // socket.on("matched", this.setUrl);
        // socket.on("matched", this.changeLoad);
        // socket.on("videoCallConnection", function(data) {
        //     this.callFrame.join({ url: data.url });
        //     this.setState({ time: 0 });
        //     this.interval = setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
        // })

        // const res = await fetch("https://api.daily.co/v1/rooms", {
        //     method: "post",
        //     headers: {
        //         Authorization: "Bearer " + APIKEY,
        //     },
        // });
    }
    async componentWillUnmount() {
        // socket.off("matched");
    }

    async componentDidUpdate() {
        // if (this.state.status) return;
        // this.callFrame = DailyIFrame.wrap(this.iframeRef.current);
        // this.callFrame.join({ url: this.state.url });

        // const socket = SocketIOClient(ENDPOINT);

        // socket.on("videoCallConnection", function(data) {
        //     this.callFrame.join({ url: data.url });
        //     this.setState({ time: 0 });
        //     this.interval = setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
        // })
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
            if(status){
              return <div>status</div>
            } else{
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
