import React from 'react';
import { Upload, Icon, message, Tooltip } from 'antd';
import axios from 'axios';
import config from '../../../../config/config'


function beforeUpload(file) {
    if (config.uploadImage.validFormat.indexOf(file.type) < 0) {
        message.error('上传的图片应为jpg或png格式!');
        return false;
    }

    if (file.size > config.uploadImage.maxCapicity) {
        message.error('图片大小不应超过2MB!');
        return false;
    }
    return true;
}


class AvatarUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: "",
        };
        
    }

    componentDidMount() {
        axios
            .get(config.url.getDealer + this.props.id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    imageUrl: res.data.avatar,
                })
            })

    }
    
    handleChange = info => {
        if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.setState({
            imageUrl: info.file.response,
            loading: false,
        })
        }
    };
    
    render() {
        const uploadButton = (
        <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
        );

        return (
        <Tooltip placement="topLeft" title="更换店面图片">
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action= {config.uploadImage.avatarAction}
                withCredentials={true}
                data={{"key": this.props.id, "avatar": this.state.imageUrl}}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={{position: "relative",display: "block", width: "100px", height: "100px", 
                    verticalAlign: "center", textAlign: "center"}}
            >
                {/* action之后重构 */}
                {
                    this.state.imageUrl ?
                    (
                    <div
                        style={{position: "relative", width: "90px", height: "90px", marginLeft: "-2px", marginTop: "-2px"}}
                    >
                    <img src={config.url.root+this.state.imageUrl} alt="avatar" 
                        style={{position: "relative", width: "100%", height: "100%"}} 
                    /> 
                    </div>
                    )
                    : uploadButton
                }
                
            </Upload>
        </Tooltip>
        );
    }
}

export default AvatarUpload;