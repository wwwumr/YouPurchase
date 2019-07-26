import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { createHashHistory } from 'history';
import axios from 'axios';
import config from '../../config/config';

const history = createHashHistory();

class NormalLoginForm extends React.Component {

    /**
     * @description 检查登录合法性并更新用户名
     * @param  {event} e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios
                    .get(config.url.logIn, {
                        params: {
                            userName: values.username,
                            password: values.password,
                        }
                    })
                    .then((res) => {
                        if (res.data === "ADMIN") {
                            /* 若是管理员账号则设置用户名并跳转 */
                            this.props.setUserName(values.username);
                            history.push({
                                pathname: "/shopManage/",
                            });
                        } else {
                            message.error("用户名或密码错误")
                        }
                    })       
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;