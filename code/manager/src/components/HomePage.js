import React from 'react'
import { Typography } from 'antd';
import WrappedNormalLoginForm from './homePage/WrappedNormalLoginForm';
import config from '../config/config';

const { Title } = Typography;

class HomePage extends React.Component {

    /**
     * @description 进登录页面时加载图片
     */
    componentDidMount() {
        this.props.changeBg(config.homePage.changeBgCmd);
    }

    
    /**
     * @description 包装登录表单
     * @param  {Props} props
     */
    LogInForm = (props) => {
        return (
            <div style={{ 
                position:'relative',
                left: "37%",
                width: '25%',
                fontWeight: "bold",
            }}>
                <WrappedNormalLoginForm
                    setUserName = { props.setUserName }
                />
            </div>
        );
    }
        
    render() {       

        return (
            <div style={{ position:"relative", top:'100px', textAlign:'center' }}>  
                <Title level={1} style={{color: "white"}} > 欢迎登录优邻购管理系统 </Title>  
                <this.LogInForm setUserName={this.props.setUserName} />
            </div> 
        );
    }
}

export default HomePage;