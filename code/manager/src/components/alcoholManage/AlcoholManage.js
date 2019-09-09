import React from 'react';
import { Table, Button, Modal, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';
import { checkNotNull, checkJsonNotNull, checkLength, checkNotNegetive } from '../../lib/format/checkFormat';

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
            })
    }

    addAlcohol = () => {
        this.setState({
            visible: true,
        })
    }

    removeAlcohol = (text) => {
        axios
            .delete(config.url.alcohol.delete, {
                data: text,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((res) => {
                console.log(res.data)
                if (res.data === "DELETE") {
                    let alcohols = this.state.alcohols.filter((elem) => {
                        return elem.alcoholId === text;
                    })
                    this.setState({
                        alcohols: alcohols,
                    })
                }
            })
    }

    handleInputChange = (e, info) => {
        let alcohol = this.state.alcohol;
        alcohol[info] = e.target.value;
        this.setState({
            alcohol: alcohol,
        })
    }

    handleOk = () => {
        let alcohol = this.state.alcohol;
        let alcohols = this.state.alcohols;

        if (!checkJsonNotNull(alcohol, ["alcoholInfo", "remaining", "price"])
        ) {
            message.warning("请将信息填写完整")
            return false;
        } else if (!checkLength("goods", alcohol.alcoholInfo)) {
            message.warning("酒名过长");
        } else if (!checkNotNegetive(alcohol.remaining)) {
            message.warning("库存不应为负数");
        } else {
            axios({
                method: "POST",
                url: config.url.alcohol.post,
                data: alcohol,
            })
            .then((res) => {
                if (checkNotNull(res.data)) {
                    alcohol.alcoholId = alcohols.length;
                    alcohols.push(alcohol);
                    this.setState({
                        visible: false,
                        alcohol: Object.assign({}, config.alcohol),
                        alcohols: alcohols,
                    }, () => {
                        message.success("添加成功");
                    });
                } else {
                    message.error("添加失败");
                }
            })
        }
        
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
                render: (text) => (<Button onClick={() => {this.removeAlcohol(text)}}>删除</Button>),
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
                <Table rowKey="alcoholId" columns  ={ column } dataSource = { this.state.alcohols } 
                    pagination={{ defaultPageSize: 5 }}
                />
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