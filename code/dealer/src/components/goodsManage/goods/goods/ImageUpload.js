import React from 'react';
import { Upload, Icon, message, Tooltip } from 'antd';
import shop from '../../../../config/shop';
import avatar from '../../../../config/avatar';
import url from '../../../../config/url';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    if (avatar.validFormat.indexOf(file.type) < 0) {
        message.error('上传的图片应为jpg或png格式!');
        return false;
    }

    if (file.size > avatar.maxCapicity) {
        message.error('图片大小不应超过2MB!');
        return false;
    }
    return true;
}

    
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: shop.originShop.coverPicUrl,
        };
    }

    componentWillMount() {
        var coverPic = this.props.coverPic ? this.props.coverPic : shop.originShop.coverPicUrl;
        this.setState({
            imageUrl: coverPic,
        })
    }
    
    handleChange = info => {
        if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    loading: false,
                }),
            );
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
                action= {avatar.action}
                data={{"key": this.props.storeId, "coverPicUrl": this.props.coverPic}}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={{position: "relative",display: "block", width: "400px", height: "300px", 
                    verticalAlign: "center", textAlign: "center"}}
            >
                {/* action之后重构 */}
                {
                    this.state.imageUrl ?
                    <img src={url+this.state.imageUrl} alt="avatar" 
                        style={{position: "relative", width: "100%", height: "90%"}}
                    /> 
                    : uploadButton
                }
                <h3>点击更换图片</h3>
            </Upload>
        </Tooltip>
        );
    }
}

export default ImageUpload;