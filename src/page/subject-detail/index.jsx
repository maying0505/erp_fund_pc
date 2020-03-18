import React from 'react';
import { Row, Col, Table, Card, Form, Button, LocaleProvider } from 'antd';
import FormSet from 'common/FormSet';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as HTTP from 'units/Axios';
import { subjectDetailExcel } from 'units/Axios/http';
import DownloadFile from 'common/download';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
// const _tableWidth = 100/15+'%';
const _tableWidth = '';
const columnsAlign = 'center';

class SubjectDetailManageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchArr: [
                {
                    label: '标的ID',
                    child: [
                        {
                            fieldName: 'subjectId',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '匹配ID',
                    child: [
                        {
                            fieldName: 'matchId',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '匹配日期',
                    child: [
                        {
                            fieldName: 'matchDate',
                            value:'',
                            style: 'dataRange',
                            format: 'YYYY-MM-DD',
                        }
                    ],
                },
                {
                    label: '贷款类别',
                    child: [
                        {
                            fieldName: 'loanTypeId',
                            value: '',
                            style: 'loanType',
                        }
                    ],
                },
                {
                    label: '档案编号',
                    child: [
                        {
                            fieldName: 'archivesId',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    label: '所属机构',
                    child: [
                        {
                            fieldName: 'organId',
                            value: '',
                            style: 'organ',
                        }
                    ],
                },
                {
                    label: '真实姓名',
                    child: [
                        {
                            fieldName: 'companyName',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    label: '身份证号/工商注册号',
                    child: [
                        {
                            fieldName: 'uscc',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    label: '贷款期限',
                    child: [
                        {
                            fieldName: 'loanTermId',
                            value: '',
                            style: 'loanTerm',
                        }
                    ],
                },
                {
                    label: '预计到期日',
                    child: [
                        {
                            fieldName: 'expectDate',
                            value:'',
                            style: 'dataRange',
                            format: 'YYYY-MM-DD',
                        }
                    ],
                },
                {
                    label: '实际到期日',
                    child: [
                        {
                            fieldName: 'actualDate',
                            value:'',
                            style: 'dataRange',
                            format: 'YYYY-MM-DD',
                        }
                    ],
                },
                {
                    label: '标的状态',
                    child: [
                        {
                            fieldName: 'status',
                            value: [
                                {
                                    value: '1',
                                    text: '录标中',
                                },
                                {
                                    value: '2',
                                    text: '已上线',
                                },
                                {
                                    value: '3',
                                    text: '已还款',
                                },
                                {
                                    value: '4',
                                    text: '已作废',
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
            pageInfo: sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_pageInfo') ? JSON.parse(sessionStorage.getItem('_pageInfo')) : {pageNum: '1', pageSize: '10'},
            searchInfo: sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_searchInfo') ? JSON.parse(sessionStorage.getItem('_searchInfo')) : {},
            pagination: sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_pagination') ? JSON.parse(sessionStorage.getItem('_pagination')) : {total: 1, pageSize: 10, current: 1},
            columns:[
                {
                    title: '标的ID',
                    align: columnsAlign,
                    dataIndex: 'subjectId',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '匹配ID',
                    align: columnsAlign,
                    dataIndex: 'asmId',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '匹配日期',
                    align: columnsAlign,
                    dataIndex: 'amDate',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '贷款类别',
                    align: columnsAlign,
                    dataIndex: 'loanTypeName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '档案编号',
                    align: columnsAlign,
                    dataIndex: 'archivesId',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '所属机构',
                    align: columnsAlign,
                    dataIndex: 'organName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '真实姓名',
                    align: columnsAlign,
                    dataIndex: 'companyName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '身份证号/工商注册号',
                    align: columnsAlign,
                    dataIndex: 'uscc',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '贷款期限',
                    align: columnsAlign,
                    dataIndex: 'loanTermName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '预计到期日',
                    align: columnsAlign,
                    dataIndex: 'expectDate',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '实际到期日',
                    align: columnsAlign,
                    dataIndex: 'actualDate',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '标的状态',
                    align: columnsAlign,
                    dataIndex: 'status',
                    width: _tableWidth,
                    render: (text) => text ? this.sdStatus(text) : '--'
                },
                {
                    title: '操作',
                    align: columnsAlign,
                    dataIndex: 'sdId',
                    render: (text,record) => this.operationDo(text,record)
                },
            ],
        }
    }

    componentDidMount() { //预加载数据
        let searchInfoB = this.state.searchInfo;
        if (sessionStorage.getItem('_ifBack') === '0'){
            searchInfoB = sessionStorage.getItem('_ifBack') === '0' && sessionStorage.getItem('_searchInfo') ? JSON.parse(sessionStorage.getItem('_searchInfo')) : {};
            if (searchInfoB['matchStartDate'] && searchInfoB['matchEndDate']) {
                let matchDateB = [moment(searchInfoB['matchStartDate'], dateFormat),moment(searchInfoB['matchEndDate'], dateFormat)];
                searchInfoB['matchDate'] = matchDateB;
            }
            if (searchInfoB['expectStartDate'] && searchInfoB['expectEndDate']) {
                let expectDateB = [moment(searchInfoB['expectStartDate'], dateFormat),moment(searchInfoB['expectEndDate'], dateFormat)];
                searchInfoB['expectDate'] = expectDateB;
            }
            if (searchInfoB['actualStartDate'] && searchInfoB['actualEndDate']) {
                let actualDateB = [moment(searchInfoB['actualStartDate'], dateFormat),moment(searchInfoB['actualEndDate'], dateFormat)];
                searchInfoB['actualDate'] = actualDateB;
            }
        }
        this.setState({
            searchInfo: searchInfoB
        },function(){
            this.loadlists({...this.state.pageInfo, queryParams: {...this.state.searchInfo}}) //获取数据列表
        })
        sessionStorage.removeItem('_ifBack');
    }

    sdStatus = (text) => {
        let textShow = '';
        switch (text) {
            case '1': textShow = '录标中';break;
            case '2': textShow = '已上线';break;
            case '3': textShow = '已还款';break;
            case '4': textShow = '已作废';break;
            default: textShow = '--';
        }
        return textShow;
    }
    operationDo = (text,record) => {
        let superadmin_cs = sessionStorage.getItem('superadmin_cs');
        let editShow = false;
        if (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('sdm:edit') > -1 && record.status !== '3' && record.status !== '4')) {
            editShow = true;
        }
        return <span>
                    {editShow && <Button size="small" onClick={this.addTableRow.bind(this,text,record.loanTypeDesc,1)}>编辑</Button>}
                    {editShow && <br></br>}
                    {this.state.childrenMenuList.indexOf('sdm:query') > -1 && <Button className="delete_btn" size="small" onClick={this.addTableRow.bind(this,text,record.loanTypeDesc,2)}>查看</Button>}
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
            if (values.matchDate) {
                values.matchStartDate = values.matchDate[0] ?  values.matchDate[0].format('YYYY-MM-DD') : '';
                values.matchEndDate = values.matchDate[1] ?  values.matchDate[1].format('YYYY-MM-DD') : '';
            }
            if (values.expectDate) {
                values.expectStartDate = values.expectDate[0] ?  values.expectDate[0].format('YYYY-MM-DD') : '';
                values.expectEndDate = values.expectDate[1] ?  values.expectDate[1].format('YYYY-MM-DD') : '';
            }
            if (values.actualDate) {
                values.actualStartDate = values.actualDate[0] ?  values.actualDate[0].format('YYYY-MM-DD') : '';
                values.actualEndDate = values.actualDate[1] ?  values.actualDate[1].format('YYYY-MM-DD') : '';
            }
            values.matchDate = undefined;
            values.expectDate = undefined;
            values.actualDate = undefined;
            this.setState({
                searchInfo: {...this.state.searchInfo, ...values}
            }, function () {
                console.log(this.state.searchInfo)
                if (ifDown) {
                    this.setState({
                        loading: false
                    })
                    let searchInfoArr = [];
                    let subjectDetailExcelAfter = '';
                    for (let i in this.state.searchInfo) {
                        if (this.state.searchInfo[i]) {
                            searchInfoArr.push(i + '=' + this.state.searchInfo[i]);
                        }
                    }
                    subjectDetailExcelAfter = searchInfoArr.join('&');
                    console.log(subjectDetailExcel + '?' + subjectDetailExcelAfter)
                    DownloadFile(subjectDetailExcel + '?' + subjectDetailExcelAfter);
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
            const result = await HTTP.subjectDetail({
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
            pagination: {total: 1, pageSize: 10, current: 1},
            searchInfo: {},
            tableListDataSource: [],
        }, function () {
            this.loadlists(this.state.pageInfo)
        })
    }

    addTableRow = (id,loanTypeDesc,status) => { //新建
        sessionStorage.setItem('_searchInfo',JSON.stringify(this.state.searchInfo));
        sessionStorage.setItem('_pagination',JSON.stringify(this.state.pagination))
        sessionStorage.setItem('_pageInfo',JSON.stringify(this.state.pageInfo))
        this.props.history.push('/project/subject-detail/detail/'+ id +'/' + status + '/'+ loanTypeDesc);
    }

    tableTitle = () => {
        return '标的明细表'
    }
    
    render() {
        const { searchArr, searchInfo } = this.state;
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
                        </Form>
                        <LocaleProvider locale={zh_CN}>
                            <Table  title={this.tableTitle} bordered rowKey="sdId" columns={this.state.columns}
                                dataSource={this.state.tableListDataSource} loading={this.state.loading}
                                onChange={this.pageJump} pagination={{showQuickJumper: true,...this.state.pagination}}/>
                        </LocaleProvider>
                </Card>
            </div>
        )
    }
}

const SubjectDetailManage = Form.create()(SubjectDetailManageForm)
export default SubjectDetailManage
