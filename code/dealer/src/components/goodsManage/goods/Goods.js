import React from 'react';
import { Input, message, Button, Radio,  } from 'antd';
import axios from 'axios';
import ImageUpload from './goods/ImageUpload';
import config from '../../../config/config';

const { TextArea } = Input;

class Goods extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            goods: Object.assign({}, config.goods.originGoods),
            originGoods: Object.assign({}, config.goods.originGoods),
        }
    }

    
    /**
     * @description 加载货物信息
     */
    componentDidMount() {
        axios
            .get(config.url.goods + this.props.match.params.id)
            .then(res => {
                let goods = Object.assign({}, res.data);
                goods.commodityPicUrls = res.data.commodityPicUrls.concat;
                this.setState({
                    goods: res.data,
                    originGoods: goods,
                })
            })
    }

    /**
     * @description 最终提交修改信息的函数
     */
    handleSubmit = () => {
        if (!this.checkShop()) {
            return false;
        }   
        axios
            .put(config.url.goods, this.state.goods)
            .then(res => {
                if (res.data && res.data === "UPDATE") {
                    message.success("修改完成")
                }
            })
    }

    /**
     * @description 绑定输入框的onChange
     * @param  { event } e
     * @param  { String } info
     */
    handleChange = (e, info) => {
        var goods = this.state.goods;
        goods[info] = e.target.value;
        this.setState({
            goods: goods,
        })
    }

    /**
     * @description 检查店铺是否有更改
     * @returns 
     */
    checkShop() {
        let goods = this.state.goods;
        let originGoods = this.state.originGoods;
        if (
            goods.commodityInfo !== originGoods.commodityInfo ||
            goods.inventory !== originGoods.inventory || 
            goods.remaining !== originGoods.remaining ||
            goods.onShelves !== originGoods.onShelves ||
            goods.price !== originGoods.price 
        ) {
            if (parseInt(goods.inventory) < parseInt(goods.remaining)) {
                message.error("您的商品上架量大于库存");
            } else if (parseInt(goods.inventory) < 0 || parseInt(goods.remaining) < 0 
                || parseFloat(goods.price) < 0) {
                message.error("您所更改的数据不符合实际");
            } else {
                return true;
            }
            return false;
        } 
        return false;
    }

    render() {
        return(
        <div style={{position: "relative", textAlign: "center", left: "150px" }}>
            <h1 style={{position: "relative", right: "150px"}}>商品信息</h1>
            <div 
                style={{position: "relative", height: "320px", width: "400px", float: "left", marginRight: "0px", marginTop: "20px", marginLeft: "50px"}}
            >
            <ImageUpload coverPic={config.url.root + this.state.goods.commodityCoverPicUrl } 
                storeId={this.props.match.params.id} 
            />
            </div>
            <div 
                style={{position: "relative", height: "320px", width: "350px", float: "left", marginTop: "70px", marginLeft: "0px"}}
            >
                <TextArea style={{ marginBottom : "15px" }}
                    value={ this.state.goods.commodityInfo } 
                    onChange = {(e) => { this.handleChange(e, "commodityInfo") }}
                />
                <Input addonBefore="价格 ￥"  style={{marginBottom: "15px"}}
                    value={ this.state.goods.price } 
                    onChange = {(e) => { this.handleChange(e, "price") }}
                />
                <Input addonBefore="商品库存" style={{ marginButtom: "15px" }}
                    value={this.state.goods.inventory}
                    onChange = {(e) => { this.handleChange(e, "inventory") }}
                >
                </Input> 
                <Radio.Group value={ this.state.goods.onShelves }
                    style={{display: "block", marginBottom: "15px", marginTop: "15px"}}
                    onChange = {(e) => { this.handleChange(e, "onShelves") }}
                >
                    <Radio value={true} defaultChecked={true}>已上架</Radio>
                    <Radio value={false}>未上架</Radio>
                </Radio.Group>
                <Input addonBefore="上架数量" style={{ marginButtom: "15px" }}
                    value={this.state.goods.remaining}
                    disabled={!this.state.goods.onShelves}
                    onChange = {(e) => { this.handleChange(e, "remaining") }}
                >
                </Input>
                <Button style={{ marginTop: "15px" }}
                    onClick = { this.handleSubmit } 
                >
                确认修改
                </Button>
            </div>
        </div>
        );
    }
}

export default Goods;