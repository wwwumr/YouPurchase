import React from 'react';
import { Input, message, Popconfirm, Button, TimePicker } from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import moment from 'moment';
//import shopMock from '../../../mock/shopMock';
import ImageUpload from './shopDetail/ImageUpload';
import DealerAutoInput from './shopDetail/DealerAutoInput';
import config from '../../../config/config';



class ShopDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: Object.assign({}, config.shop.originShop),
            originShop: Object.assign({}, config.shop.originShop),
        }
    }

    componentDidMount() {
        const key = this.props.match.params.key;
        /* axios function */
        axios.get(config.url.oneStore + key).then((res) => {
            const originShop = Object.assign({}, res.data);
            this.setState({
                shop: res.data,
                originShop: originShop,
            })
        })
        
    }

    /* 最终提交修改信息的函数 */
    handleChange = () => {
        const shop = this.state.shop;
        const originShop = this.state.originShop;
        if (this.checkShop(shop, originShop)) {
            /* axios */
            axios.put(config.url.putStore, 
                    shop
                ).then((res) => {
                    if (res.data < 0) {
                        message.error("修改失败");
                    } else {
                        this.setState({
                            originShop: Object.assign({}, shop),
                        })
                        message.success("修改成功");
                    }
                })
            
        }   
    }

    handleUnbind = () => {
        /* axios function */
        axios
            .get(config.url.storeUnbind, {
                params: {
                    dealerId: this.state.shop.dealerId,
                    storeId: this.state.shop.key,
                }
            })
            .then((res) => {
                if (res.data !== "unbind") {
                    message.error("解除授权失败");
                } else {
                    var shop = this.state.shop;
                    shop.dealerName = "";
                    shop.dealerId = null;
                    var originShop = this.state.originShop;
                    originShop.dealerId = null;
                    originShop.dealerName = '';
                    this.setState({
                        shop: shop,
                        originShop: originShop,
                    })
                    message.success("授权已取消");
                }
            })
    }

    checkShop(shop, originShop) {
        if (shop.address !== originShop.address || shop.contact !== originShop.contact
            || shop.startHour !== originShop.startHour || shop.endHour !== originShop.endHour
            || shop.storeName !== originShop.storeName || shop.dealerName !== originShop.dealerName
            ) {
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
            <ImageUpload storeId={this.props.match.params.key} />
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
                <span style={{display: "inline-block", width: "20%", padding: 4, backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4}} >
                营业时间
                </span>
                <TimePicker style={{display: "inline-block", marginBottom: "10px", width: "35%"}}
                    value={ moment(this.state.shop.startHour, "HH:mm") }
                    format="HH:mm"
                    onChange = {(t) => {
                        let shop = this.state.shop;
                        shop.startHour = t ? t.format("HH:mm") : "00:00";
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <span style={{display: "inline-block", width: "10%", padding: 4, backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4}} >
                 ~ 
                </span>
                <TimePicker style={{display: "inline-block", marginBottom: "10px", width: "35%"}}  
                    value={ moment(this.state.shop.endHour ? this.state.shop.endHour : "00:00", "HH:mm") }
                    format="HH:mm"
                    onChange = {(t) => {
                        var shop = this.state.shop;
                        shop.endHour = t ? t.format("HH:mm") : "00:00";
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="经销商" style={{display: "inline-block", marginBottom: "10px", width: "50%"}}  
                    value={ this.state.shop.dealerName }
                    placeholder="无"
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
                <Button  style={{display: "inline-block", marginBottom: "10px", width: "25%"}} 
                    disabled = {!this.state.shop.dealerName}
                >
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
                    disableFlag = {!(this.state.shop.dealerId===null || this.state.shop.dealerName==="")}
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