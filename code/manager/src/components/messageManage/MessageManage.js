import React from 'react';
import axios from 'axios';
import config from '../../config/config';
import { message,  Button, Input } from 'antd';
import { checkJsonNotNull } from '../../lib/format/checkFormat';

export default class MessageManage extends React.Component {
    state = {
        title: "",
        text: "",
    }

    handleOk = () => {
        if (!checkJsonNotNull(this.state, ["title", "text"])) {
            message.error("所填不应为空");
            return;
        }
        axios({
            method: "POST",
            url: config.url.advertise.post,
            data: {
                title: this.state.title,
                text: this.state.text,
            }
        })
        .then((res)=> {
            if (parseInt(res.data) === 200) {
                message.success("添加推送成功");
                this.setState({
                    title: "",
                    text: "",
                })
            }
        })
    }

    handleChange = (e, info) => {
        let article = this.state;
        article[info] = e.target.value;
        this.setState({
            title: article.title,
            text: article.text,
        })
    }

    render (){
        return (
            <div style={{textAlign: "center"}}>
                <h1 >推送管理</h1>
                <div style={{ margin: 20, width: 800, height: 400, textAlign: "center", 
                    border: "solid 1px", marginLeft: 200 }}>
                    <Input style={{ margin: 20, width: "80%", }}
                        placeholder="标题"
                        value = { this.state.title }
                        onChange={(e) => { this.handleChange(e, "title") }}
                    />
                    <Input placeholder="正文"
                        style={{ width: "80%",  height: 300 }}
                        onChange={(e) => { this.handleChange(e, "text") }}
                        value= {this.state.text}
                    >
                    </Input>
                    
                </div>
                <Button onClick={this.handleOk}>发布新推送</Button>
            </div>
        );
    }
}