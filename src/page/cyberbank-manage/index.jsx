import React from 'react';
import { message, Upload, Icon, Modal, Spin, LocaleProvider, Row, Col, Table, Card, Form, Button, Divider, Radio } from 'antd';
import FormSet from 'common/FormSet';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as HTTP from 'units/Axios';
import { cMDownloadTemplate, cyberbankDownLoadExcel, cyberbankPdf, transferAccountExcel } from 'units/Axios/http';
import DownloadFile from 'common/download';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
// const _tableWidth = 100/13+'%';
const _tableWidth = 100;
const columnsAlign = 'center';

class CyberbankManageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyBaseExcelInfo: {},
            ifUpload: true,
            fileList: [],
            visible: false,
            loadingUpload: false,
            searchArr: [
                {
                    label: '档案编号',
                    child: [
                        {
                            fieldName: 'archivesId',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '渠道',
                    child: [
                        {
                            fieldName: 'qdSource',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '网银验收日期',
                    child: [
                        {
                            fieldName: 'checkDate',
                            value:'',
                            style: 'dataRange',
                            format: 'YYYY-MM-DD',
                        }
                    ],
                },
                {
                    label: '公司名称',
                    child: [
                        {
                            fieldName: 'companyName',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '银行账号',
                    child: [
                        {
                            fieldName: 'bankAccount',
                            value:'',
                            ifNumber: true,
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '开户行全称',
                    child: [
                        {
                            fieldName: 'openingBank',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '资1操作人',
                    child: [
                        {
                            fieldName: 'zoneOperator',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '是否停用',
                    child: [
                        {
                            fieldName: 'stopFlag',
                            value: [
                                {
                                    value: '1',
                                    text: '是',
                                },
                                {
                                    value: '2',
                                    text: '否',
                                },
                            ],
                            style: 'select',
                        }
                    ],
                },
                {
                    label: '黑名单标记',
                    child: [
                        {
                            fieldName: 'blacklistFlag',
                            value: [
                                {
                                    value: '1',
                                    text: '是',
                                },
                                {
                                    value: '2',
                                    text: '否',
                                },
                            ],
                            style: 'select',
                        }
                    ],
                },
                {
                    label: '验收状态',
                    child: [
                        {
                            fieldName: 'ysFlag',
                            value: [
                                {
                                    value: '1',
                                    text: '待验收',
                                },
                                {
                                    value: '2',
                                    text: '已验收',
                                },
                            ],
                            style: 'select',
                        }
                    ],
                }
            ],
            childrenMenuList: sessionStorage.getItem('childrenMenuList') ? JSON.parse(sessionStorage.getItem('childrenMenuList')) : [],
            loading: true,
            tableListDataSource: [],
            ysFlagValue: '',
            pageInfo: sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_pageInfo') ? JSON.parse(sessionStorage.getItem('_pageInfo')) : {pageNum: '1', pageSize: '10'},
            searchInfo: sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_searchInfo') ? JSON.parse(sessionStorage.getItem('_searchInfo')) : {},
            pagination: sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_pagination') ? JSON.parse(sessionStorage.getItem('_pagination')) : {total: 1, pageSize: 10, current: 1},
            columns:[
                {
                    title: '档案编号',
                    align: columnsAlign,
                    dataIndex: 'archivesId',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '渠道',
                    align: columnsAlign,
                    dataIndex: 'qdSource',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '网银验收日期',
                    align: columnsAlign,
                    dataIndex: 'checkDate',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '公司名称',
                    align: columnsAlign,
                    dataIndex: 'companyName',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '银行账号',
                    align: columnsAlign,
                    dataIndex: 'bankAccount',
                    render: (text) => text ? <span className="bank_account">{this.bankAccountShow(text)}</span> : '--'
                },
                {
                    title: '开户行全称',
                    align: columnsAlign,
                    dataIndex: 'openingBank',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '制单盾编号及密码',
                    align: columnsAlign,
                    dataIndex: 'makeShieldNum',
                    render: (text,record) => text ? this.makeShieldNumShow(text,record) : '--'
                },
                {
                    title: '审核盾1编号及密码',
                    align: columnsAlign,
                    dataIndex: 'aduitShieldNum',
                    render: (text,record) => text ? this.aduitShieldNumShow(text,record) : '--'
                },
                {
                    title: '核准号',
                    align: columnsAlign,
                    dataIndex: 'approvalNum',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '银行预留手机号',
                    align: columnsAlign,
                    dataIndex: 'bankReservePhone',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '电话号码',
                    align: columnsAlign,
                    dataIndex: 'phoneNum',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '网银编号',
                    align: columnsAlign,
                    dataIndex: 'cyberBankNum',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '资1操作人',
                    align: columnsAlign,
                    dataIndex: 'zoneOperator',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '黑名单标记',
                    align: columnsAlign,
                    dataIndex: 'blacklistFlag',
                    fixed: 'right',
                    width: _tableWidth,
                    render: (text) => text ? text === '1' ? <span className="red-style">是</span> : '否' : '--'
                },
                {
                    title: '是否停用',
                    align: columnsAlign,
                    dataIndex: 'stopFlag',
                    fixed: 'right',
                    width: _tableWidth,
                    render: (text) => text ? text === '1' ? <span className="red-style">是</span> : '否' : '--'
                },
                {
                    title: '验收状态',
                    align: columnsAlign,
                    dataIndex: 'cyberBankStatus',
                    fixed: 'right',
                    width: _tableWidth,
                    render: (text) => text ? text === '1' ? <span className="red-style">待验收</span> : '已验收' : '--'
                },
                {
                    title: '操作',
                    align: columnsAlign,
                    dataIndex: 'companyId',
                    fixed: 'right',
                    width: _tableWidth,
                    render: (text,record) => this.operationDo(text,record)
                },
            ],
        }
    }

    componentDidMount() { //预加载数据
        let searchInfoB = this.state.searchInfo;
        if (sessionStorage.getItem('_ifBack') === '0'){
            searchInfoB = sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_searchInfo') ? JSON.parse(sessionStorage.getItem('_searchInfo')) : {};
            if (searchInfoB['checkStartDate'] && searchInfoB['checkEndDate']) {
                let checkDateB = [moment(searchInfoB['checkStartDate'], dateFormat),moment(searchInfoB['checkEndDate'], dateFormat)];
                searchInfoB['checkDate'] = checkDateB;
            }
        }
        this.setState({
            searchInfo: searchInfoB,
            ysFlagValue: searchInfoB['handleFlag'] ? searchInfoB['handleFlag'] : ''
        },function(){
            this.loadlists({...this.state.pageInfo, queryParams: {...this.state.searchInfo}}) //获取数据列表
        })
        sessionStorage.removeItem('_ifBack');
    }

    aduitShieldNumShow = (text,record) => {
        if (record.aduitShieldPwd) {
            return <span>审{text}<br></br>密{record.aduitShieldPwd}</span> 
        } else {
            return <span>审{text}</span> 
        }
    }

    bankAccountShow = (text) => {
        return text.replace(/(.{4})/g, "$1 ");
    }

    makeShieldNumShow = (text,record) => {
        if (record.makeShieldPwd) {
            return <span>制{text}<br></br>密{record.makeShieldPwd}</span> 
        } else {
            return <span>制{text}</span> 
        }
    }

    copy = (oEvent) => {
        //取消浏览器的默认动作，一般一定要有，请谨慎使用
        oEvent.preventDefault();
        let copyText = '';
        if (window.getSelection() && window.getSelection().getRangeAt(0) && window.getSelection().getRangeAt(0).startContainer && window.getSelection().getRangeAt(0).startContainer.data) {
            copyText = window.getSelection().getRangeAt(0).startContainer.data;
            copyText = copyText.replace(/\s+/g,"");
            console.log('自定义数据',window.getSelection())
        }
        
        oEvent.clipboardData.setData("text", copyText);
    }

    paste = (oEvent) =>{
        //控制台输出： 自定义数据
        console.log(oEvent.clipboardData.getData("text"));
    }

    companyStatusShow = (text) => {
        let showText = '';
        switch (text) {
            case '1': showText = '注册';break;
            case '2': showText = '开户';break;
            case '3': showText = '激活';break;
            default: showText = '--';
        }
        return showText;
    }

    operationDo = (text,record) => {
        let superadmin_cs = sessionStorage.getItem('superadmin_cs');
        let editShow = false;
        let aduitShow = false;
        let bcShow = false;
        if ((record.operatorStatus === '1' || !record.operatorStatus) && (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('cbm:edit') > -1 && (record.cyberBankStatus !== '2' || !record.cyberBankStatus)))) {
            editShow = true;
        }
        if (record.operatorStatus === '2' && (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('cbm:aduit') > -1 && record.cyberBankStatus !== '2'))) {
            aduitShow = true;
        }
        if (record.operatorStatus === '3' && (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('cbm:bc') > -1 && record.cyberBankStatus !== '2'))) {
            bcShow = true;
        }
        return <span>
                    {editShow && <Button size="small" onClick={this.addTableRow.bind(this,text,1,record.operatorStatus)}>编辑</Button>}
                    {editShow && <br></br>}
                    {aduitShow && <Button size="small" onClick={this.addTableRow.bind(this,text,1,record.operatorStatus)}>核对</Button>}
                    {aduitShow && <br></br>}
                    {bcShow && <Button size="small" onClick={this.addTableRow.bind(this,text,1,record.operatorStatus)}>补录</Button>}
                    {bcShow && <br></br>}
                    {this.state.childrenMenuList.indexOf('cbm:query') > -1 && <Button className="delete_btn" size="small" onClick={this.addTableRow.bind(this,text,2,record.operatorStatus)}>查看</Button>}
                </span>
    }
      
    pageJump = (e) => { //分页跳转
        console.log(e)
        this.setState({
            loading: true,
            tableListDataSource: [],
            pageInfo: {pageNum: e.current, pageSize: e.pageSize},
            pagination: {...this.state.pagination, current: e.current}
        }, function () {
            this.loadlists({...this.state.pageInfo, queryParams: {...this.state.searchInfo}})
        })
    }

    handleDownload = (e) => {
        this.handleSearch(e,true);
    }

    handleDownloadPdf = (e) => {
        this.handleSearch(e,true,true);
    }

    handleDownloadTAE = (e) => {
        this.handleSearch(e,true,false,true);
    }

    handleSearch = (e,ifDown,ifDownPdf,ifDownTAE) => { //查询请求
        this.setState({
            loading: true
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.checkDate) {
                values.checkStartDate = values.checkDate[0] ?  values.checkDate[0].format('YYYY-MM-DD') : '';
                values.checkEndDate = values.checkDate[1] ?  values.checkDate[1].format('YYYY-MM-DD') : '';
            }
            values.checkDate = undefined;
            this.setState({
                searchInfo: {...this.state.searchInfo, ...values}
            }, function () {
                console.log(this.state.searchInfo)
                if (ifDown) {
                    this.setState({
                        loading: false
                    })
                    let searchInfoArr = [];
                    let cyberbankExcelUrlAfter = '';
                    let searchInfoB = this.state.searchInfo;
                    let operatePermission = '';
                    let superadmin_cs = sessionStorage.getItem('superadmin_cs');
                    if (superadmin_cs !== 'true') {
                        if (this.state.childrenMenuList.indexOf('cbm:edit') > -1) {
                            operatePermission = '1'
                        } else if (this.state.childrenMenuList.indexOf('cbm:aduit') > -1) {
                            operatePermission = '2'
                        } else if (this.state.childrenMenuList.indexOf('cbm:bc') > -1) {
                            operatePermission = '3'
                        }
                    }
                    searchInfoB['operatePermission'] = operatePermission;
                    for (let i in searchInfoB) {
                        if (searchInfoB[i]) {
                            searchInfoArr.push(i + '=' + searchInfoB[i]);
                        }
                    }
                    cyberbankExcelUrlAfter = searchInfoArr.join('&');
                    console.log(searchInfoB)
                    console.log(cyberbankDownLoadExcel + '?' + cyberbankExcelUrlAfter)
                    if (ifDownPdf) {
                        this.cyberbankCheckPdfDo(cyberbankExcelUrlAfter)
                    } else if (ifDownTAE) {
                        DownloadFile(transferAccountExcel + '?' + cyberbankExcelUrlAfter);
                    } else {
                        DownloadFile(cyberbankDownLoadExcel + '?' + cyberbankExcelUrlAfter);
                    }
                    
                    // this.downloadFile(this.state.searchInfo);
                } else {
                    this.setState({
                        pagination: {total: 1, pageSize: 10, current: 1},
                        pageInfo: {pageNum: '1', pageSize: '10'},
                        tableListDataSource: []
                    },function(){
                        
                        this.loadlists({...this.state.pageInfo,queryParams: {...this.state.searchInfo}})
                    })
                }
                
            })
        });
    }
    cyberbankCheckPdfDo = async (cyberbankExcelUrlAfter) => { //请求数据函数
        try {
            const result = await HTTP.cyberbankCheckPdf({
                ...this.state.searchInfo
            });
            console.log('result', result);
            DownloadFile(cyberbankPdf + '?' + cyberbankExcelUrlAfter);
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }

    loadlists = async (data) => { //请求数据函数
        console.log(data)
        let queryParams = data.queryParams ? data.queryParams : {};
        let operatePermission = '';
        let superadmin_cs = sessionStorage.getItem('superadmin_cs');
        if (superadmin_cs !== 'true') {
            if (this.state.childrenMenuList.indexOf('cbm:edit') > -1) {
                operatePermission = '1'
            } else if (this.state.childrenMenuList.indexOf('cbm:aduit') > -1) {
                operatePermission = '2'
            } else if (this.state.childrenMenuList.indexOf('cbm:bc') > -1) {
                operatePermission = '3'
            }
        }
        queryParams['operatePermission'] = operatePermission;
        
        try {
            const result = await HTTP.cyberbankManage({
                ...data,
                queryParams
            });
            console.log('result', result);
            this.setState({
                loading: false,
                tableListDataSource: result.data.rows,
                pagination: {...this.state.pagination, total: result.data.total},
            },function(){
                console.log('bankAccountShow1',document.querySelector('.bank_account'))
                if (document.querySelector('.bank_account')) {
                    for (let item of document.getElementsByClassName('bank_account')) {
                        item.addEventListener("copy", this.copy);
                        item.addEventListener("paste", this.paste);
                    }
                }
            })
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }
    handleFormReset = () => { //重置查询
        this.setState({
            loading: true
        })
        this.props.form.resetFields()
        this.setState({
            pageInfo: {pageNum: '1', pageSize: '10'},
            pagination: {total: 1, pageSize: 10, current: 1},
            ysFlagValue: '',
            searchInfo: {},
            tableListDataSource: [],
        }, function () {
            this.loadlists(this.state.pageInfo)
        })
    }

    addTableRow = (id,status,ifSupplement) => { //新建
        sessionStorage.setItem('_searchInfo',JSON.stringify(this.state.searchInfo));
        sessionStorage.setItem('_pagination',JSON.stringify(this.state.pagination))
        sessionStorage.setItem('_pageInfo',JSON.stringify(this.state.pageInfo))
        ifSupplement = ifSupplement ? ifSupplement : '1';
        this.props.history.push('/project/cyberbank-manage/detail/'+ id +'/' + status +'/' + ifSupplement)
    }

    acceptanceScreening = (e) => {
        this.setState({
            ysFlagValue: e.target.value,
            loading: true,
            searchInfo: {...this.state.searchInfo, handleFlag: e.target.value},
            pagination: {total: 1, pageSize: 10, current: 1},
            pageInfo: {pageNum: '1', pageSize: '10'},
            tableListDataSource: [],
        }, function () {
            this.loadlists({...this.state.pageInfo,queryParams: {...this.state.searchInfo}})
        })
    }   

    tableTitle = () => {
        return '网银验收台账'
    }

    showModal = () => {
        this.setState({
          visible: true,
          ifUpload: true
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            loadingUpload: true
        },function(){
            if (this.state.ifUpload) {
                this._upload();
            } else {
                if (this.state.companyBaseExcelInfo['total_count'] === 0) {
                    message.warning('未读取到任何数据，请查验！');
                    this.setState({
                        loadingUpload: false,
                    })
                    return;
                }
                if (this.state.companyBaseExcelInfo['before_operate_count'] > 0 || this.state.companyBaseExcelInfo['is_exist_system_count'] > 0 || this.state.companyBaseExcelInfo['validate_fail_count'] > 0 || this.state.companyBaseExcelInfo['repeat_data_count'] > 0) {
                    message.warning('存在问题数据，提交失败！');
                    this.setState({
                        loadingUpload: false,
                    })
                    return;
                }
                
                this._submit();
            }
        })
        // this.setState({
        //   visible: false,
        // });
    }

    _submit = async () => { //导入-提交
        try {
            const result = await HTTP.cyberbankManageImportSub({
                importId: this.state.companyBaseExcelInfo['importId']
            });
            console.log('result', result);
            message.success('提交成功!');
            this.setState({
                loadingUpload: false,
            })
            this.handleCancel();
            this.handleFormReset();
        } catch (e) {
            this.setState({
                loadingUpload: false
            })
        }
    }

    _upload = async () => { //导入-上传
        if (this.state.fileList.length < 1) {
            message.warning('请先选择文件!');
            this.setState({
                loadingUpload: false
            })
            return;
        }
        try {
            const result = await HTTP.cyberbankManageImportExcel({
                file: this.state.fileList[0]
            });
            console.log('result', result);
            message.success('上传成功!');
            this.setState({
                companyBaseExcelInfo: result.data,
                loadingUpload: false,
                ifUpload: false,
            })
        } catch (e) {
            this.setState({
                loadingUpload: false
            })
        }
    }
    
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            fileList: [],
            visible: false
        });
    }
    
    beforeUpload = (file) => {
        let fileListB = [];
        fileListB.push(file);
        this.setState({
            fileList: fileListB,
            ifUpload: true
        },function(){
            console.log('fileList',this.state.fileList)
        })
        return false;
    };

    _downloadTemplate = () => { //下载导入模板
        DownloadFile(cMDownloadTemplate);
    }
    
    render() {
        const { companyBaseExcelInfo, searchArr, searchInfo, ysFlagValue } = this.state;
        return (
            <div className="table-list">
                <Card bordered={false}>
                        <Form onSubmit={this.handleSearch} layout="inline" className="ant-search-form ant-search-form1">
                            <FormSet ColMd={8} ColsM={8} form={this.props.form} searchArr={searchArr} defaultValues={searchInfo ? searchInfo : {}}/>
                            <Row>
                                <Col xl={24} lg={24}>
                                    <Button htmlType="submit" type="primary">查询</Button>
                                    <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
                                    <Button style={{marginLeft: 8}} onClick={this.handleDownload}>验收下载</Button>
                                    <Button style={{marginLeft: 8}} onClick={this.handleDownloadPdf}>编号打印</Button>
                                    <Button style={{marginLeft: 8}} onClick={this.handleDownloadTAE}>转账下载</Button>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col xl={12} lg={12}>
                                    <Radio.Group value={ysFlagValue} buttonStyle="solid" onChange={this.acceptanceScreening}>
                                        <Radio.Button value="">全部</Radio.Button>
                                        <Radio.Button value="1">待处理</Radio.Button>
                                    </Radio.Group>
                                </Col>
                                <Col xl={12} lg={12} style={{textAlign: 'right'}}>
                                    <span style={{marginRight: '15px'}}>
                                        <Button onClick={this.showModal} type="primary"><span>导入</span></Button>
                                    </span>
                                </Col>
                            </Row>
                        </Form>
                        <LocaleProvider locale={zh_CN}>
                            <Table  scroll={{ x: 1800 }} title={this.tableTitle} bordered rowKey="companyId" columns={this.state.columns}
                                dataSource={this.state.tableListDataSource} loading={this.state.loading}
                                onChange={this.pageJump} pagination={{showQuickJumper: true,...this.state.pagination}}/>
                        </LocaleProvider>
                        <Modal
                            wrapClassName = "download_template"
                            title="导入"
                            destroyOnClose={true}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            cancelText="取消"
                            okText= {this.state.ifUpload ? '上传': '提交'}
                            width={'520px'}
                            >
                            <Spin spinning={this.state.loadingUpload}>
                                <div>
                                    <Button onClick={this._downloadTemplate} type="primary">下载导入模板</Button>
                                    <span style={{float: 'right'}}>
                                        <Upload 
                                            name= 'file'
                                            fileList={this.state.fileList}
                                            beforeUpload={this.beforeUpload}
                                        >
                                            <Button>
                                            <Icon type="upload" /> 选择文件
                                            </Button>
                                        </Upload>
                                    </span>
                                </div>
                                <Card  style={{ minHeight: 200, marginTop: 15 }}>
                                    {
                                        !this.state.ifUpload && <div>
                                            <p>本次读取{companyBaseExcelInfo['total_count']}条数据记录。</p>
                                            <p>验证通过记录数：{companyBaseExcelInfo['validate_success_count']}条。</p>
                                            <p className="red-style">验证未通过记录数：{companyBaseExcelInfo['validate_fail_count']}条。</p>
                                            <p>【{companyBaseExcelInfo['problem_data']}】</p>
                                            <p className="red-style">存在重复公司名称：{companyBaseExcelInfo['repeat_data_count']}条。</p>
                                            <p>【{companyBaseExcelInfo['repeat_data']}】</p>
                                            <p className="red-style">不存在于系统的公司名称：{companyBaseExcelInfo['is_exist_system_count']}条。</p>
                                            <p>【{companyBaseExcelInfo['is_exist_system']}】</p>
                                            <p className="red-style">前置操作未完善【账户】：{companyBaseExcelInfo['before_operate_count']}条。</p>
                                            <p>【{companyBaseExcelInfo['before_operate']}】</p>
                                        </div>
                                    }
                                </Card>
                                
                            </Spin>
                        </Modal>
                </Card>
            </div>
        )
    }
}

const CyberbankManage = Form.create()(CyberbankManageForm)
export default CyberbankManage
