import React from 'react';
import './TopicList.scss';

class TopicList extends React.Component {
    generateTopics() {
        return this.props.topics.map(topic => {
            return (
                <div className="topic">{"\u2022 " + topic}</div>
            )
        })
    }

    render() {
        return (
            <div className="topic-list-container">
                <div className="list-title">List of Topics</div>
                {this.generateTopics()}
            </div>
        );
    }
}

export default TopicList;
