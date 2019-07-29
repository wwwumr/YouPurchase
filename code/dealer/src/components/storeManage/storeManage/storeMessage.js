import React from 'react';
import { Input, Button, message, Typography, Radio,  } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

const { Title } = Typography;

export default class StoreMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shop: Object.assign({}, config.shop.originShop),
            originShop: Object.assign({}, config.shop.originShop),
        }
    }

    
    /**
     * @description 加载商店信息
     */
    componentDidMount() {
        axios
            .get(config.url.store)        
            .then(res => {
                this.setState({
                    shop: res.data,
                    originShop: Object.assign({}, res.data),
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    /**
     * @description 提交新的店铺信息
     */
    handleSubmit = () => {
        const shop = this.state.shop;
        const originShop = this.state.originShop;
        if (this.checkShop(shop, originShop)) {
            /* 商店经过信息修改 */
            axios
                .put(config.url.stores, 
                    shop
                ).then((res) => {
                    if (res.data < 0) {
                        message.error("修改失败");
                    } else {
                        let shop = this.state.shop;
                        this.setState({
                            originShop: Object.assign({}, shop),
                        })
                        message.success("修改成功");
                    }
                })
        }   
    }

    /**
     * @description 绑定输入框的onChange
     * @param  { event } e
     * @param  { String } info
     */
    handleChange = (e, info) => {
        var shop = this.state.shop;
        shop[info] = e.target.value;
        this.setState({
            shop: shop,
        })
    } 

    
    /**
     * @description 检查店铺是否经过修改
     * @param  { Store } shop
     * @param  { Store } originShop
     * @returns true if modified, otherwise false
     */
    checkShop(shop, originShop) {
        if (shop.address !== originShop.address || shop.contact !== originShop.contact
            || shop.startHour !== originShop.startHour
            || shop.endHour !== originShop.endHour || shop.storeName !== originShop.storeName
            || shop.dealerName !== originShop.dealerName) {
            return true;
        } 
        return false;
    }

    render() {
        return (
        <div style={{position: "relative", textAlign: "center", width: 400, marginLeft: 200}}>
            <Title level={3} > 店铺信息</Title>
            <Input addonBefore="店名"  style={{ marginBottom : "15px" }}
                value={ this.state.shop.storeName } 
                onChange = {(e) => { this.handleChange(e, "storeName") }}
            />
            <Input addonBefore="地址"  style={{marginBottom: "15px"}}
                value={ this.state.shop.address } 
                onChange = {(e) => { this.handleChange(e, "address") }}
            />
            <Input addonBefore="联系方式" style={{marginBottom: "15px"}}
                value={ this.state.shop.contact }  
                onChange = {(e) => { this.handleChange(e, "contact") }}
            />
            <Input addonBefore="营业时间" style={{display: "inline-block", marginBottom: "15px", width: "50%"}}  
                value={ this.state.shop.startHour } 
                onChange = {(e) => { this.handleChange(e, "startHour") }}
            />
            <Input addonBefore="结束时间" style={{display: "inline-block", marginBottom: "15px", width: "50%"}}  
                value={ this.state.shop.endHour }
                onChange = {(e) => { this.handleChange(e, "endHour") }}
            />
            <Input addonBefore="配送距离(km)" style={{display: "inline-block", marginBottom: "20px", width: "50%"}}  
                min={0} type="number"
                defaultValue = {5} 
            />
            <Radio.Group buttonStyle="solid"
                style={{ marginBottom: "20px", width: "50%",}}
                defaultValue={ 0 }
                onChange={(e) => {
                    console.log(e.value)
                }}
            >
                <Radio.Button value={0} >自己配送</Radio.Button>
                <Radio.Button value={1} >蜂鸟配送</Radio.Button>
            </Radio.Group>
            <Button 
                onClick = { this.handleSubmit } 
            >
            确认修改
            </Button>
        </div>
        );
    }
}