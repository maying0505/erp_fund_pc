import React from 'react';
import { message, Upload, Icon, Modal, Spin, LocaleProvider, Row, Col, Table, Card, Form, Button, Divider, Radio } from 'antd';
import FormSet from 'common/FormSet';
import DownloadFile from 'common/download';
import { cIDownloadTemplate } from 'units/Axios/http';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as HTTP from 'units/Axios';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
// const _tableWidth = 100/15+'%';
const _tableWidth = '';
const columnsAlign = 'center';

class CompanyIcForm extends React.Component {
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
                    label: '统一社会信用代码',
                    child: [
                        {
                            fieldName: 'uscc',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '法人姓名',
                    child: [
                        {
                            fieldName: 'legalName',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '法人身份证号',
                    child: [
                        {
                            fieldName: 'legalCardNo',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '股东姓名',
                    child: [
                        {
                            fieldName: 'partnerFirstName',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '股东身份证号',
                    child: [
                        {
                            fieldName: 'partnerFirstCardNo',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '工商状态',
                    child: [
                        {
                            fieldName: 'icStatus',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
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
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '渠道',
                    align: columnsAlign,
                    dataIndex: 'qdSource',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '公司名称',
                    align: columnsAlign,
                    dataIndex: 'companyName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '统一社会信用代码',
                    align: columnsAlign,
                    dataIndex: 'uscc',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '注册资本',
                    align: columnsAlign,
                    dataIndex: 'registerCapital',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '法人姓名',
                    align: columnsAlign,
                    dataIndex: 'legalName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '法人身份证号',
                    align: columnsAlign,
                    dataIndex: 'legalCardNo',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '股东姓名',
                    align: columnsAlign,
                    dataIndex: 'partnerFirstName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '股东身份证号',
                    align: columnsAlign,
                    dataIndex: 'partnerFirstCardNo',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '工商状态',
                    align: columnsAlign,
                    dataIndex: 'icStatus',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '操作',
                    align: columnsAlign,
                    dataIndex: 'companyId',
                    render: (text,record) => this.operationDo(text,record)
                },
            ],
        }
    }

    componentDidMount() { //预加载数据
        let searchInfoB = this.state.searchInfo;
        if (sessionStorage.getItem('_ifBack') === '0'){
            searchInfoB = sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_searchInfo') ? JSON.parse(sessionStorage.getItem('_searchInfo')) : {};
            if (searchInfoB['zlsjStartDate'] && searchInfoB['zlsjEndDate']) {
                let sjDateB = [moment(searchInfoB['zlsjStartDate'], dateFormat),moment(searchInfoB['zlsjEndDate'], dateFormat)];
                searchInfoB['sjDate'] = sjDateB;
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

    operationDo = (text,record) => {
        let superadmin_cs = sessionStorage.getItem('superadmin_cs');
        let editShow = false;
        if (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('ci:edit') > -1 && record.cyberBankStatus !== '2')) {
            editShow = true;
        }
        return <span>
                    {editShow && <Button size="small" onClick={this.addTableRow.bind(this,text,1)}>编辑</Button>}
                    {editShow && <br></br>}
                    {this.state.childrenMenuList.indexOf('ci:query') > -1 && <Button className="delete_btn" size="small" onClick={this.addTableRow.bind(this,text,2)}>查看</Button>}
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

    handleSearch = (e) => { //查询请求
        this.setState({
            loading: true
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            this.setState({
                searchInfo: {...this.state.searchInfo, ...values},
                pagination: {total: 1, pageSize: 10, current: 1},
                pageInfo: {pageNum: '1', pageSize: '10'},
                tableListDataSource: [],
            }, function () {
                console.log(this.state.searchInfo)
                this.loadlists({...this.state.pageInfo,queryParams: {...this.state.searchInfo}})
            })
        });
    }

    loadlists = async (data) => { //请求数据函数
        console.log(data)
        try {
            const result = await HTTP.companyIc({
                ...data
            });
            console.log('result', result);
            this.setState({
                loading: false,
                tableListDataSource: result.data.rows,
                pagination: {...this.state.pagination, total: result.data.total},
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
            ysFlagValue: '',
            pagination: {total: 1, pageSize: 10, current: 1},
            searchInfo: {},
            tableListDataSource: [],
        }, function () {
            this.loadlists(this.state.pageInfo)
        })
    }

    addTableRow = (id,status) => { //新建
        sessionStorage.setItem('_searchInfo',JSON.stringify(this.state.searchInfo));
        sessionStorage.setItem('_pagination',JSON.stringify(this.state.pagination))
        sessionStorage.setItem('_pageInfo',JSON.stringify(this.state.pageInfo))
        this.props.history.push('/project/company-ic/detail/'+ id +'/' + status)
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
        return '工商信息表'
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
            const result = await HTTP.companyIcImportSub({
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
            const result = await HTTP.companyIcImportExcel({
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
        DownloadFile(cIDownloadTemplate);
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
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col xl={12} lg={12}>
                                    <Radio.Group value={ysFlagValue} buttonStyle="solid" onChange={this.acceptanceScreening}>
                                        <Radio.Button value="">全部</Radio.Button>
                                        <Radio.Button value="1">待处理</Radio.Button>
                                        <Radio.Button value="2">已处理</Radio.Button>
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
                            <Table  title={this.tableTitle} bordered rowKey="companyId" columns={this.state.columns}
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
                                            <p className="red-style">前置操作未完善【司法】：{companyBaseExcelInfo['before_operate_count']}条。</p>
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

const CompanyIc = Form.create()(CompanyIcForm)
export default CompanyIc
