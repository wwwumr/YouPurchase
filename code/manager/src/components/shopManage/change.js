import React from 'react';
import shopMock from '../../mock/shopMock';
import { Input } from 'antd';

class ShopDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: {
                key: null, 
                storeName: '', 
                address: '', 
                coverPicUrl: 'http://img2.imgtn.bdimg.com/it/u=2113909108,4103249324&fm=26&gp=0.jpg', 
                contact: '', 
                hours: [],
            },

        }
    }

    componentDidMount() {
        /* axios function */

        var key = this.props.location.shopKey ? this.props.location.shopKey : 0;
        this.setState({
            shop: shopMock[key],
        })
    }

    render() {
        return(
        <div style={{position: "relative", textAlign: "center", width: "60%", left:"20%", outlineColor: "#00ff00", outlineWidth: "10px"}}>
            
            <img style={{position: "relative", width: "60%", height: "300px", float: "left"}} src={ this.state.shop.coverPicUrl } alt="封面" ></img>
            <div style={{position: "relative", height: "300px", width: "40%", textAlign:"right"}}>
                <h1>店面信息</h1>
                <Input  value={ this.state.shop.storeName } addonBefore="店名" />
                <p>{ this.state.shop.address }</p>
                <p>{ this.state.shop.contact }</p>
                <p>{ this.state.shop.hours[0] + " ~ " + this.state.shop.hours[1] }</p>
            </div>
        </div>
        );
    }
}

export default ShopDetail;