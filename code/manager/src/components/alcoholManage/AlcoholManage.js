import React from 'react';
import { Table, Button, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';

export default class AlcoholManage extends React.Component {

    state = {
        alcohols: [],
        alcohol: Object.assign({}, config.alcohol),
        visible: false,
    }

    componentDidMount = () => {
        axios
            .get(config.url.alcohol.get)
            .then((res) => {
                this.setState({
                    alcohols: res.data,
                })
                this.setState({
                    alcohols: [{
                        "alcoholId": 0,
                        "alcoholInfo": "茅台",
                        "remaining": 10000,
                        "coverPicUrl": "image/defaultAlcohol.jpg",
                        "price": 50,
                    }]
                })
            })
    }

    addAlcohol = () => {
        this.setState({
            visible: true,
        })
    }

    removeAlcohol = (text) => {
        /* axios here */
        let alcohols = this.state.alcohols.filter((elem) => {
            return elem.alcoholId === text;
        })
        this.setState({
            alcohols: alcohols,
        })
    }

    handleInputChange = (e, info) => {
        let alcohol = this.state.alcohol;
        alcohol[info] = e.target.value;
        this.setState({
            alcohol: alcohol,
        })
    }

    handleOk = e => {
        let alcohol = this.state.alcohol;
        let alcohols = this.state.alcohols;
        alcohol.alcoholId = alcohols.length;
        alcohols.push(alcohol);
        /* axios here */
        this.setState({
            visible: false,
            alcohol: Object.assign({}, config.alcohol),
            alcohols: alcohols,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const column = [
            {
                title: "酒封面预览",
                dataIndex: "coverPicUrl",
                key: "0",
                width: "200px",
                render: (text) => (<img src={ config.url.root + text } alt = "酒封面" style={{ width: 180, height: 120 }} />)
            },{
                title: "酒类别",
                dataIndex: "alcoholInfo",
                key: "1",
            },{
                title: "推荐价格(￥)",
                dataIndex: "price",
                key: "2",
            },{
                title: "库存量",
                dataIndex: "remaining",
                key: "3",
            },{
                title: (<Button onClick={this.addAlcohol}>增加</Button>),
                dataIndex: "alcoholId",
                key: "4",
                render: (text) => (<Button onClick={(text) => {this.removeAlcohol(text)}}>删除</Button>),
            },{
                title: "修改",
                dataIndex: "alcoholId",
                key: "5",
                render: (text) => 
                    (<Link to={ "/alcoholManage/alcoholDetail/" + text }>
                        <Button>修改</Button>
                    </Link>),
            }
        ]
        return (
            <div style={{ position: "relative", width: 800, left: 200, top: 50, textAlign: "center"}}>
                <Table rowKey="alcoholId" columns  ={ column } dataSource = { this.state.alcohols } ></Table>
                <Modal title="新增酒种类"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认" cancelText="取消"
                >
                <div style={{ width: "60%", marginLeft: "20%" }}>
                    <Input addonBefore={ "酒类别" } style={{ marginBottom: 15 }}
                        value={this.state.alcohol.alcoholInfo}
                        onChange = {(e) => {this.handleInputChange(e, "alcoholInfo")}}
                    />
                    <Input addonBefore={ "推荐价格(￥)" } style={{ marginBottom: 15 }}
                        value={this.state.alcohol.price}
                        onChange = {(e) => {this.handleInputChange(e, "price")}}
                    />
                    <Input addonBefore={ "库存量" } style={{ marginBottom: 15 }}
                        value={this.state.alcohol.remaining}
                        onChange = {(e) => {this.handleInputChange(e, "remaining")}}
                    />
                </div>
                </Modal>
            </div>
        );
    }
}