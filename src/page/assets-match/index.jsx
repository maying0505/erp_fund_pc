import React from 'react';
import { LocaleProvider, Row, Col, Table, Card, Form, Button, Divider, Icon } from 'antd';
import FormSet from 'common/FormSet';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as HTTP from 'units/Axios';
import { companyExcelUrl } from 'units/Axios/http';
import DownloadFile from 'common/download';

// const _tableWidth = 100/15+'%';
const _tableWidth = '';
const columnsAlign = 'center';

class AssetsMatchManageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchArr: [
                {
                    label: '匹配ID',
                    child: [
                        {
                            fieldName: 'asmId',
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
                    label: '资产编号',
                    child: [
                        {
                            fieldName: 'amNum',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '抵押权人',
                    child: [
                        {
                            fieldName: 'muName',
                            value:'',
                            style: 'input'
                        }
                    ],
                },       
                {
                    label: '贷款类别',
                    child: [
                        {
                            fieldName: 'ltId',
                            value: '',
                            style: 'loanType',
                        }
                    ],
                },
                {
                    label: '标的状态',
                    child: [
                        {
                            fieldName: 'sdStatus',
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
            pageInfo: {pageNum: '1', pageSize: '10'},
            searchInfo: {},
            pagination: {total: 1, pageSize: 10, current: 1},
            columns:[
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
                    title: '档案编号',
                    align: columnsAlign,
                    dataIndex: 'archivesId',
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
                    title: '资产编号',
                    align: columnsAlign,
                    dataIndex: 'amNum',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '抵押权人',
                    align: columnsAlign,
                    dataIndex: 'muName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '上线金额',
                    align: columnsAlign,
                    dataIndex: 'onlineAmount',
                    width: _tableWidth,
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '贷款类别',
                    align: columnsAlign,
                    dataIndex: 'name',
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
            ],
        }
    }

    componentDidMount() { //预加载数据
        console.log('this.props.history',this.props.history)
        this.loadlists(this.state.pageInfo) //获取数据列表
        
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

    handleSearch = (e,ifDown) => { //查询请求
        this.setState({
            loading: true
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.matchDate) {
                values.startDate = values.matchDate[0] ?  values.matchDate[0].format('YYYY-MM-DD') : '';
                values.endDate = values.matchDate[1] ?  values.matchDate[1].format('YYYY-MM-DD') : '';
            }
            values.matchDate = undefined;
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
            const result = await HTTP.assetsMatchList({
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

    addTableRow = (id,status) => { //新建
        this.props.history.push('/project/assets-match/detail')
    }

    tableTitle = () => {
        return '资产匹配表'
    }
    
    render() {
        const { searchArr, childrenMenuList } = this.state;
        return (
            <div className="table-list">
                <Card bordered={false}>
                        <Form onSubmit={this.handleSearch} layout="inline" className="ant-search-form ant-search-form1">
                            <FormSet ColMd={8} ColsM={8} form={this.props.form} searchArr={searchArr}/>
                            <Row>
                                <Col xl={24} lg={24}>
                                    <Button htmlType="submit" type="primary">查询</Button>
                                    <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                {childrenMenuList.indexOf('amm:add') > -1 && <Col xl={24} lg={24}>
                                <span style={{float: 'right'}}>
                                    <Button onClick={this.addTableRow.bind(this,-1,0)} type="primary"><Icon type="plus" /><span>新增</span></Button>
                                </span>
                                </Col>}
                            </Row>
                        </Form>
                        <LocaleProvider locale={zh_CN}>
                            <Table  title={this.tableTitle} bordered rowKey="asmId" columns={this.state.columns}
                                dataSource={this.state.tableListDataSource} loading={this.state.loading}
                                onChange={this.pageJump} pagination={{showQuickJumper: true,...this.state.pagination}}/>
                        </LocaleProvider>
                </Card>
            </div>
        )
    }
}

const AssetsMatchManage = Form.create()(AssetsMatchManageForm)
export default AssetsMatchManage
