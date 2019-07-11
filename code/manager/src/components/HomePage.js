import React from 'react'
import { Typography } from 'antd';
import WrappedNormalLoginForm from './homePage/WrappedNormalLoginForm';

const { Title } = Typography;

class HomePage extends React.Component {

    componentDidMount() {
        //document.getElementById("background").style.backgroundImage="url(http://img.jiuzheng.com/pic/s/53/c7/53c79f851522da7f2b032a44.jpg)";
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