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

/* 
 * props: id, action, api, pos 
 * key, coverPicUrl
*/
class AlcoholImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: "",
        };
    }

    /**
     * @description 加载图片信息
     */
    componentDidMount() {
        axios
            .get(this.props.api, {
                params: {
                    alcoholId: this.props.id,
                }
            })
            .then(res => {
                this.setState({
                    imageUrl: res.data.coverPicUrl,
                })
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.message);
                }
            })

    }
    
    /**
     * @description 改变图片
     * @param  {string} info
     */
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
        if (info.file.status === 'done') {
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
        const pos = this.props.pos;
        return (
        <Tooltip placement="topLeft" title="更换酒图片">
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action= { this.props.action }
                withCredentials={true}
                data={{"key": this.props.id, "coverPicUrl": this.state.imageUrl}}
                beforeUpload={ beforeUpload }
                onChange={ this.handleChange }
                style={{position: "relative",display: "block", width: pos.bwidth, height: pos.bwidth, 
                    verticalAlign: "center", textAlign: "center"}}
            >
                {/* action之后重构 */}
                {
                    this.state.imageUrl ?
                    (
                    <div
                        style={{position: "relative", width: pos.width, height: pos.height, marginLeft: pos.margin, marginTop: pos.margin}}
                    >
                    <img src={config.url.root + this.state.imageUrl} alt="avatar" 
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

export default AlcoholImg;