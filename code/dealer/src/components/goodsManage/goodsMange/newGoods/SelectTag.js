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
        }
    }

    componentDidMount() {
        axios
            .get(config.url.allGoodsClass)
            .then((res) => {
                let tags = res.data;
                const tagList = tags.map((elem) => {
                    return elem.classInfo;
                });
                this.setState({
                    tagList: tagList,
                })
            })
    }


    render() {
        return (
            <div >
                <Select style={{width: 300,}} dropdownMenuStyle={{maxHeight: 200}} placeholder={"点击查看分类"} 
                    onSelect={ this.props.setClass }
                >
                {
                    this.state.tagList.length === 0 ? '' :
                    this.state.tagList.map((elem) => {
                        return (
                            <Option key={elem}
                                value={elem}
                            >
                            {elem}
                            </Option>
                        );
                    })
                }
                </Select>
            </div>
        )
    }

}