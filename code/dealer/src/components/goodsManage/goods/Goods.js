import React from 'react';
import { Input, message, Button } from 'antd';
//import { Link } from 'react-router-dom/cjs/react-router-dom';
//import axios from 'axios';
import goodsMock from '../../../mock/goodsMock';
import ImageUpload from './goods/ImageUpload';

class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: goodsMock.originGoods,
            originGoods: goodsMock.originGoods,
        }
    }

    componentDidMount() {
        
        /* axios function 
        axios.get(config.url.stores + key).then((res) => {
            this.setState({
                goods: res.data,
                originGoods: res.data,
            })
        })*/
        
        /* */
        var goods = goodsMock.find((elem)=> {
            return elem.key === this.props.match.params.id;
        })
        console.log(goods)
        this.setState({
            goods: goods,
            originGoods: Object.assign({}, goods),
        })
    }

    /* 最终提交修改信息的函数 */
    handleChange = () => {
        const goods = this.state.goods;
        const originGoods = this.state.originGoods;
        if (this.checkShop(goods, originGoods)) {
            /* axios 
            var goods = this.state.goods
            axios.put(config.url.stores, 
                    goods
                ).then((res) => {
                    if (res.data < 0) {
                        message.error("修改失败");
                    } else {
                        message.success("修改成功");
                    }
                })*/
            message.info("修改")
        }   
    }


    checkShop(goods, originGoods) {
        if (true) {
            alert("修改成功");
            return true;
        } 
        return false;
    }

    render() {
        return(
        <div style={{position: "relative", textAlign: "center", left: "150px" }}>
            <h1 style={{position: "relative", right: "150px"}}>店面信息</h1>
            <div 
                style={{position: "relative", height: "320px", width: "400px", float: "left", marginRight: "30px", marginTop: "50px"}}
            >
            {/*
            <ImageUpload coverPic={this.state.goods["commodityCoverPicUrl"]} storeId={this.props.match.params.id} />
            </div>
            <div 
                style={{position: "relative", height: "320px", width: "350px", float: "left", marginTop: "50px", marginLeft: "60px"}}
            >
                <Input addonBefore="商品信息"  style={{ marginBottom : "10px" }}
                    value={ this.state.goods.commodityInfo } 
                    onChange = {(e) => {
                        var goods = this.state.goods;
                        goods.commodityInfo = e.target.value;
                        this.setState({
                            goods: goods,
                        })
                    }}
                />
                <Input addonBefore="价格"  style={{marginBottom: "15px"}}
                    value={ this.state.goods.price } 
                    onChange = {(e) => {
                        var goods = this.state.goods;
                        goods.price = e.target.value;
                        this.setState({
                            goods: goods,
                        })
                    }}
                />
                <Input addonBefore="是否上架" style={{marginBottom: "15px"}}
                    value={ this.state.goods.onShelves ? "已上架" : "未上架" } 
                />*/}
                <Button 
                    onClick = { this.handleChange } 
                >
                确认修改
                </Button>
            </div>
        </div>
        );
    }
}

export default Goods;