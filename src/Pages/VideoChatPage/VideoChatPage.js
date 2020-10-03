import React from 'react';
import './VideoChatPage.scss';
import DailyIFrame from '@daily-co/daily-js';

class VideoChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.iframeRef = React.createRef();
    }

    componentDidMount() {
        this.callFrame = DailyIFrame.wrap(this.iframeRef.current);

        // this is a test room
        this.callFrame.join({ url: "https://ivyhacks-sit.daily.co/WGnRLqx7LQ1HqE9XtSvp" });
	}

    render() {
        return (
            <div className="video-page-container">
                <iframe className="video-frame"
                    title="video call iframe"
                    ref={this.iframeRef}
                    allow="camera; microphone; fullscreen"
            />
           </div>
        );
    }
}

export default VideoChatPage;
