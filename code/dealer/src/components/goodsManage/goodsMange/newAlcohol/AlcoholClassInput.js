import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import axios from 'axios';
import config from '../../../../config/config';

const { Option } = AutoComplete;

/**
 * @description 菜单中展示的信息
 * @param  {Shop} item
 */
function renderOption(item) {
    return (
        
        <Option key={item.alcoholId} text={item.alcoholInfo}>
        <div className="global-search-item">
            <span style={{marginLeft: "20px"}} >
                <img style={{height: "40px"}} 
                    src={config.url.root + item.coverPicUrl} 
                    alt="酒商品"
                />
            </span>
            <span className="global-search-item-desc" style={{marginLeft: "30px"}}>
            { item.alcoholInfo }
            </span>
        </div>
        </Option>
    );
}


/**
 * props: set
 */
export default class AlcoholClassInput extends React.Component {
    state = {
        dataSource: [],
        alcohols: [],
    };

    
    /**
     * @description 加载未绑定商店信息
     */
    componentDidMount() {
        axios.get(config.url.alcoholClass.get)
            .then((res) => {
                this.setState({
                    alcohols: res.data,
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
                dataSource: this.state.alcohols,
            })
            return ;
        }
        const dataSource = this.state.alcohols.filter((elem) => {
            return elem.alcoholInfo.slice(0, value.length) === value ;
        })
        this.setState({
            dataSource: dataSource,
        })
    };

    /**
     * @description 设定选定酒
     * @param  {string} name
     */
    handleSelect = (alcoholId) => {
        let alcohol = this.state.alcohols.find((elem) => {
            return elem.alcoholId === parseInt(alcoholId);
        })
        this.props.setAlcohol(alcohol)
    }

    render() {
        const { dataSource } = this.state;
        const inputMarginButtom = "10px";
        return (
        <div className="global-search-wrapper" style={{ width: "100%" }}>
            <AutoComplete
                className="global-search"
                size="large"
                placeholder="输入酒名查找"
                optionLabelProp="text"
                style={{ width: '100%', marginBottom: inputMarginButtom}}
                dataSource={dataSource.map(renderOption)}
                onSelect={ this.handleSelect }
                onSearch={ this.handleSearch }
            >
                <Input
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