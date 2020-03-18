import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message, Button } from 'antd';
import {subjectFileUpload, subjectFileDownload, assetsManageFileUpload,assetsManageFileDownload} from 'units/Axios/http';
import PictureProcessing from 'common/pictureProcessing';
import * as HTTP from 'units/Axios';
import DownloadFile from 'common/download';
import './index.less';

class PicturesWall extends React.Component {
    static propTypes = {
        matchId: PropTypes.number,
        ltId: PropTypes.number,
        label: PropTypes.string,
        isD: PropTypes.bool,
        defaultFileList: PropTypes.array,
        disabled: PropTypes.bool,
        componentsIndex: PropTypes.number,
        componentsStyle: PropTypes.string,
        onPicturesWallChange: PropTypes.func,
        isDelete: PropTypes.bool,
        showUploadList: PropTypes.bool,
        businessId: PropTypes.number,
        businessType: PropTypes.string,
        amUUID: PropTypes.string,
        style: PropTypes.string,
    };

    static defaultProps = {
        matchId: 0,
        ltId: 0,
        style: 'assets',
        amUUID: '',
        label: '',
        isD: false,
        businessId: 0,
        businessType: '',
        showUploadList: true,
        defaultFileList: [],
        disabled: false,
        componentsIndex: 0,
        componentsStyle: '',
        isDelete: true,
        onPicturesWallChange: () => {
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            fileUploadUrl: assetsManageFileUpload,
            fileDownloadUrl: assetsManageFileDownload,
            fileRemoveUrl: HTTP.assetsManageDelFile,
            carouseCurrentIndex: 0,
            fileList: [],
            multiple: true,
            nextProps: [],
            carouselList: [],
            pictureProcessingVisible: false,
            businessId: '',
            amUUID: '',
        };
    }

    componentDidMount() { //预加载数据
        this.nextPropsDo(this.props)
    }

    componentWillReceiveProps(nextProps) { //组件接收到新的props时调用
        this.nextPropsDo(nextProps)
    }

    nextPropsDo = (nextProps) => {
        if (nextProps.defaultFileList !== this.state.nextProps && nextProps.defaultFileList) {
            if (nextProps.defaultFileList.length > 0 && nextProps.defaultFileList[0] !== "") {
                this.setState({
                    nextProps: nextProps.defaultFileList
                })
                this.fileListChange(nextProps)
            }
        }
        if (nextProps.businessId !== this.state.businessId) {
            this.setState({
                businessId: nextProps.businessId
            })
        }
        if (nextProps.amUUID !== this.state.amUUID) {
            this.setState({
                amUUID: nextProps.amUUID
            })
        }

        if (nextProps.matchId !== this.state.matchId) {
            this.setState({
                matchId: nextProps.matchId
            })
        }

        if (nextProps.matchId !== this.state.matchId) {
            this.setState({
                ltId: nextProps.ltId
            })
        }
        if (nextProps.style === 'subject') {
            this.setState({
                fileUploadUrl: subjectFileUpload, 
                fileDownloadUrl: subjectFileDownload,
                fileRemoveUrl: HTTP.subjectDelFile  
            })
        }
        
        console.log('nextProps',nextProps)
    }

