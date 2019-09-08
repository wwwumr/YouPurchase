import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Input, message, Popconfirm, Button, Radio, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import config from '../../../config/config';
import { checkNotChange } from '../../../lib/format/checkFormat';
import AvatarUpload from './dealerMessage/AvatarUpload';
import ShopAutoInput from './dealerMessage/ShopAutoInput';
import RenewPassword from './dealerMessage/RenewPassword';


class DealerMessage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dealer: Object.assign({}, config.dealer.originDealer),
            originDealer: Object.assign({}, config.dealer.originDealer),
            renewPassword: true,
        }
    }

    /**
     * @description 获取key并加载经销商信息
     */
    componentDidMount() {
        const key = this.props.match.params.key;
        axios
            .get(config.url.dealers+key)
            .then((res) => {
                this.setState({
                    dealer: res.data,
                    originDealer: Object.assign({}, res.data),
                })
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.message);
                }
            })
    }

    /**
     * @description 检查变化并更改经销商
     */
    handleSubmit = () => {
        if (checkNotChange(this.state.dealer, this.state.originDealer)) {
            return ;
        }
        var dealer = this.state.dealer;
        axios
            .put(config.url.putDealer, 
                dealer
            ).then((res) => {
                if (res.data !== "saved" ) {
                    message.error("修改失败");
                } else {
                    message.success("修改成功");
                }
            })
    }

    handleRenewPassword = () => {
        let visible = !this.state.visible;
        this.setState({
            visible: visible,
        })
    }

    /**
     * @description 绑定输入框的onChange
     * @param  { event } e
     * @param  { String } info
     */
    handleChange = (e, info) => {
        var dealer = this.state.dealer;
        dealer[info] = e.target.value;
        this.setState({
            dealer: dealer,
        })
    }

    /**
     * @description 解绑经销商和店铺
     */
    handleUnbind = () => {
        /* axios function */
        axios.get(config.url.storeUnbind, {
                params: {
                    dealerId: this.state.dealer.key,
                    storeId: this.state.dealer.storeId
                }
            })
            .then((res) => {
                if (res.data < 0) {
                    message.error("解除授权失败");
                } else {
                    message.success("授权已取消");
                    var dealer = this.state.dealer;
                    dealer.storeName = "";
                    this.setState({
                        dealer: dealer,
                    })
                }
            })
    }

    setDisvisible = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        return(
        <div style={{position: "relative", textAlign: "center", left: "430px" }}>
            <RenewPassword visible={ this.state.visible } setDisvisible={ this.setDisvisible } />
            <h1 style={{position: "relative", right: "430px"}}>经销商信息</h1>
            <div 
                style={{position: "relative", height: "320px", width: "350px", float: "left", marginTop: "50px"}}
            >
                <div 
                    style={{position: "relative", height: "100px", width: "100px", float: "left",}}
                >
                    <AvatarUpload id={this.props.match.params.key} />
                </div>
                <Input addonBefore="用户名"  style={{ marginBottom : "10px", width: "60%", float: "right"}}
                    value={ this.state.dealer.userName } 
                    onChange = {(e) => { this.handleChange(e, "userName") }}
                />
                <span 
                    style={{display: "inline-block", width: "20%", padding: 4, marginLeft: 2, 
                        backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4, }} 
                >
                性别
                </span>
                <Radio.Group value={ this.state.dealer.gender } buttonStyle="solid"
                    style={{ marginBottom : "10px", width: "30%", float: "right" }}
                    onChange={ (e) => {this.handleChange(e, "gender") }}
                >
                    <Radio.Button value={0} style={{ width: "50%", float: "right" }}>男</Radio.Button>
                    <Radio.Button value={1} style={{ width: "50%", float: "right" }}>女</Radio.Button>
                </Radio.Group>
                <Input addonBefore="姓名"  style={{ marginBottom : "15px", width: "60%", float: "right"}}
                    value={ this.state.dealer.realName } 
                    onChange = {(e) => { this.handleChange(e, "realName") }}
                />
                <span style={{display: "inline-block", width: "25%", padding: 4, float: "left", marginTop: 31,
                    marginBottom: 10, backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4}} >
                出生日期
                </span>
                <DatePicker format={"YYYY-MM-DD"}
                    style = {{ marginBottom: 10, width: '75%', float: "right", textAlign: "center"}}
                    value={ moment(this.state.dealer.birthday ? this.state.dealer.birthday : moment().format("YYYY-MM-DD"), "YYYY-MM-DD") }
                    onChange = {(e) => {
                        var dealer = this.state.dealer;
                        dealer["birthday"] = e ? e.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
                        this.setState({
                            dealer: dealer,
                        })
                    }} 
                />
                <Input addonBefore="联系方式" style={{marginBottom: "10px"}}
                    value={ this.state.dealer.contact }  
                    onChange = {(e) => { this.handleChange(e, "contact") }}
                />
                <Input addonBefore="店铺" style={{display: "inline-block", marginBottom: "10px", width: "50%"}}  
                    value={ this.state.dealer.storeName }
                    placeholder="无"
                />
                <Popconfirm
                    title="你确定要取消经销商对该店铺的管理授权吗?" okText="确认" cancelText="取消"
                    disabled={!this.state.dealer.storeName}
                    onConfirm={ this.handleUnbind }
                >
                    <Button  style={{display: "inline-block", marginBottom: "10px", width: "25%"}}  
                    >
                    取消授权
                    </Button>
                </Popconfirm>
                <Button  style={{display: "inline-block", marginBottom: "10px", width: "25%"}} 
                    disabled={!this.state.dealer.storeName}
                >
                    <Link 
                        to = {{
                            pathname: "/shopManage/shopDetail/" + this.state.dealer.storeId,
                        }}
                    >
                    查看信息
                    </Link>
                </Button>
                <ShopAutoInput 
                    storeName = { this.state.dealer.storeName }
                    setShop={(id, name) => {
                        var dealer = this.state.dealer;
                        dealer.storeId = id;
                        dealer.storeName = name;
                        this.setState({
                            dealer: dealer,
                        })
                    }} 
                >
                </ShopAutoInput>
                <Button style={{ margin: 10 }}
                    onClick = { this.handleSubmit } 
                >
                确认修改
                </Button>
                <Button style={{ margin: 10 }}
                    onClick = { this.handleRenewPassword } 
                >
                更改密码
                </Button>
            </div>
            
        </div>
        );
    }
}

export default DealerMessage;