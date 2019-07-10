import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { createHashHistory } from 'history';
//import axios from 'axios';
//import url from '../../config/url';

const history = createHashHistory();

class NormalLoginForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.setUserName(values.username);
                message.success("登录成功")
                document.getElementById("background").style.backgroundImage="none";
                history.push({
                    pathname: "/storeManage/"+values.username,
                });
                /* 检查用户名合法性 
                axios.get(url.logIn + "?userName=" + values.username + "&password=" + values.password)
                    .then((res) => {
                        if (res.data === "ADMIN") {*/
                            /* 设置用户名并跳转 
                            this.props.serUserName(values.username);
                            history.push({
                                pathname: "/shopManage/",
                            });
                        } else {
                            message.error("用户名或密码错误")
                        }
                    })*/           
            }
        });
        
    };
  
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div>
            <Form onSubmit={this.handleSubmit} style={{ maxWidth: "300px"}} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入你的用户名!' }],
                    })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                        autoComplete="on"
                    />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入你的密码!' }],
                    })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                        autoComplete="on"
                    />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        style={{width: "50%"}} 
                    >
                    登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
        );
    }
}

const DealerLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default DealerLoginForm;