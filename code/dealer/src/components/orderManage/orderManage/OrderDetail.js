import React from 'react';


export default class OrderDetail extends React.Component {

    render() {
        return (
            <p> { "hello" + this.props.match.params.orderInfoId}</p>
        );
    }
}