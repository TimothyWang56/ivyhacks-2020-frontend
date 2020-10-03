import React from 'react';
import './VideoChatPage.scss';
import DailyIFrame from '@daily-co/daily-js';
import TopicList from '../../Components/TopicList/TopicList';
import SocketIOClient from 'socket.io-client';

const ENDPOINT = "localhost:2000";
const APIKEY = "";

class VideoChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.iframeRef = React.createRef();
        this.state = {
            time: 0,
            loading: true,
        }
        this.changeLoad = this.changeLoad.bind(this);
    }

    async componentDidUpdate() {
        if (this.state.loading) return;
        this.callFrame = DailyIFrame.wrap(this.iframeRef.current);
        this.callFrame.join({ url: "https://ivyhacks-sit.daily.co/WGnRLqx7LQ1HqE9XtSvp" });

        // move to REDUX eventually
        // const socket = SocketIOClient(ENDPOINT);

        // socket.on("videoCallConnection", function(data) {
        //     this.callFrame.join({ url: data.url });
        //     this.setState({ time: 0 });
        //     this.interval = setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
        // })

        // move to backend later
        // const res = await fetch("https://api.daily.co/v1/rooms", {
        //     method: "post",
        //     headers: {
        //         Authorization: "Bearer " + APIKEY,
        //     },
        // });
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

    changeLoad() {
        this.setState(state => ({
            loading: false
          }));
    }

    render() {
        const { loading } = this.state;
        const renderLoading = () => {
            if(loading){
              return <button onClick={this.changeLoad}>Loading</button>
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
                {renderLoading()}
           </div>
        );
    }
}

export default VideoChatPage;
