import React from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';
//import axios from 'axios';

const TAGLENGTH = 10;

export default class TagManage extends React.Component {
    
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
    };

    componentDidMount = () => {
        /* axios here */
        this.setState({
            tags: ["其他", "直销酒", "文具", "玩具", "食品", "衣服"]
        })
    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ 
            tags 
        });
    };

    showInput = () => {
        this.setState({ 
            inputVisible: true 
        }, () => {
            this.input.focus()
        });
    };

    handleInputChange = e => {
        this.setState({ 
            inputValue: e.target.value 
        });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        /* axios here */
        this.setState({
            tags: tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            
            <div style={{ position: "relative", width: 800, left: 200, textAlign: "center"}}>
                <h1 style={{marginBottom: 30}}>已有标签</h1>
                {tags.map((tag) => {
                    const isLongTag = tag.length > TAGLENGTH;
                    const tagElem = (
                        <Tag key={tag} closable={true} 
                            onClose={() => this.handleClose(tag)}
                            style={{ width: 100, height: 30, padding: 3, textAlign: "center"
                                , marginBottom: 20, }}
                        >
                            {isLongTag ? `${tag.slice(0, TAGLENGTH)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag} style={{marginBottom: 20}}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        style={{ width: 100, height: 30, padding: 3, }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={this.showInput} 
                        style={{ background: '#fff', borderStyle: 'dashed', width: 100, height: 30, 
                            textAlign: "center", padding: 3,  }}>
                        <Icon type="plus" /> 新建类别
                    </Tag>
                )}
            </div>
        );
    }
}