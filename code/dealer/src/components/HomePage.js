import React from 'react'
import { Typography } from 'antd';
import WrappedNormalLoginForm from './homePage/WrappedNormalLoginForm';
import config from '../config/config';

const { Title } = Typography;

class HomePage extends React.Component {

    /* 进入主页时开始加载图片 */
    componentDidMount() {
        this.props.changeBg(config.homePage.imageUrl);
    }


    render() {
        return (
            <div style={{ position:"relative", top:'100px', textAlign:'center' }}>  
                <div>
                    <Title level={1} style={{color: "white"}} > 欢迎登录优邻购商品管理系统 </Title>  
                    <div style={{ position:'relative', left:'37%', width: '25%', fontWeight: "bold"}}>
                        <WrappedNormalLoginForm
                            setUserMessage = { this.props.setUserMessage } 
                        />
                    </div>
                </div>
            </div>  
        );
    }
}

export default HomePage;