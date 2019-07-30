import React from 'react';
import { Cascader } from 'antd';
import axios from 'axios';
import config from '../../../config/config';


export default class TagManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tagList: [],
            targetClassId: null,
        }
    }


    componentDidMount() {
        axios
            .get(config.url.goodsClass.get)
            .then((res) => {
                /*let tagList;
                if (res.data) {
                    tagList = res.data.map((elem) => {
                        let data;
                        data.value = 
                    })
                }*/

                this.setState({
                    tagList: res.data,
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    onChange = (value) => {
        this.setState({
            targetClassId: value,
        })
    }

    render() {
        return (
            <div >
                <Cascader fieldNames={{label:"classInfo", value: "commodityClassId", }}
                    options={this.state.tagList} onChange={this.onChange} placeholder="选择修改的类别"
                />
            </div>
        );
    }
}