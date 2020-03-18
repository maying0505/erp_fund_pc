import React from 'react';
import * as HTTP from 'units/Axios';
import FormSet from 'common/FormSet';
import DetailModuleBox from 'common/DetailModuleBox';
import LodashDebounce from 'common/debounce';
import subjectShow from './subjectShowJson';
import subjectFileUploadJson from './subjectFileUploadJson';
import PicturesWall from 'components/ImgUpload';
import { Spin, Form, Button , message, Modal } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import './index.less';
const confirm = Modal.confirm;

class SubjectDetailDetailForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            operateStatus: '1',
            isSave: true,
            personalFileArray: {},
            fileArraySave: {},
            guarantyInfoFileArray: {},
            personalFileInfo: subjectFileUploadJson.longPersonalFileInfo,
            guarantyFileInfo: subjectFileUploadJson.longGuarantyFileInfo,
            businessTypeInfo: cloneDeep(subjectShow.businessTypeInfo),
            personalInfo: subjectShow.personalInfo,
            loanInfo: subjectShow.loanInfo,
            platformInfo: subjectShow.platformInfo,
            platformInfo1: subjectShow.platformInfo1,
            guarantyInfo: subjectShow.guarantyInfo_long,
            subjectInfo: subjectShow.subjectInfo,
            detailData: {},
            loading: true,
            id: Number(this.props.match.params['id']) ? Number(this.props.match.params['id']) : -1,
            ifShow: this.props.match.params['ifShow'] ? this.props.match.params['ifShow'] : '0',
            loanTypeDesc: this.props.match.params['loanTypeDesc'] ? this.props.match.params['loanTypeDesc'] : '1',
        }
    }

    componentDidMount() { //预加载数据
      this.loadlists();
      if (this.state.loanTypeDesc === '2') {
        this.setState({
            personalFileInfo: subjectFileUploadJson.dayPersonalFileInfo,
            guarantyInfo: subjectShow.guarantyInfo_day,
            guarantyFileInfo: subjectFileUploadJson.dayGuarantyFileInfo,
        })
      }
    }

    loadlists = async () => { //请求数据函数
        try {
            const result = await HTTP.subjectDetailEditQuery({},'/'+ this.state.id);
            console.log('result', result);
            this.setState({
                loading: false,
                detailData: result.data,
                operateStatus: result.data['operateStatus'] ? result.data['operateStatus'] : '1'
            },function(){
                let detailDataB = this.state.detailData;
                if (detailDataB['platformInfo'] && detailDataB['platformInfo']['receiptType'] === '2') {
                    this.setState({
                        platformInfo1: subjectShow.platformInfo2
                    })
                }
                if (detailDataB.status === '1') {
                    detailDataB.status = undefined;
                    this.setState({
                        detailData: detailDataB
                    })
                }
                if (detailDataB.status === '3' || detailDataB.status === '4') {
                    this.setState({
                        subjectInfo: subjectShow.subjectInfo1
                    })
                }
                if (detailDataB.status === '2' && sessionStorage.getItem('superadmin_cs') === 'true') {
                    let businessTypeInfoB = this.state.businessTypeInfo;
                    businessTypeInfoB.child[4] = 
                    {
                        label: '上线日期',
                        child: [
                            {
                                fieldName: 'onlineDate',
                                value: '',
                                format: 'YYYY-MM-DD',
                                style: 'data',
                            }
                        ],
                    }
                    this.setState({
                        businessTypeInfo: businessTypeInfoB
                    })
                    
                }
            })
            this.personalFileFormat(result.data['personalInfo'] ? result.data['personalInfo'] : {});
            this.guarantyFileFormat(result.data['guarantyInfo'] ? result.data['guarantyInfo'] : {});
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }

    guarantyFileFormat = (data) => {
        let fileArrayB = {};
        let fileArraySaveB = {};
        for(let item of this.state.guarantyFileInfo) {
            let fileValues = data[item.fieldName];
            console.log('fileArrayBdata',fileValues)
            if (fileValues) {
                fileArraySaveB[item.fieldName] = fileValues;
                let fileValuesJ = JSON.parse(fileValues);
                fileArrayB[item.fieldName] = fileValuesJ;
            }
        }
        this.setState({
            guarantyInfoFileArray: fileArrayB,
            fileArraySave: {...this.state.fileArraySave,...fileArraySaveB}
        },function(){
            console.log('fileArrayB',JSON.stringify(this.state.fileArraySave))
        })
    }

    personalFileFormat = (data) => {
        let fileArrayB = {};
        let fileArraySaveB = {};
        for(let item of this.state. personalFileInfo) {
            let fileValues = data[item.fieldName];
            console.log('fileArrayBdata',fileValues)
            if (fileValues) {
                fileArraySaveB[item.fieldName] = fileValues;
                let fileValuesJ = JSON.parse(fileValues);
                fileArrayB[item.fieldName] = fileValuesJ;
            }
        }
        this.setState({
            personalFileArray: fileArrayB,
            fileArraySave: {...this.state.fileArraySave,...fileArraySaveB}
        },function(){
            console.log('fileArrayB',JSON.stringify(this.state.fileArraySave))
        })
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
        },function(){
            console.log('fileArrayB',JSON.stringify(this.state.fileArraySave))
        })
    }

    /**
     * @desc 添加防抖，防止连击
     * */
    _handleSave = LodashDebounce((e) => this.handleSave(e,'1'));
    _handleSubmit = LodashDebounce((e) => this.handleSave(e,'2'));

    handleSave = (e,operateStatus) => {        
        e.preventDefault();
        if (!this.state.isSave){
            message.warning('请在所有文件上传完成后提交或保存!')
            return
        }
        this.props.form.validateFields((err, values) => {
            
            
            if (err && operateStatus === '2'){   
                message.warning('请填完必填项！');
                return;
            }
            this.setState({
                loading: true,
            })
           
            values.onlineDate = values.onlineDate ?  values.onlineDate.format('YYYY-MM-DD') : '';
            if ((values.status === '3' || values.status === '4') && values.status !== this.state.detailData['status']) {
                let text = values.status === '3'? '还款' : '作废';
                this.showConfirm(text, values,operateStatus);
            } else {
                this._save(values,operateStatus)
            }
        })
    }
   
    _save = async (values,operateStatus) => { 
        console.log('companyNameChecked',JSON.stringify({
            ...values,
            ...this.state.fileArraySave,
            operateStatus: operateStatus
         }))
        try {
            const result = await HTTP.subjectDetailEditSave({
               ...values,
               sdId: this.state.id,
               ...this.state.fileArraySave,
               operateStatus: operateStatus
            });
            console.log('result', result);
            this.setState({
                loading: false,
            })
            message.success(operateStatus === '2' ? '提交成功！' : '保存成功！');
            this.handleFormBack();
        } catch (e) {
            this.setState({
                loading: false,
            })
        }
    }

    showConfirm = (text,values,operateStatus) => {
        let that = this;
        confirm({
            title: '是否确定' + text + '?',
            content: '',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                that._save(values,operateStatus)
            },
            onCancel() {
                that.setState({
                    loading: false, 
                })
            },
        });
     }

     handleFormBack = (e) => {
        sessionStorage.setItem('_ifBack','0');
        this.props.history.go(-1);
    }

    receiptTypeChange = (id) =>{
        if (id === '1') {
            this.setState({
                platformInfo1: subjectShow.platformInfo1
            })
        } else if (id === '2') {
            this.setState({
                platformInfo1: subjectShow.platformInfo2
            })
        }
        console.log('receiptTypeChange',id)
    }

    render() {
        const { platformInfo1, operateStatus, personalFileArray, guarantyInfoFileArray, subjectInfo, guarantyFileInfo, guarantyInfo, loanInfo, loading, businessTypeInfo, ifShow, detailData, personalInfo, personalFileInfo, platformInfo } = this.state;
        const {form} = this.props;
        return (
            <Spin size="large" spinning={loading}>
                <Form layout="inline" id="wy-scroll-layout">
                    <DetailModuleBox title={businessTypeInfo.title} className={ifShow === '2' ? 'detail_box' : ''}>
                        <FormSet isShow={ifShow === '2' ? true: false} defaultValues={detailData && detailData[businessTypeInfo.name] ? detailData[businessTypeInfo.name] : {}} searchArr={businessTypeInfo.child} ColMd={8} ColsM={12} form={form}/>
                    </DetailModuleBox>
                    <DetailModuleBox title={personalInfo.title} className={ifShow === '2' ? 'detail_box' : ''}>
                        <FormSet isShow={ifShow === '2' ? true: false} defaultValues={detailData && detailData[personalInfo.name] ? detailData[personalInfo.name] : {}} searchArr={personalInfo.child} ColMd={8} ColsM={12} form={form}/>
                        <div className={`img_box_c ${ifShow === '2' ? 'img_box_s' : ''}`}>
                            {personalFileInfo.map((item,index)=>
                            <div className="width_half_img" key={index}>
                                <div className="flex img_box" key={index}>
                                    <span className={`upload_label ${item.isRequired ? 'upload_required': ''}`}>{item.label}</span>
                                    <PicturesWall ltId={detailData['businessType'] && detailData['businessType']['loanTypeId'] ? detailData['businessType']['loanTypeId'] : 0} matchId={detailData['businessType'] && detailData['businessType']['matchId'] ? detailData['businessType']['matchId'] : 0} style="subject" label={item.label} disabled={ifShow === '2' ? true: false} isD={ifShow === '2' ? true: false} componentsStyle={item.fieldName} defaultFileList={personalFileArray[item.fieldName]? personalFileArray[item.fieldName] : []} onPicturesWallChange={this.onPicturesWallChange.bind(this)} />
                                </div>
                            </div>
                            )}
                        </div>
                    </DetailModuleBox>
                    <DetailModuleBox title={loanInfo.title} className={ifShow === '2' ? 'detail_box' : ''}>
                        <FormSet isShow={ifShow === '2' ? true: false} defaultValues={detailData && detailData[loanInfo.name] ? detailData[loanInfo.name] : {}} searchArr={loanInfo.child} ColMd={8} ColsM={12} form={form}/>
                    </DetailModuleBox>
                    <DetailModuleBox title={platformInfo.title} className={ifShow === '2' ? 'detail_box' : ''}>
                        <FormSet receiptTypeChange={this.receiptTypeChange.bind(this)} isShow={ifShow === '2' ? true: false} defaultValues={detailData && detailData[platformInfo.name] ? detailData[platformInfo.name] : {}} searchArr={platformInfo.child} ColMd={8} ColsM={12} form={form}/>
                        <FormSet isShow={ifShow === '2' ? true: false} defaultValues={detailData && detailData[platformInfo.name] ? detailData[platformInfo.name] : {}} searchArr={platformInfo1} ColMd={8} ColsM={12} form={form}/>
                    </DetailModuleBox>
                    <DetailModuleBox title={guarantyInfo.title} className={ifShow === '2' ? 'detail_box' : ''}>
                        <FormSet isShow={ifShow === '2' ? true: false} defaultValues={detailData && detailData[guarantyInfo.name] ? detailData[guarantyInfo.name] : {}} searchArr={guarantyInfo.child} ColMd={8} ColsM={12} form={form}/>
                        <div className={`img_box_c ${ifShow === '2' ? 'img_box_s' : ''}`}>
                            {guarantyFileInfo.map((item,index)=>
                            <div className="width_half_img" key={index}>
                                <div className="flex img_box" key={index}>
                                    <span className={`upload_label ${item.isRequired ? 'upload_required': ''}`}>{item.label}</span>
                                    <PicturesWall ltId={detailData['businessType'] && detailData['businessType']['loanTypeId'] ? detailData['businessType']['loanTypeId'] : 0} matchId={detailData['businessType'] && detailData['businessType']['matchId'] ? detailData['businessType']['matchId'] : 0} style="subject" label={item.label} disabled={ifShow === '2' ? true: false} isD={ifShow === '2' ? true: false} componentsStyle={item.fieldName} defaultFileList={guarantyInfoFileArray[item.fieldName]? guarantyInfoFileArray[item.fieldName] : []} onPicturesWallChange={this.onPicturesWallChange.bind(this)} />
                                </div>
                            </div>
                            )}
                        </div>
                    </DetailModuleBox>
                    {operateStatus === '2' && <DetailModuleBox className={ifShow === '2' ? 'detail_box detail_box1' : ''}>
                        <FormSet isShow={ifShow === '2' ? true: false} defaultValues={detailData ? detailData : {}} searchArr={subjectInfo.child} ColMd={8} ColsM={12} form={form}/>
                    </DetailModuleBox>}
                    <div className="text_center form_submit_box">
                        {(ifShow === '0' || ifShow === '1') && operateStatus === '1' && sessionStorage.getItem('superadmin_cs') !== 'true' && <span>
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

const SubjectDetailDetail = Form.create()(SubjectDetailDetailForm)
export default SubjectDetailDetail
