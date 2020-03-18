import React from 'react';
import showJson from './showJson';
import { message, Spin, Form, Button, Upload, Icon, Divider } from 'antd';
import PropTypes from 'prop-types';
import FormSet from 'common/FormSet';
import DetailModuleBox from 'common/DetailModuleBox';
import LodashDebounce from 'common/debounce';
import { singleFileDownload, assetsManageFileDownload } from 'units/Axios/http';
import cloneDeep from 'lodash/cloneDeep';
import DownloadFile from 'common/download';
import fileUploadJson from './fileUploadJson';
import PicturesWall from 'components/ImgUpload';
import './index.less';

const uuidv1 = require('uuid/v1');

class CompanyDetailForm extends React.Component {
    static propTypes = {
        queryHttpUrl: PropTypes.func,//查看接口
        updateHttpUrl: PropTypes.func,//编辑保存接口
        submitHttpUrl: PropTypes.func,//编辑提交接口
        saveHttpUrl: PropTypes.func,//新增接口
        ifShow: PropTypes.string,//是否查看
        id: PropTypes.number,//id
        ifAll: PropTypes.bool,//是否是公司管理
        ifCyberbank: PropTypes.bool,//是否是网银管理
        ifSupplement: PropTypes.bool,//是否是网银管理-补录
        ifCheck: PropTypes.bool,//是否是网银管理-核对
        showModule: PropTypes.array,//公司管理二级菜单
        handleFormBack: PropTypes.func,//返回
        cyberBankStatus: PropTypes.string,//是否已验收
        ifAssetsManage: PropTypes.bool,//是否是资产管理
    };

    static defaultProps = {
        ifAssetsManage: false,
        cyberBankStatus: '1',
        submitHttpUrl: ()=>{},
        updateHttpUrl: ()=>{},
        handleFormBack: ()=>{},
        queryHttpUrl: ()=>{},
        saveHttpUrl: ()=>{},
        ifShow: '0',
        id: -1,
        showModule: [],
        ifSupplement: false,
        ifCheck: false,
        ifCyberbank: false,
        ifAll: false
    };
    constructor(props) {
        super(props)
        this.state = {
            amUUID: uuidv1(),
            fileArraySave: {},
            fileArray: {},
            isSave: true,
            showModule: [],//公司管理子模块
            cyberbankInfoAll: [],
            cyberbankInfo: showJson.cyberbankInfo,
            cyberbankInfo_wldPhone: showJson.cyberbankInfo_wldPhone,
            cyberbankInfo_accountKepping: showJson.cyberbankInfo_accountKepping,
            cyberbankInfo_remark: showJson.cyberbankInfo_remark,
            companyInfo: cloneDeep(showJson.companyInfo),
            assetsManageInfo: cloneDeep(showJson.assetsManageInfo),
            assetsManageInfo_1: showJson.assetsManageInfo_1,
            allSearchArr: showJson.companyInfoAll,
            loading: true,
            detailData: {},
            fileList: [],
            assetsManageFileInfo: fileUploadJson.assetsManageFileInfo,
            assetsManageEdit: true,
        }
    }

    componentDidMount() { //预加载数据
        console.log('props:',this.props)
        if (this.props.ifShow === '0') {
            this.setState({
                loading: false
            })
        } else if (this.props.ifShow === '1' || this.props.ifShow === '2') {
            this._getDetailData(this.props.id);
        }
        if (this.props.ifSupplement) {
            this.setState({
                cyberbankInfoAll: [...this.state.cyberbankInfo,...this.state.cyberbankInfo_accountKepping,...this.state.cyberbankInfo_wldPhone,...this.state.cyberbankInfo_remark]
            })
        } else if (this.props.ifCheck) {
            this.setState({
                cyberbankInfoAll: [...this.state.cyberbankInfo,...this.state.cyberbankInfo_accountKepping,...this.state.cyberbankInfo_remark]
            })
        } else {
            this.setState({
                cyberbankInfoAll: [...this.state.cyberbankInfo,...this.state.cyberbankInfo_remark]
            })
        }
        this.propsGet(this.props);
    }

