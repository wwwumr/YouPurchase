import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../config/config';

const { Option } = AutoComplete;

/**
 * @description 菜单中展示的信息
 * @param  {Shop} item
 */
function renderOption(item) {
    return (
        
        <Option key={item.storeName} text={item.storeName}>
        <div className="global-search-item">
            <span style={{marginLeft: "20px"}} >
                <img style={{height: "40px"}} 
                    src={config.url.root + item.coverPicUrl} 
                    alt="店面"
                />
            </span>
            <span className="global-search-item-desc" style={{marginLeft: "30px"}}>
            {item.storeName}
            </span>
            <span className="global-search-item-desc" style={{margin: "10px",  float: "right",}}>
            <Link to={{
                pathname: "/shopManage/shopDetail/" + item.storeId
            }}>
            查看信息
            </Link>
            </span>
        </div>
        </Option>
    );
}

export default class AlcoholClassInput extends React.Component {
    state = {
        dataSource: [],
        alcohols: [],
    };

    
    /**
     * @description 加载未绑定商店信息
     */
    componentDidMount() {
        axios.get(config.url.goodsClass.get)
            .then((res) => {
                this.setState({
                    shopData: res.data,
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
                dataSource: this.state.shopData,
            })
            return ;
        }
        const dataSource = this.state.shopData.filter((elem) => {
            return elem.storeName.slice(0, value.length) === value ;
        })
        this.setState({
            dataSource: dataSource,
        })
    };

    /**
     * @description 选中后更新绑定信息但不提交
     * @param  {string} name
     */
    handleSelect = (name) => {
        var shop = this.state.shopData.find((elem) => {
            return elem.storeName === name;
        })
        this.props.setShop(shop.key, shop.storeName);
    }

    render() {
        const { dataSource } = this.state;
        const inputMarginButtom = "10px";
        return (
        <div className="global-search-wrapper" style={{ width: "100%" }}>
            <AutoComplete
                className="global-search"
                size="large"
                placeholder="输入店铺名以修改店铺"
                optionLabelProp="text"
                style={{ width: '100%', marginBottom: inputMarginButtom}}
                dataSource={dataSource.map(renderOption)}
                onSelect={ this.handleSelect }
                onSearch={ this.handleSearch }
                disabled={ this.props.storeName !== null && this.props.storeName !== ''}
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