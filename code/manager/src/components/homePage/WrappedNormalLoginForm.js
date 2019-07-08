import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { createHashHistory } from 'history';
import axios from 'axios';

const history = createHashHistory();

class NormalLoginForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                /* 检查用户名合法性 */
                

                /* 设置用户名并跳转 */
                this.props.fn(values.username);
                history.push({
                    pathname: "/shopManage/",
                });
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