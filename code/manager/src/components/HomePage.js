import React from 'react'
import { Typography } from 'antd';
import WrappedNormalLoginForm from './homePage/WrappedNormalLoginForm';

const { Title } = Typography;

class HomePage extends React.Component {

    componentDidMount() {
        this.props.changeBg()
    }

    LogInForm = (props) => {
        return (
            <div style={{ 
                position:'relative',
                left: "37%",
                width: '25%',
                fontWeight: "bold",
            }}>
                <WrappedNormalLoginForm
                    fn = { this.props.fn }
                />
            </div>
        );
    }
        
    render() {       

        return (
            <div style={{ position:"relative", top:'100px', textAlign:'center' }}>  
                <Title level={1} style={{color: "white"}} > 欢迎登录优邻购管理系统 </Title>  
                <this.LogInForm />
            </div> 
        );
    }
}

export default HomePage;