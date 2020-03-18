import React from 'react';
import { LocaleProvider, Row, Col, Table, Card, Form, Button, Divider, Radio } from 'antd';
import FormSet from 'common/FormSet';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as HTTP from 'units/Axios';
import { companyExcelUrl } from 'units/Axios/http';
import DownloadFile from 'common/download';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

// const _tableWidth = 100/15+'%';
const _tableWidth = '';
const columnsAlign = 'center';

class CompanyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                    label: '收件日期',
                    child: [
                        {
                            fieldName: 'sjDate',
                            value:'',
                            style: 'dataRange',
                            format: dateFormat,
                        }
                    ],
                },
                {
                    label: '执照所在地',
                    child: [
                        {
                            fieldName: 'licenseAddress',
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
                    label: '公司状态',
                    child: [
                        {
                            fieldName: 'companyStatus',
                            value: [
                                {
                                    value: '1',
                                    text: '注册',
                                },
                                {
                                    value: '2',
                                    text: '开户',
                                },
                                {
                                    value: '3',
                                    text: '激活',
                                }
                            ],
                            style: 'select',
                        }
                    ],
                },
                {
                    label: '开户行',
                    child: [
                        {
                            fieldName: 'openingBank',
                            value:'',
                            style: 'input'
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
                                }
                            ],
                            style: 'select',
                        }
                    ],
                },
            ],
            childrenMenuList: sessionStorage.getItem('childrenMenuList') ? JSON.parse(sessionStorage.getItem('childrenMenuList')) : [],
            loading: true,
            tableListDataSource: [],
            ysFlagValue: '',
            pageInfo: sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_pageInfo') ? JSON.parse(sessionStorage.getItem('_pageInfo')) : {pageNum: '1', pageSize: '10'},
            searchInfo: {},
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
                    title: '收件日期',
                    align: columnsAlign,
                    dataIndex: 'zlsjDate',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '执照所在地',
                    align: columnsAlign,
                    dataIndex: 'licenseAddress',
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
                    title: '法人姓名',
                    align: columnsAlign,
                    dataIndex: 'legalName',
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
                    title: '公司状态',
                    align: columnsAlign,
                    dataIndex: 'companyStatus',
                    width: _tableWidth,
                    render: (text) => text ? this.companyStatusShow(text) : '--'
                },
                {
                    title: '开户行',
                    align: columnsAlign,
                    dataIndex: 'openingBank',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '银行账号',
                    align: columnsAlign,
                    dataIndex: 'bankAccount',
                    width: _tableWidth,
                    render: (text) => text ? <span className="bank_account">{this.bankAccountShow(text)}</span> : '--'
                },
                {
                    title: '黑名单标记',
                    align: columnsAlign,
                    dataIndex: 'blacklistFlag',
                    width: _tableWidth,
                    render: (text) => text ? text === '1' ? <span className="red-style">是</span> : '否' : '--'
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
            ysFlagValue: searchInfoB['ysFlag'] ? searchInfoB['ysFlag'] : ''
        },function(){
            this.loadlists({...this.state.pageInfo, queryParams: {...this.state.searchInfo}}) //获取数据列表
        })
        sessionStorage.removeItem('_ifBack');
    }

    bankAccountShow = (text) => {
        return text.replace(/(.{4})/g, "$1 ");
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
        if (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('cp:edit') > -1)) {
            editShow = true;
        }
        return <span>
                    {editShow && <Button size="small" onClick={this.addTableRow.bind(this,text,1)}>编辑</Button>}
                    {editShow && <br></br>}
                    {this.state.childrenMenuList.indexOf('cp:query') > -1 && <Button className="delete_btn" size="small" onClick={this.addTableRow.bind(this,text,2)}>查看</Button>}
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

    handleDownload = (e,ifDown) => {
        this.handleSearch(e,true);
    }

    handleSearch = (e,ifDown) => { //查询请求
        this.setState({
            loading: true
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.sjDate) {
                values.zlsjStartDate = values.sjDate[0] ?  values.sjDate[0].format(dateFormat) : '';
                values.zlsjEndDate = values.sjDate[1] ?  values.sjDate[1].format(dateFormat) : '';
            }
            values.sjDate = undefined;
            this.setState({
                searchInfo: {...this.state.searchInfo, ...values}
            }, function () {
                console.log(this.state.searchInfo)
                if (ifDown) {
                    this.setState({
                        loading: false
                    })
                    let searchInfoArr = [];
                    let companyExcelUrlAfter = '';
                    for (let i in this.state.searchInfo) {
                        if (this.state.searchInfo[i]) {
                            searchInfoArr.push(i + '=' + this.state.searchInfo[i]);
                        }
                    }
                    companyExcelUrlAfter = searchInfoArr.join('&');
                    console.log(companyExcelUrl + '?' + companyExcelUrlAfter)
                    DownloadFile(companyExcelUrl + '?' + companyExcelUrlAfter);
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

    loadlists = async (data) => { //请求数据函数
        console.log(data)
        try {
            const result = await HTTP.company({
                ...data
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

    addTableRow = (id,status) => { //新建
        sessionStorage.setItem('_searchInfo',JSON.stringify(this.state.searchInfo));
        sessionStorage.setItem('_pagination',JSON.stringify(this.state.pagination))
        sessionStorage.setItem('_pageInfo',JSON.stringify(this.state.pageInfo))
        this.props.history.push('/project/company/detail/'+ id +'/' + status)
    }

    acceptanceScreening = (e) => {
        this.setState({
            ysFlagValue: e.target.value,
            loading: true,
            searchInfo: {...this.state.searchInfo, ysFlag: e.target.value},
            pagination: {total: 1, pageSize: 10, current: 1},
            pageInfo: {pageNum: '1', pageSize: '10'},
            tableListDataSource: [],
        }, function () {
            this.loadlists({...this.state.pageInfo,queryParams: {...this.state.searchInfo}})
        })
    }   

    tableTitle = () => {
        return '公司信息表'
    }
    
    render() {
        const { searchArr, searchInfo, ysFlagValue } = this.state;
        console.log('sjDate:,',this.state.searchInfo)
        return (
            <div className="table-list">
                <Card bordered={false}>
                        <Form onSubmit={this.handleSearch} layout="inline" className="ant-search-form ant-search-form1">
                            <FormSet ColMd={8} ColsM={8} form={this.props.form} searchArr={searchArr} defaultValues={searchInfo ? searchInfo : {}}/>
                            <Row>
                                <Col xl={24} lg={24}>
                                    <Button htmlType="submit" type="primary">查询</Button>
                                    <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
                                    <Button style={{marginLeft: 8}} onClick={this.handleDownload}>下载</Button>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col xl={24} lg={24}>
                                    <Radio.Group value={ysFlagValue} buttonStyle="solid" onChange={this.acceptanceScreening}>
                                        <Radio.Button value="">全部</Radio.Button>
                                        <Radio.Button value="1">待验收</Radio.Button>
                                        <Radio.Button value="2">已验收</Radio.Button>
                                    </Radio.Group>
                                </Col>
                            </Row>
                        </Form>
                        <LocaleProvider locale={zh_CN}>
                            <Table  title={this.tableTitle} bordered rowKey="companyId" columns={this.state.columns}
                                    dataSource={this.state.tableListDataSource} loading={this.state.loading}
                                    onChange={this.pageJump} pagination={{showQuickJumper: true,...this.state.pagination}}/>
                        </LocaleProvider>
                </Card>
            </div>
        )
    }
}

const Company = Form.create()(CompanyForm)
export default Company
