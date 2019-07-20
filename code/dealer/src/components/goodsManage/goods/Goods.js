import React from 'react';
import { Input, message, Button, Radio,  } from 'antd';
//import axios from 'axios';
import goodsMock from '../../../mock/goodsMock';
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

    componentDidMount() {
        
        /* axios function */

        var goods = goodsMock.find((elem)=> {
            return elem.key === parseInt(this.props.match.params.id);
        })
        console.log(goods)
        this.setState({
            goods: goods,
            originGoods: Object.assign({}, goods),
        }, () => {
            console.log(this.state.goods)
        })
    }

    /**
     * 最终提交修改信息的函数
     */
    handleChange = () => {
        const goods = this.state.goods;
        const originGoods = this.state.originGoods;
        if (this.checkShop(goods, originGoods)) {
            /* axios */
            message.info("修改")
        }   
    }

    /**
     * 检查店铺是否有更改
     * @param { Object } goods 
     * @param { Object } originGoods 
     */
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
            <h1 style={{position: "relative", right: "150px"}}>商品信息</h1>
            <div 
                style={{position: "relative", height: "320px", width: "400px", float: "left", marginRight: "0px", marginTop: "20px", marginLeft: "50px"}}
            >
            {/**/}
            <ImageUpload coverPic={this.state.goods.commodityCoverPicUrl } storeId={this.props.match.params.id} />
            </div>
            <div 
                style={{position: "relative", height: "320px", width: "350px", float: "left", marginTop: "70px", marginLeft: "0px"}}
            >
                <TextArea addonBefore="商品信息"  style={{ marginBottom : "15px" }}
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
                    value={ this.state.goods.price + "￥"} 
                    onChange = {(e) => {
                        var goods = this.state.goods;
                        goods.price = e.target.value;
                        this.setState({
                            goods: goods,
                        })
                    }}
                />
                <Input addonBefore="商品库存" style={{ marginButtom: "15px" }}
                    value={this.state.goods.inventory}
                    onChange={(e) => {
                        let goods = this.state.goods;
                        goods.inventory = e.target.value;
                        this.setState({ goods: goods })
                    }}>
                </Input> 
                <Radio.Group value={ this.state.goods.onShelves }
                    style={{display: "block", marginBottom: "15px", marginTop: "15px"}}
                    onChange={(e) => {
                        let goods = this.state.goods;
                        goods.onShelves = e.target.value;
                        this.setState({ goods: goods })
                    }}
                >
                    <Radio value={true} defaultChecked={true}>已上架</Radio>
                    <Radio value={false}>未上架</Radio>
                </Radio.Group>
                <Input addonBefore="上架数量" style={{ marginButtom: "15px" }}
                    value={this.state.goods.remaining}
                    disabled={!this.state.goods.onShelves}
                    onChange={(e) => {
                        let goods = this.state.goods;
                        goods.remaining = e.target.value;
                        this.setState({ goods: goods })
                    }}>
                </Input>
                <Button style={{ marginTop: "15px" }}
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