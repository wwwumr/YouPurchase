import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Input, Button, message, DatePicker,Radio } from 'antd';
import moment from 'moment';
import axios from 'axios';
import AvatarUpload from './accountManage/AvatarUpload';
import config from '../../config/config';



class AccountManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dealer: Object.assign({}, config.dealer.originDealer),
            originDealer: Object.assign({}, config.dealer.originDealer),
        }
    }

    
    /**
     * @description 请求dealer信息
     */
    componentDidMount() {
        axios
            .get(config.url.dealer)
            .then((res) => {
                this.setState({
                    dealer: res.data,
                    originDealer: Object.assign({}, res.data),
                })
            })
    }
    
    /**
     * @description 提交新的经销商信息
     */
    handleSubmit = () => {
        if (!this.checkChange()) {//未改变
            return ;
        }
        var dealer = this.state.dealer;
        axios.put(config.url.dealers, 
                dealer
            ).then((res) => {
                if (res.data !== "saved") {
                    message.error("修改失败");
                } else {
                    let dealer = this.state.dealer;
                    this.setState({
                        originDealer: Object.assign({}, dealer),
                    })
                    message.success("修改成功");
                }
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
     * @description 检查用户是否修改信息
     * @returns 改变则返回true
     */
    checkChange = () => {
        const dealer = this.state.dealer;
        const originDealer = this.state.originDealer;
        if (
            dealer.contact === originDealer.contact &&
            dealer.password === originDealer.password &&
            dealer.realName === originDealer.realName &&
            dealer.storeId === originDealer.storeId &&
            dealer.userName === originDealer.userName
            ){
                return false;
            }
        return true;
    }

    render() {
        return(
        <div style={{position: "relative", textAlign: "center", left: "430px" }}>
            
            <h1 style={{position: "relative", right: "430px"}}>经销商信息</h1>
            <div 
                style={{position: "relative", height: "320px", width: "350px", float: "left", marginTop: "50px"}}
            >
                <div 
                    style={{position: "relative", height: "100px", width: "100px", float: "left",}}
                >
                    <AvatarUpload avatar={ config.url.root +  this.state.dealer.avatar } />
                </div>
                <Input addonBefore="用户名"  style={{ marginBottom : "15px", width: "60%", float: "right"}}
                    value={ this.state.dealer.userName } 
                    disabled={true}
                    onChange = {(e) => { this.handleChange(e, "userName") }}
                />
                <span 
                    style={{display: "inline-block", width: "20%", padding: 4, backgroundColor: "#fafafa", 
                        border: "1px solid #d9d9d9", borderRadius: 4}} 
                >
                性别
                </span>
                <Radio.Group value={ this.state.dealer.gender } buttonStyle="solid"
                    style={{ marginBottom : "15px", width: "30%", float: "right" }}
                >
                    <Radio.Button value={0} style={{ width: "50%", float: "right" }}>男</Radio.Button>
                    <Radio.Button value={1} style={{ width: "50%", float: "right" }}>女</Radio.Button>
                </Radio.Group>
                <Input addonBefore="姓名"  style={{ marginBottom : "15px", width: "60%", float: "right"}}
                    value={ this.state.dealer.realName } 
                    onChange = {(e) => { this.handleChange(e, "realName") }}
                />
                <Input addonBefore="联系方式" style={{marginBottom: "15px"}}
                    value={ this.state.dealer.contact }  
                    onChange = {(e) => { this.handleChange(e, "contact") }}
                />
                <span style={{display: "inline-block", width: "25%", padding: 4, backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4}} >
                出生日期
                </span>
                <DatePicker defaultValue={moment('2015-01-01', "YYYY-MM-DD")} format={"YYYY-MM-DD"}
                    style = {{ marginBottom: 15, width: '75%', float: "right", textAlign: "center"}}
                    value={ moment(this.state.dealer.birthday , "YYYY-MM-DD")}
                    onChange = {(e) => {
                        var dealer = this.state.dealer;
                        dealer["birthday"] = e ? e.format("YYYY-MM-DD") : "1999-01-01";
                        this.setState({
                            dealer: dealer,
                        })
                    }} 
                />
                <Input addonBefore="店铺" style={{display: "inline-block", marginBottom: "15px", width: "70%"}}  
                    value={ this.state.dealer.storeName }
                    disabled={true}
                    placeholder="无"
                />
                <Button  style={{display: "inline-block", marginBottom: "15px", width: "30%"}} 
                    disabled={!this.state.dealer.storeName}
                >
                    <Link 
                        to = {{
                            pathname: "/storeManage/",
                        }}
                    >
                    查看信息
                    </Link>
                </Button>
                <Button style={{display: "inline-block", marginBottom: "15px", width: "25%", marginRight: "20px"}} 
                    onClick = { this.handleSubmit } 
                >
                确认修改
                </Button>
                <Button style={{display: "inline-block", marginBottom: "15px", width: "25%", marginRight: "20px"}} 
                    onClick = { () => {
                        const originDealer = this.state.originDealer;
                        this.setState({
                            dealer: Object.assign({}, originDealer)
                        })
                    }} 
                >
                重置信息
                </Button>
                <Button style={{display: "inline-block", marginBottom: "15px", width: "25%", marginRight: "20px"}} 
                    onClick = { () => {
                        message.info("功能待开发");
                    }} 
                >
                找回密码
                </Button>
            </div>
        </div>
        );
    }
}


export default AccountManage;