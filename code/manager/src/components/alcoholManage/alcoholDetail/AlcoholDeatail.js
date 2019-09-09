import React from 'react';
import AlcoholImg from './alcoholDetail/AlcoholImg';
import axios from 'axios';
import config from '../../../config/config';
import { checkNotChange, checkJsonNotNull } from '../../../lib/format/checkFormat';
import { Input, Button, message } from 'antd';

export default class AlcoholDetail extends React.Component {

    state = {
        alcohol: Object.assign({}, config.alcohol),
        originAlcohol: Object.assign({}, config.alcohol),
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: config.url.oneAlcohol.get,
            params: { alcoholId: this.props.match.params.alcoholId }
        })
        .then((res) => {
            this.setState({
                alcohol: res.data,
            })
        })
    }

    handleInputChange = (e, info) => {
        let alcohol = this.state.alcohol;
        alcohol[info] = e.target.value;
        this.setState({
            alcohol: alcohol,
        })
    }

    handleOk = () => {
        if (checkNotChange(this.state.alcohol, this.state.originAlcohol)) {
            return ;
        }
        if (!checkJsonNotNull(this.state.alcohol, ["alcoholId", "alcoholInfo", "price", "remaining"])) {
            return ;
        }
        axios({
            method: "PUT",
            url: config.url.oneAlcohol.put,
            data: this.state.alcohol,
        })
        .then(() => {
            message.success("更新成功");
        })
    }

    render() {
        return (
            <div>
                <div style={{ width: 200, height: 200, display: "inline-block", marginTop: 50, marginLeft: 200 }}>
                <AlcoholImg id={ this.props.match.params.alcoholId } 
                    action={config.uploadImage.alcoholAction}
                    api = { config.url.oneAlcohol.get }
                    defaultImg={config.alcohol.coverPicUrl}
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
                    <h1 style={{ marginBottom: 10 }}>酒商品信息</h1>
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
                    <Button onClick={ this.handleOk } >确认修改</Button>
                </div>
            </div>
        );
    }
}