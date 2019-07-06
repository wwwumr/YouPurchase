import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';
import shopMock from '../../../../mock/shopMock';
import config from '../../../../config/config';

const { Option } = AutoComplete;

/* 菜单中展示的信息 */
function renderOption(item) {
    return (
        
        <Option key={item.storeName} text={item.storeName}>
        <div className="global-search-item">
            <span style={{marginLeft: "20px"}} >
                <img style={{height: "40px"}} 
                    src={config.autoInput.url} 
                    alt={config.autoInput.alt} 
                />
            </span>
            <span className="global-search-item-desc" style={{marginLeft: "30px"}}>
            {item.storeName}
            </span>
            <span className="global-search-item-desc" style={{margin: "10px",  float: "right",}}>
            <Link to={{
                pathname: "/shopManage/shopDetail/", 
                storeId: item.storeId
            }}>
            查看信息
            </Link>
            </span>
        </div>
        </Option>
    );
}

/* 父组件传入setShop以改变storeName,传入style以改变样式 */

class ShopAutoInput extends React.Component {
    state = {
        dataSource: [],
        shopData: [],
    };

    componentWillMount() {
        this.setState({
            shopData: shopMock,
        })
    }

    handleSearch = value => {
        if (value === "") {return false;}
        const dataSource = this.state.shopData.filter((elem) => {
            return elem.storeName.slice(0, value.length) === value ;
        })
        this.setState({
            dataSource: dataSource,
        })
    };

    handleSelect = (name) => {
        var shop = this.state.shopData.find((elem) => {
            return elem.storeName === name;
        })
        this.props.setShop(shop.key, shop.storeName);
    }

    render() {
        const { dataSource } = this.state;
        const inputMarginButtom = this.props.style.marginBottom ? this.props.style.marginBottom : "10px";
        return (
        <div className="global-search-wrapper" style={{ width: "100%" }}>
            <AutoComplete
                className="global-search"
                size="large"
                style={{ width: '100%', marginBottom: inputMarginButtom}}
                dataSource={dataSource.map(renderOption)}
                onSelect={ this.handleSelect }
                onSearch={ this.handleSearch }
                placeholder="输入店铺名以修改店铺"
                optionLabelProp="text"
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

export default ShopAutoInput;