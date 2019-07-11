import React from 'react'
import { Typography } from 'antd';
import WrappedNormalLoginForm from './homePage/WrappedNormalLoginForm';
import bgimage from '../config/homePageBgImg';

const { Title } = Typography;

class HomePage extends React.Component {

    componentDidMount() {
        document.getElementById("background").style.backgroundImage=bgimage;
    }

    render() {
        return (
            <div style={{ position:"relative", top:'100px', textAlign:'center' }}>  
                <div>
                    <Title level={1} style={{color: "white"}} > 欢迎登录优邻购商品管理系统 </Title>  
                    <div style={{ position:'relative', left:'37%', width: '25%', fontWeight: "bold"}}>
                        <WrappedNormalLoginForm
                            setUserName = { this.props.setUserName } 
                        />
                    </div>
                </div>
            </div> 
        );
    }
}

export default HomePage;