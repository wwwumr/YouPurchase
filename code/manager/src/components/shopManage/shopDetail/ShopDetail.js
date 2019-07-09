import React from 'react';
import { Input, message, Popconfirm, Button } from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import shopMock from '../../../mock/shopMock';
import ImageUpload from './shopDetail/ImageUpload';
import DealerAutoInput from './shopDetail/DealerAutoInput';
import config from '../../../config/config';

class ShopDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: config.shop.originShop,
            originShop: config.shop.originShop,
        }
    }

    componentWillMount() {
        var key = this.props.location.storeId ? this.props.location.storeId : 0;
        /* axios function */
        axios.get(config.url.stores + key).then((res) => {
            this.setState({
                shop: res.data,
                originShop: res.data,
            })
        })
        
        /* 
        this.setState({
            shop: shopMock[key],
            originShop: Object.assign({}, shopMock[key]),
        })*/
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
                })
            */
        }    
    }

    handleUnbind = () => {
        /* axios function 
        axios.get(config.url.stores+"unbind?dealerId="+this.state.shop.dealerId+"&storeId="+this.state.shop.key)
            .then((res) => {
                if (res.data < 0) {
                    message.error("解除授权失败");
                } else {
                    message.success("授权已取消");
                    var shop = this.state.shop;
                    shop.dealerName = "";
                    this.setState({
                        shop: shop,
                    })
                }
            })
        */
        message.info("授权已取消");
        var dealer = this.state.dealer;
        dealer.storeName = "";
        this.setState({
            dealer: dealer,
        })
    }

    checkShop(shop, originShop) {
        if (shop.address !== originShop.address || shop.contact !== originShop.contact
            || shop.coverPicUrl !== originShop.coverPicUrl || shop.hours[0] !== originShop.hours[0]
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
            <ImageUpload coverPic={this.state.shop.coverPicUrl} />
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
                <Input addonBefore="地址"  style={{marginBottom: "10px"}}
                    value={ this.state.shop.address } 
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.address = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="联系方式" style={{marginBottom: "10px"}}
                    value={ this.state.shop.contact }  
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.contact = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="营业时间" style={{display: "inline-block", marginBottom: "10px", width: "50%"}}  
                    value={ this.state.shop.hours[0] } 
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.hours[0] = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="结束时间" style={{display: "inline-block", marginBottom: "10px", width: "50%"}}  
                    value={ this.state.shop.hours[1] }
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.hours[1] = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="经销商" style={{display: "inline-block", marginBottom: "10px", width: "50%"}}  
                    value={ this.state.shop.dealerName }
                    defaultValue="无"
                />
                <Popconfirm
                    title="你确定要取消对该经销商的授权吗?"
                    onConfirm={this.handleUnbind}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button  style={{display: "inline-block", marginBottom: "10px", width: "25%"}}  
                    >
                    取消授权
                    </Button>
                </Popconfirm>
                <Button  style={{display: "inline-block", marginBottom: "10px", width: "25%"}} >
                    <Link 
                        to = {{
                            pathname: "/dealerManage/dealerMessage/",
                            dealerKey: this.state.shop.dealerId,
                        }}
                    >
                    查看信息
                    </Link>
                </Button>
                <DealerAutoInput marginBottom= "10px" 
                    setDealer={(id, name) => {
                        var shop = this.state.shop;
                        shop.dealerId = id;
                        shop.dealerName = name;
                        this.setState({
                            shop: shop,
                        })
                    }} 
                >
                </DealerAutoInput>
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

export default ShopDetail;