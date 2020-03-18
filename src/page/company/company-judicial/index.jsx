import React from 'react';
import { LocaleProvider, Row, Col, Table, Card, Form, Button, Divider, Radio } from 'antd';
import FormSet from 'common/FormSet';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as HTTP from 'units/Axios';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
// const _tableWidth = 100/15+'%';
const _tableWidth = '';
const columnsAlign = 'center';

class CompanyJudicial extends React.Component {
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
                    label: '司法结果',
                    child: [
                        {
                            fieldName: 'judicialResult',
                            value: [
                                {
                                    value: '1',
                                    text: '通过',
                                },
                                {
                                    value: '2',
                                    text: '拒绝',
                                }
                            ],
                            style: 'select'
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
                    title: '收件日期',
                    align: columnsAlign,
                    dataIndex: 'zlsjDate',
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
                    title: '工商信息对照',
                    align: columnsAlign,
                    dataIndex: 'icContrast',
                    width: _tableWidth,
                    render: (text) => text ? text === '1' ? '一致' : '不一致' : '--'
                },
                {
                    title: '公司司法情况',
                    align: columnsAlign,
                    dataIndex: 'companyJudicial',
                    width: _tableWidth,
                    render: (text) =>  text ? text === '1' ? '有司法' : '无司法' : '--'
                },
                {
                    title: '法人姓名',
                    align: columnsAlign,
                    dataIndex: 'legalName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '法人司法情况',
                    align: columnsAlign,
                    dataIndex: 'legalJudicial',
                    width: _tableWidth,
                    render: (text) =>  text ? text === '1' ? '有司法' : '无司法' : '--'
                },
                {
                    title: '股东姓名',
                    align: columnsAlign,
                    dataIndex: 'partnerFirstName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '股东司法情况',
                    align: columnsAlign,
                    dataIndex: 'partnerFirstJudicial',
                    width: _tableWidth,
                    render: (text) =>  text ? text === '1' ? '有司法' : '无司法' : '--'
                },
                {
                    title: '司法结果',
                    align: columnsAlign,
                    dataIndex: 'judicialResult',
                    width: _tableWidth,
                    render: (text) => text ? text === '1' ? '通过' : '拒绝' : '--'
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
        if (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('cj:edit') > -1 && record.judicialResult !== '1' && record.cyberBankStatus !== '2')) {
            editShow = true;
        }
        return <span>
                    {editShow && <Button size="small" onClick={this.addTableRow.bind(this,text,1)}>编辑</Button>}
                    {editShow && <br></br>}
                    {this.state.childrenMenuList.indexOf('cj:query') > -1 && <Button className="delete_btn" size="small" onClick={this.addTableRow.bind(this,text,2)}>查看</Button>}
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
            if (values.sjDate) {
                values.zlsjStartDate = values.sjDate[0] ?  values.sjDate[0].format('YYYY-MM-DD') : '';
                values.zlsjEndDate = values.sjDate[1] ?  values.sjDate[1].format('YYYY-MM-DD') : '';
            }
            values.sjDate = undefined;
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
            const result = await HTTP.companyJudicial({
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
        this.props.history.push('/project/company-judicial/detail/'+ id +'/' + status)
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
        return '司法信息表'
    }
    
    render() {
        const { searchArr, searchInfo, ysFlagValue } = this.state;
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
                                <Col xl={24} lg={24}>
                                    <Radio.Group value={ysFlagValue} buttonStyle="solid" onChange={this.acceptanceScreening}>
                                        <Radio.Button value="">全部</Radio.Button>
                                        <Radio.Button value="1">待处理</Radio.Button>
                                        <Radio.Button value="2">已处理</Radio.Button>
                                    </Radio.Group>
                                </Col>
                            </Row>
                        </Form>
                        <LocaleProvider locale={zh_CN}>
                            <Table title={this.tableTitle} bordered rowKey="companyId" columns={this.state.columns}
                                dataSource={this.state.tableListDataSource} loading={this.state.loading}
                                onChange={this.pageJump} pagination={{showQuickJumper: true,...this.state.pagination}}/>
                        </LocaleProvider>
                        
                </Card>
            </div>
        )
    }
}

const CompanyBase = Form.create()(CompanyJudicial)
export default CompanyBase
