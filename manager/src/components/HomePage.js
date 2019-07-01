import React from 'react'
import { Form, Icon, Input, Button, Typography } from 'antd';
import '../assets/HomePage.css'


const { Title } = Typography;

class NormalLoginForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.fn(values.username);
            }
        });
    };
  
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入你的用户名!' }],
                    })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
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
                    />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

class HomePage extends React.Component {

    render() {
        return (
            <div style={{ top:'20%', textAlign:'center' }}>  
                {
                    !this.props.logIn &&
                    <div>
                        <Title level={1} > 欢迎登录优邻购管理系统 </Title>  
                        <div style={{ position:'relative', left:'37%', width: '25%'}}>
                            <WrappedNormalLoginForm 
                                fn = { this.props.fn } 
                            />
                        </div>
                    </div>
                }
                {
                    this.props.logIn &&
                    <div>
                    <Title level={1} > 登录成功 </Title>
                    </div>
                }
            </div>
            
        );
    }
}

export default HomePage;