import React from 'react';
import axios from 'axios';
import { Select } from 'antd';
import config from '../../../../config/config';

const { Option } = Select;

/* 传入setClass方法以设置 */
export default class SelectTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagList: [],
            defaultClassId: null,
        }
    }

    componentDidMount() {
        axios
            .get(config.url.goodsClass.get)
            .then((res) => {
                const tagList = res.data;
                const defaultClass = tagList.find((elem) => {
                    return elem.classInfo === config.goods.defaultClassName;
                })
                this.setState({
                    tagList: tagList,
                    defaultClassId: defaultClass.commodityClassId,
                })
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.message);
                }
            })
    }

    handleChange = (value) => {
        let targetClass = this.state.tagList.find((elem) => {
            return elem.commodityClassId === parseInt(value);
        })
        this.props.setClass(targetClass.commodityClassId, targetClass.classInfo);
    }

    handleSelect = (value) => {
        let targetClass = this.state.tagList.find((elem) => {
            return elem.commodityClassId === parseInt(value);
        })
        this.props.setClass(targetClass.commodityClassId, targetClass.classInfo);
    }

    render() {
        return (
            <div >
                <Select style={{width: 300,}} dropdownMenuStyle={{maxHeight: 200}} placeholder={"点击查看分类"} 
                    defaultValue={this.state.defaultClassId}
                    onSelect={this.handleSelect}
                >
                {
                    this.state.tagList.length === 0 ? '' :
                    this.state.tagList.map((elem) => {
                        return (
                            <Option key={elem.commodityClassId.toString()}
                                value={elem.commodityClassId}
                            >
                            {elem.classInfo}
                            </Option>
                        );
                    })
                }
                </Select>
            </div>
        )
    }

}