    _imageRemove = async (url,fileList) => { //请求数据函数
        let data = {
            path: url,
            key: this.props.componentsStyle,
            amId: this.state.businessId,
            amUuid: this.state.amUUID
        }
        if (this.props.style === 'subject') {
            data = {
                path: url,
                key: this.props.componentsStyle,
                matchId: this.state.matchId,
            }
        }
        try {
            const result = await this.state.fileRemoveUrl({
                ...data
            });
            console.log(fileList)
            fileList = fileList.filter((file) => {
                if (file.response) {
                    if (file.response.code === 0) {
                        // file.url = assetsManageFileDownload + '' + file.response.data[file.response.data.length-1].url;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            });
            console.log(fileList)
            this.setState({
                fileList
            }, function () {
                console.log(this.state.fileList)
            })
           
        } catch (e) {
            
        }
    }

    fileListChange = (nextProps) => {
        this.setState({
            fileList: nextProps.defaultFileList
        }, function () {
            console.log(this.state.fileList)
        })
    }

    handlePreview = (file) => {
        // DownloadFile(file.url)
        const {fileList} = this.state;
        let goToIndex = null;
        if (fileList.length > 0) {
            fileList.forEach((item, index) => {
                if (item.uid === file.uid) {
                    goToIndex = index;
                }
            });
        }
        this.setState({
            carouseCurrentIndex: goToIndex,
            pictureProcessingVisible: true,
            carouselList: fileList,
        }, () => {
            this.slider && this.slider.innerSlider.slickGoTo(goToIndex);
        });
    };

    handleChange = ({fileList, file, event}) => {
        console.log('fileList:',fileList)
        console.log('assetsManageFileDownload:',assetsManageFileDownload)
        console.log('file:',file)
        console.log('file_event',event)
        if (file.status === 'removed') {
            let url = '';
            if (file.response) {
                url = file.response.data && file.response.data.path ? file.response.data.path : '';
            } else {
                url = file.path;
            }
            this._imageRemove(url,fileList)
        } else {
            if (file.status === 'error'  || (!file.response && file.status === 'done') || (file.response && file.response.code !== 0)) {
                message.error('上传失败！');
            }
            if (file.status === 'done' || file.status === 'uploading') {
                fileList = fileList.filter((file) => {
                    if (file.response) {
                        if (file.response.code === 0) {
                            // file.url = assetsManageFileDownload + '' + file.response.data[file.response.data.length-1].url;
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                });
                console.log(fileList)
                this.setState({
                    fileList
                }, function () {
                    console.log(this.state.fileList)
                })
            }
        }

        
        file.status !== 'error' && file.status ? this.props.onPicturesWallChange(file, this.props.componentsIndex, this.props.componentsStyle, file.status) : null

        // console.log(fileList[fileList.length-1].response)
    };
    beforeUpload = (file) => { //上传前控制图片的格式和大小
        console.log('eee:', file)
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //   message.error('You can only upload JPG file!');
        // }
        // // const isLt2M = file.size / 1024 / 1024 < 10
        // // if (!isLt2M) {
        // //     message.error('文件必须小于10M！')
        // // }
        // // return isJPG && isLt2M;
        // return isLt2M
        return true;
    };

    _onRemove = (file) => {
        const {isDelete} = this.props;
        if (!isDelete) {
            return false;
        }
        if (file.response && file.response.data) {
            return true;
        }
        if (file.deletable) {
            return true;
        } else if (file.deletable === false) {
            message.warn('不能删除该图片');
            return false;
        } else {
            return true;
        }
    };

    pictureProcessingHandleCancel = () =>{
        this.setState({
            pictureProcessingVisible: false,
            carouseCurrentIndex: 0
        })
    }

    render() {
        const {
            fileUploadUrl, pictureProcessingVisible, carouselList, carouseCurrentIndex, multiple
        } = this.state;

        const {showUploadList, isD, style} = this.props;
        let uploadData = {
            amUuid: this.state.amUUID,
            amId:this.state.businessId,
            key:this.props.componentsStyle,
            keyName:this.props.label
        }
        if (style === 'subject') {
            uploadData = {
                matchId: this.state.matchId,
                ltId:this.state.ltId,
                keyName:this.props.label
            }
        }
        console.log('uploadData',uploadData)
      
        return (
            <div className="clearfix flex-1">
                {
                    this.state.fileList.length > 0 ?
                        <div className={isD ? 'show' : ''}>
                            <Upload
                                accept={'image/*'}
                                action={fileUploadUrl}
                                listType="picture-card"
                                showUploadList={showUploadList}
                                fileList={this.state.fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                beforeUpload={this.beforeUpload}
                                data= {uploadData}
                                name="files"
                                headers={{token:sessionStorage.getItem('token_y')}}
                                multiple={multiple}
                                onRemove={this._onRemove}
                                className= {'upload-list-inline'}
                            >
                                {this.props.disabled ? null : <div>
                                    <Icon type="plus"/>
                                    <div className="ant-upload-text">{`选择图片`}</div>
                                </div>}
                                {/* {this.props.disabled ? null :<Button>
                                    <Icon type="upload" /> 选择文件
                                </Button>} */}
                            </Upload>
                        </div>
                        :
                        <div className={isD ? 'show' : ''}>
                            <Upload
                                accept={'image/*'}
                                action={fileUploadUrl}
                                showUploadList={showUploadList}
                                listType="picture-card"
                                fileList={this.state.fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                beforeUpload={this.beforeUpload}
                                name="files"
                                headers={{token:sessionStorage.getItem('token_y')}}
                                data= {uploadData}
                                multiple={multiple}
                                className= {'upload-list-inline'}
                            >
                                {this.props.disabled ? null :
                                    <div>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">{`选择图片`}</div>
                                    </div>}
                                    {/* {this.props.disabled ? null :<Button>
                                    <Icon type="upload" /> 选择文件
                                </Button>} */}
                            </Upload>
                        </div>
                }
                <PictureProcessing carouseCurrentIndex={carouseCurrentIndex} pictureProcessingHandleCancel={this.pictureProcessingHandleCancel} pictureProcessingVisible={pictureProcessingVisible} carouselList={carouselList}/>
            </div>
        );
    }
}

export default PicturesWall
