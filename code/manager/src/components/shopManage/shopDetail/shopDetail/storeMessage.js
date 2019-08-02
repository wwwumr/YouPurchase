import React from 'react';
import { Input, Button, message, Typography, Radio,TimePicker, Popconfirm } from 'antd';
import axios from 'axios';
import config from '../../../../config/config';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import DealerAutoInput from './DealerAutoInput';

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
            .get(config.url.stores + this.props.match.params.storeId)        
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
     * @description 绑定输入框的onChange
     * @param  { moment } time
     * @param  { String } info
     */
    handleTimeChange = (time, info) => {
        var shop = this.state.shop;
        shop[info] = time ? time.format("HH:mm") : moment().format("HH:mm");
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
            || shop.startHour !== originShop.startHour || shop.endHour !== originShop.endHour 
            || shop.storeName !== originShop.storeName || shop.dealerName !== originShop.dealerName
            || shop.deliveryRange !== originShop.deliveryRange || shop.deliveryType !== originShop.deliveryType
            ) {
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
            <span style={{display: "inline-block", width: "25%", padding: 4, backgroundColor: "#fafafa",            border: "1px solid #d9d9d9", borderRadius: 4}} 
            >
            营业时间
            </span>
            <TimePicker format={"HH:mm"}
                style = {{ marginBottom: 15, width: '30%', textAlign: "center"}}
                value={
                    this.state.shop.startHour ? moment( this.state.shop.startHour, "HH:mm"): moment()
                }
                onChange = {(time) => { this.handleTimeChange(time, "startHour")}}
            />
            <span style={{display: "inline-block", width: "15%", padding: 4, backgroundColor: "#fafafa",            border: "1px solid #d9d9d9", borderRadius: 4}} 
            >
             ~ 
            </span>
            <TimePicker format={"HH:mm"}
                style = {{ marginBottom: 15, width: '30%', textAlign: "center"}}
                value={
                    this.state.shop.endHour ? moment( this.state.shop.endHour, "HH:mm"): moment()
                }
                onChange = {(time) => { this.handleTimeChange(time, "startHour")}}
            />
            <Input addonBefore="配送距离(km)" style={{display: "inline-block", marginBottom: "20px", width: "50%"}}  
                min={0} type="number"
                value = { this.state.shop.deliveryRange } 
                onChange = {(time) => { this.handleChange(time, "deliveryRange")}}
            />
            <Radio.Group buttonStyle="solid"
                style={{ marginBottom: "20px", width: "50%",}}
                value={ this.state.shop.deliveryType }
                onChange={(e) => { this.handleChange(e, "deliveryType") }}
            >
                <Radio.Button value={0} >商家配送</Radio.Button>
                <Radio.Button value={1} >蜂鸟配送</Radio.Button>
            </Radio.Group>
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
                            pathname: "/dealerManage/dealerMessage/" + this.state.shop.dealerId,
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
                onClick = { this.handleSubmit } 
            >
            确认修改
            </Button>
        </div>
        );
    }
}