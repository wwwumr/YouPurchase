import React from 'react';
import AlcoholImg from './alcoholDetail/AlcoholImg';
import config from '../../../config/config';
import { Input } from 'antd';

export default class AlcoholDetail extends React.Component {

    state = {
        alcohol: {
            "alcoholId": 0,
            "alcoholInfo": "茅台",
            "remaining": 10000,
            "coverPicUrl": "image/defaultAlcohol.jpg",
            "price": 50,
        }
    }

    render() {
        return (
            <div>
                <div style={{ width: 200, height: 200, display: "inline-block", marginTop: 50, marginLeft: 200 }}>
                <AlcoholImg id={ this.props.match.params.alcoholId } 
                    action={config.uploadImage.alcoholAction}
                    api = { config.url.alcohol.get }
                    defaultImg={"image/defaultAlcohol.jpg"}
                    pos = {{
                        bwidth: "210px",
                        bheight: "210px",
                        width: "200px",
                        height: "200px",
                        margin: "-3px",
                    }}
                />
                </div>
                <div style={{ width: "30%", display: "inline-block", marginLeft: 100, top: -50 }}>
                    <h1 style={{ marginBottom: 50 }}>酒商品信息</h1>
                    <Input addonBefore={ "酒类别" } style={{ marginBottom: 15 }}
                        value={this.state.alcohol.alcoholInfo}
                        onChange = {(e) => {this.handleInputChange(e, "alcoholInfo")}}
                    />
                    <Input addonBefore={ "推荐价格(￥)" } style={{ marginBottom: 15 }}
                        value={this.state.alcohol.price}
                        onChange = {(e) => {this.handleInputChange(e, "price")}}
                    />
                    <Input addonBefore={ "库存量" } style={{ marginBottom: 15 }}
                        value={this.state.alcohol.remaining}
                        onChange = {(e) => {this.handleInputChange(e, "remaining")}}
                    />
                </div>
            </div>
        );
    }
}