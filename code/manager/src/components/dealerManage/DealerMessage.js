import React from 'react';
import dealerData from '../../mock/dealerMock';
import config from '../../config/config';

class DealerMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dealer: config.dealer.originDealer,
            originDealer: config.dealer.originDealer,
        }
    }

    componentDidMount() {
        /* axios function */

        const key = this.props.location.dealerKey ? this.props.location.dealerKey : 0;
        const dealers = dealerData;
        const dealer = dealers.find((elem) => {
            return elem.key === key;
        })
        this.setState({
            dealer: dealer,
            originDealer: dealer,
        })
    }

    render() {
        return(
        <div>
            <p>{this.state.dealer.userName}</p>
        </div>
        );
    }
}

export default DealerMessage;