    componentWillReceiveProps(nextProps){ //组件接收到新的props时调用
        this.propsGet(nextProps);
    }

    propsGet = (props) => {
        if (props.showModule !== this.state.showModule) {
            this.setState({
                showModule: props.showModule
            })
            if (props.showModule[0] === 2 && props.cyberBankStatus === '2') {
                console.log('companyInfo',this.state.companyInfo)
                let companyInfoB = this.state.companyInfo;
                companyInfoB[2].child[3].child[0].disabled = true;
                this.setState({
                    companyInfo: companyInfoB
                })
            }
        }
    }
    
    _getDetailData = async (id) => { 
        try {
            const result = await this.props.queryHttpUrl({},'/'+id);
            console.log('result',result)
            this.setState({
                loading: false,
            })
            console.log('pathname',this.props)
            if (result.data) {
                if (!this.props.ifAssetsManage) {
                    let detailDataJ = {};
                    for(let p in result.data){//遍历json对象的每个key/value对,p为key
                        if (result.data[p]) {
                            detailDataJ = {...detailDataJ,...result.data[p]}
                        }
                    }
                    let enclosureJ = [];
                    if (detailDataJ.enclosure) {
                        for(let item of JSON.parse(detailDataJ.enclosure)){//遍历json对象的每个key/value对,p为key
                            item['url_open'] = item['url'];
                            delete item.url;
                            enclosureJ.push(item)
                        }
                    }
                    if (detailDataJ.archivesId) {
                        let companyInfoB = this.state.companyInfo;
                        companyInfoB[0].child[0] = {
                            isRequired: true, 
                            label: '渠道来源',
                            child: [
                                {
                                    fieldName: 'qdSource',
                                    disabled: true,
                                    value: '',
                                    style: 'input',
                                }
                            ],
                        };
                        companyInfoB[0].child[12] = {
                            isRequired: true, 
                            label: '工商归属',
                            child: [
                                {
                                    fieldName: 'icAscription',
                                    disabled: true,
                                    value: '',
                                    style: 'input',
                                }
                            ],
                        };
                        this.setState({
                            companyInfo: companyInfoB,
                        },function(){
                            console.log('companyInfoB',this.state.companyInfo)
                        })
                    }
                    this.setState({
                        detailData: detailDataJ,
                        fileList: enclosureJ
                    })
                } else {
                    this.setState({
                        detailData: result.data,
                        assetsManageEdit: result.data['operatorStatus'] === '2' && sessionStorage.getItem('superadmin_cs') !== 'true'? false : true,
                        amUUID: result.data['amUuid'] ? result.data['amUuid'] : this.state.amUUID
                    },function(){
                        if (result.data['operatorStatus'] === '2') {
                            let assetsManageInfoB = this.state.assetsManageInfo;
                            assetsManageInfoB[1] = {
                                label: '资产所在地',
                                isRequired: true, 
                                child: [
                                    {
                                        fieldName: 'amAddress',
                                        disabled: true,
                                        value: '',
                                        style: 'inputSelect',
                                    }
                                ],
                            };
                            assetsManageInfoB[2] = {
                                label: '资产匹配总价',
                                isRequired: true, 
                                child: [
                                    {
                                        fieldName: 'amMatchTotalPrice',
                                        unit: '万',
                                        disabled: true,
                                        value: '',
                                        style: 'numberInput',
                                    }
                                ],
                            };
                            this.setState({
                                assetsManageInfo: assetsManageInfoB
                            })
                        }
                    })
                    this.fileFormat(result.data);
                }
            }
            
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }

    fileFormat = (data) => {
        let fileArrayB = [];
        let fileArraySaveB = [];
        for(let item of this.state.assetsManageFileInfo) {
            let fileValues = data[item.fieldName];
            console.log('fileArrayBdata',fileValues)
            if (fileValues) {
                fileArraySaveB[item.fieldName] = fileValues;
                let fileValuesJ = JSON.parse(fileValues);
                fileArrayB[item.fieldName] = fileValuesJ;
            }
        }
        this.setState({
            fileArray: fileArrayB,
            fileArraySave: fileArraySaveB
        })
        console.log('fileArrayB',fileArrayB)
    }

    
    /**
     * @desc 添加防抖，防止连击
     * */
    _handleSave = LodashDebounce((e) => this.handleSave(e,'1'));
    _handleSubmit = LodashDebounce((e) => this.handleSave(e,'2'));

    handleSave = (e,cyberBankStatus) => {        
        e.preventDefault();
        if (!this.state.isSave){
            message.warning('请在所有文件上传完成后提交或保存!')
            return
        }
        this.props.form.validateFields((err, values) => {
            console.log('companyNameChecked',values)

            if (values.companyNameChecked === false) {
                message.warning('公司名称有重复，请重新填写！');
                return;
            }
            if (err && cyberBankStatus === '2'){   
                message.warning('请填完必填项！');
                return;
            }
            this.setState({
                loading: true,
            })
            if (this.props.ifAll) {
                values.blacklistFlag = values.blacklistFlag ? values.blacklistFlag : '';
                values.files = this.state.fileList;
                values.companyName = this.state.detailData['companyName'] ? this.state.detailData['companyName'] : ''
            } else if (this.props.ifCyberbank) {
                if (cyberBankStatus === '2' && !this.props.ifCheck && !this.props.ifSupplement && sessionStorage.getItem('superadmin_cs') !== 'true') {
                    values.zoneOperator = sessionStorage.getItem('zoneOperator_cs') ? sessionStorage.getItem('zoneOperator_cs') : ''
                }
                values.cyberBankNum = this.state.detailData['cyberBankNum'] ? this.state.detailData['cyberBankNum'] : ''
                values.operatorStatus =  this.state.detailData['operatorStatus'] ? this.state.detailData['operatorStatus'] : '1';
                values.cyberBankStatus = cyberBankStatus;
                values.checkDate = values.checkDate ?  values.checkDate.format('YYYY-MM-DD') : '';
                values.accountModifyTime = values.accountModifyTime ?  values.accountModifyTime.format('YYYY-MM-DD') : '';
            } else if (this.props.ifAssetsManage) {
                if (this.props.ifShow === '0' || sessionStorage.getItem('superadmin_cs') === 'true') {
                    values.registrationDate = values.registrationDate ?  values.registrationDate.format('YYYY-MM-DD') : '';
                    values.useEndDate = values.useEndDate ?  values.useEndDate.format('YYYY-MM-DD') : '';
                }
                values.amId = this.state.detailData['amId'] ? this.state.detailData['amId'] : 0;
                values.amUuid = this.state.amUUID;
                values = {...this.state.detailData,...values,...this.state.fileArraySave};
            } else {
                values.zlsjDate = values.zlsjDate ?  values.zlsjDate.format('YYYY-MM-DD') : '';
                values.accountActiveDate = values.accountActiveDate ?  values.accountActiveDate.format('YYYY-MM-DD') : '';
                values.bankOpenDate = values.bankOpenDate ?  values.bankOpenDate.format('YYYY-MM-DD') : '';
            }
            this._save(values,cyberBankStatus)
        })
    }
   
    _save = async (values,cyberBankStatus) => { 
        let httpUrl = this.props.saveHttpUrl;
        if (this.props.ifShow === '1') {
            values.companyId = this.props.id;
            httpUrl = this.props.updateHttpUrl;
        }
        if (cyberBankStatus === '1' && this.props.ifCyberbank) {
            httpUrl = this.props.submitHttpUrl;
        }
        if (this.props.ifAssetsManage) {
            httpUrl = cyberBankStatus === '1' ? this.props.updateHttpUrl: this.props.submitHttpUrl;
        }
        try {
            const result = await httpUrl({
               ...values
            });
            console.log('result', result);
            this.setState({
                loading: false,
            })
            message.success(cyberBankStatus === '2' ? '提交成功！' : '保存成功！');
            this.handleFormBack();
        } catch (e) {
            this.setState({
                loading: false,
            })
        }
    }
   
    handleFormBack = (e) => {
        this.props.handleFormBack(e)
    }
    handlePreview = (file) => {
        console.log('handlePreview',file.url_open)
        if (file.url_open) {
            DownloadFile(singleFileDownload + '?filePath=' + file.url_open)
        }
    }

    onPicturesWallChange = (event,index,style,status) =>{ //处理图片上传数据
        console.log('onPicturesWallChange',event)
        console.log('onPicturesWallChange',status,style)
        this.setState({
            isSave: false
        })
        if (status === 'uploading') return
        let isSaveBefore = true
        for (let i in event) {
            if (event[i].status !== 'removed' && event[i].status !== 'done' && event[i].status) {
                isSaveBefore = false
            }
        }
        let fileArraySaveB = this.state.fileArraySave;
        let fileArraySaveBS = fileArraySaveB[style] ? JSON.parse(fileArraySaveB[style]) : [];
        if (status === 'done') {
            event.response ? fileArraySaveBS.push(event.response.data) : null
        } else if (status === 'removed') {
            let val = event.response ? event.response.data : event;
            for (let i in fileArraySaveBS) {
                if (fileArraySaveBS[i].uid === val.uid) {
                    fileArraySaveBS.splice(i, 1);
                }
            }
        }
        console.log('fileArraySaveBS',fileArraySaveBS)
        fileArraySaveB[style] = fileArraySaveBS.length > 0 ? JSON.stringify(fileArraySaveBS):'';
        console.log('fileArraySaveB',JSON.stringify(fileArraySaveB))
        this.setState({
            fileArraySave: fileArraySaveB,
            isSave: isSaveBefore
        })
    }

    render() {
        const { ifAssetsManage, ifCyberbank, ifShow, form, ifAll } = this.props;
        const { assetsManageEdit, assetsManageInfo_1, amUUID, fileArray, assetsManageFileInfo, assetsManageInfo, cyberbankInfoAll, fileList, detailData, loading, companyInfo, showModule, allSearchArr  } = this.state;
        const fileUploadProps = {
            multiple: true,
            disabled: ifShow === '2' ? true: false,
            onRemove: (file) => {
              this.setState((state) => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                };
              });
            },
            beforeUpload: (file) => {
                console.log('formData',file)
              this.setState(state => ({
                fileList: [...state.fileList, file],
              }));
              
              return false;
            },
            defaultFileList: [...fileList],
            // listType: 'picture',
            fileList,
          };
        return (
                <Spin size="large" spinning={loading}>
                    <Form layout="inline" id="wy-scroll-layout"> 
                        {!ifAssetsManage && !ifCyberbank && companyInfo.map((item,index)=>
                            <div  key={index} className={ifShow === '2' || (showModule.indexOf(index) > -1 ? false: true) ? 'detail_box' : ''}>
                                <DetailModuleBox key={index} title={item.title} className={ifShow === '2' && (showModule.indexOf(index) > -1 ? false: true)? 'detail_box' : ''}>
                                    <FormSet isShow={ifShow === '2' || (showModule.indexOf(index) > -1 ? false: true)} defaultValues={detailData ? detailData : {}} searchArr={item.child} ColMd={8} ColsM={12} form={form}/>
                                </DetailModuleBox>
                            </div>
                        )}
                        {!ifAssetsManage && !ifCyberbank && 
                            ifAll && <DetailModuleBox  title={'补录信息'} className={ifShow === '2' ? 'detail_box' : ''} id="company_all">
                                <FormSet isShow={ifShow === '2'? true: false} defaultValues={detailData ? detailData : {}} searchArr={allSearchArr} ColMd={8} ColsM={12} form={form}/>
                                <div className="file_box">
                                    <span>上传附件：</span>
                                    <Upload {...fileUploadProps} onPreview={this.handlePreview}>
                                        <Button>
                                            <Icon type="upload" /> 选择文件
                                        </Button>
                                    </Upload>
                                </div>
                            </DetailModuleBox>
                        }

                        {ifCyberbank && 
                            <DetailModuleBox title={'网银信息'} className={ifShow === '2' ? 'detail_box' : ''}>
                                    <FormSet isShow={ifShow === '2'} defaultValues={detailData ? detailData : {}} searchArr={cyberbankInfoAll} ColMd={8} ColsM={12} form={form}/>
                            </DetailModuleBox>
                        }

                        {
                            ifAssetsManage &&
                            <DetailModuleBox title={'资产详情'} className={ifShow === '2' || !assetsManageEdit ? 'detail_box' : ''}>
                                <div className={ifShow === '2' || !assetsManageEdit ? 'detail_box asset_details' : 'asset_details'}>
                                    <FormSet isShow={ifShow === '2' || !assetsManageEdit} defaultValues={detailData ? detailData : {}} searchArr={assetsManageInfo} ColMd={12} ColsM={24} form={form}/>
                                    <div className={`img_box_c ${ifShow === '2' || !assetsManageEdit ? 'img_box_s' : ''}`}>
                                        {assetsManageFileInfo.map((item,index)=>
                                        <div className="width_half_img" key={index}>
                                            <div className="flex img_box" key={index}>
                                                <span className={`upload_label ${item.isRequired ? 'upload_required': ''}`}>{item.label}</span>
                                                <PicturesWall amUUID={amUUID} label={item.label} businessId={detailData['amId'] ? detailData['amId'] : 0} disabled={ifShow === '2' || !assetsManageEdit ? true: false} isD={ifShow === '2' || !assetsManageEdit ? true: false} componentsStyle={item.fieldName} defaultFileList={fileArray[item.fieldName]? fileArray[item.fieldName] : []} onPicturesWallChange={this.onPicturesWallChange.bind(this)} />
                                            </div>
                                        </div>
                                        )}
                                        {/* <div className="img_box_line">
                                            <Divider type="vertical" style={{height: '100%'}}/>
                                        </div> */}
                                    </div>
                                </div>
                                <div className={ifShow === '2' || !assetsManageEdit ? 'stop_flag' : 'stop_flag_show stop_flag'}>
                                    <FormSet isShow={ifShow === '2'} defaultValues={detailData ? detailData : {}} searchArr={assetsManageInfo_1} ColMd={12} ColsM={24} form={form}/>
                                </div>
                            </DetailModuleBox>
                        }
                        
                        <div className="text_center form_submit_box">
                            {(ifShow === '0' || ifShow === '1') && assetsManageEdit &&  (ifAssetsManage || ifCyberbank) && sessionStorage.getItem('superadmin_cs') !== 'true' && <span>
                                <Button type="primary" style={{marginLeft: 8}} onClick={this._handleSave}>保存</Button>
                            </span>}
                            {(ifShow === '0' || ifShow === '1') && <span>
                                <Button type="primary" style={{marginLeft: 8}} onClick={this._handleSubmit}>提交</Button>
                            </span>}
                            <Button style={{marginLeft: 8}} onClick={this.handleFormBack.bind(this,true)}>返回列表</Button>
                        </div>
                    </Form>
                </Spin>
        )
    }
}
const CompanyDetail = Form.create()(CompanyDetailForm)
export default CompanyDetail
