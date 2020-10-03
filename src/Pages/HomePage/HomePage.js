import React from 'react';
import './HomePage.scss';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
		// make api calls? if using sockets, maybe not, have to think about this
	}

    render() {
        return (
            <div>HomePage</div>
        );
    }
}

export default HomePage;
