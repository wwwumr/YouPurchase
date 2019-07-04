import React from 'react'
import { Form, Icon, Input, Button, Typography } from 'antd';
import { createHashHistory } from 'history';
import '../assets/HomePage.css'

const history = createHashHistory();
const { Title } = Typography;

class NormalLoginForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.fn(values.username);
                history.push({
                    pathname: "/shopManage",
                });
            }
        });
        
    };
  
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div>
            <Form onSubmit={this.handleSubmit}  className="login-form">
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
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                    登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

class HomePage extends React.Component {

    componentDidMount() {
        document.getElementById("background").style.backgroundImage="url(http://img.jiuzheng.com/pic/s/53/c7/53c79f851522da7f2b032a44.jpg)";
    }

    render() {
        return (
            <div style={{ position:"relative", top:'100px', textAlign:'center' }}>  
                <div>
                    <Title level={1} style={{color: "white"}} > 欢迎登录优邻购管理系统 </Title>  
                    <div style={{ position:'relative', left:'37%', width: '25%', fontWeight: "bold"}}>
                        <WrappedNormalLoginForm 
                            fn = { this.props.fn } 
                        />
                    </div>
                </div>
            </div> 
        );
    }
}

export default HomePage;