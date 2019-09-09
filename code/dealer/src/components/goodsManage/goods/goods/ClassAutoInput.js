import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import axios from 'axios';
import config from '../../../../config/config';


/**
 * props: setClassInfo
 */
export default class ClassAutoInput extends React.Component {
    state = {
        dataSource: [],
        goodsClass: [],
    };

    
    /**
     * @description 加载未绑定商店信息
     */
    componentDidMount() {
        axios
            .get(config.url.allGoodsClass)
            .then((res) => {
                let classes = res.data;
                let goodsClass = classes.map((elem) => {
                    return elem.classInfo;
                })
                this.setState({
                    goodsClass: goodsClass,
                    dataSource: goodsClass,
                })
            })
    }

    /**
     * @description 搜索函数
     * @param  {string} value
     */
    handleSearch = (value) => {
        if (value === "") {
            this.setState({
                dataSource: this.state.goodsClass,
            })
            return ;
        }
        const dataSource = this.state.goodsClass.filter((elem) => {
            return elem.slice(0, value.length) === value ;
        })
        this.setState({
            dataSource: dataSource,
        })
    };

    handleSelect = (value) => {
        this.props.setClassInfo(value);
    }

    onChange = value => {
        this.setState({ value });
        this.props.setClassInfo(value);
    };


    render() {
        const inputMarginButtom = "10px";
        return (
        <div className="global-search-wrapper" style={{ width: "100%", marginTop: 10 }}>
            <AutoComplete 
                className="global-search"
                size="large"
                value = {this.props.classInfo}
                style={{ width: '100%', marginBottom: inputMarginButtom}}
                dataSource={ this.state.dataSource }
                onSelect={ this.handleSelect }
                onSearch={ this.handleSearch }
                onChange={ this.onChange }
            >
                <Input
                    defaultValue={this.props.classInfo}
                    suffix={
                        <Button type="primary" size="large" className="search-btn"
                            style={{ marginRight: -12 }}
                        >
                            <Icon type="search" />
                        </Button>
                    }
                />
            </AutoComplete>
        </div>
        );
    }
}