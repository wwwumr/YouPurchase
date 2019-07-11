import React from 'react';
import { Input, message, Button } from 'antd';
//import { Link } from 'react-router-dom/cjs/react-router-dom';
//import axios from 'axios';
import shopMock from '../../mock/shopMock';
import ImageUpload from './storeManage/ImageUpload';
import shop from '../../config/shop';

class StoreManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: shop.originShop,
            originShop: shop.originShop,
        }
    }

    componentDidMount() {
        
        /* axios function 
        axios.get(config.url.stores + key).then((res) => {
            this.setState({
                shop: res.data,
                originShop: res.data,
            })
        })*/
        
        /* */
        var shop = shopMock.find((elem)=> {
            return elem.dealerName === this.props.match.params.userName;
        })
        this.setState({
            shop: shop,
            originShop: Object.assign({}, shop),
        })
    }

    /* 最终提交修改信息的函数 */
    handleChange = () => {
        const shop = this.state.shop;
        const originShop = this.state.originShop;
        if (this.checkShop(shop, originShop)) {
            /* axios 
            var shop = this.state.shop
            axios.put(config.url.stores, 
                    shop
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


    checkShop(shop, originShop) {
        if (shop.address !== originShop.address || shop.contact !== originShop.contact
            || shop.hours[0] !== originShop.hours[0]
            || shop.hours[1] !== originShop.hours[1] || shop.storeName !== originShop.storeName
            || shop.dealerName !== originShop.dealerName) {
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
            <ImageUpload coverPic={this.state.shop.coverPicUrl} storeId={this.state.shop.key} />
            </div>
            <div 
                style={{position: "relative", height: "320px", width: "350px", float: "left", marginTop: "50px", marginLeft: "60px"}}
            >
                <Input addonBefore="店名"  style={{ marginBottom : "10px" }}
                    value={ this.state.shop.storeName } 
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.storeName = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="地址"  style={{marginBottom: "15px"}}
                    value={ this.state.shop.address } 
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.address = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="联系方式" style={{marginBottom: "15px"}}
                    value={ this.state.shop.contact }  
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.contact = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="营业时间" style={{display: "inline-block", marginBottom: "15px", width: "50%"}}  
                    value={ this.state.shop.hours[0] } 
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.hours[0] = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="结束时间" style={{display: "inline-block", marginBottom: "15px", width: "50%"}}  
                    value={ this.state.shop.hours[1] }
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.hours[1] = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="经销商" style={{display: "inline-block", marginBottom: "20px"}}  
                    value={ this.state.shop.dealerName }
                    disabled={true}
                    placeholder="无"
                />
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
export default StoreManage;