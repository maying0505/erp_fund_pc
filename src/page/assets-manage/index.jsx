import React from 'react';
import { LocaleProvider, Row, Col, Table, Card, Form, Button, Divider, Icon } from 'antd';
import FormSet from 'common/FormSet';
import * as HTTP from 'units/Axios';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { companyExcelUrl } from 'units/Axios/http';
import DownloadFile from 'common/download';

// const _tableWidth = 100/15+'%';
const _tableWidth = '';
const columnsAlign = 'center';

class AssetsManageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchArr: [
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
                    label: '房产产权人',
                    child: [
                        {
                            fieldName: 'housePropertyOwner',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '匹配标识',
                    child: [
                        {
                            fieldName: 'matchFlag',
                            value: [
                                {
                                    value: '1',
                                    text: '公司-1',
                                },
                                {
                                    value: '2',
                                    text: '公司-2',
                                },
                                {
                                    value: '3',
                                    text: '公司-3',
                                },
                            ],
                            style: 'select',
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
                    label: '录入状态',
                    child: [
                        {
                            fieldName: 'operatorStatus',
                            value: [
                                {
                                    value: '1',
                                    text: '待录入',
                                },
                                {
                                    value: '2',
                                    text: '已录入',
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
                    title: '资产编号',
                    align: columnsAlign,
                    dataIndex: 'amNum',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '评估金额总价',
                    align: columnsAlign,
                    dataIndex: 'assessTotalPrice',
                    width: _tableWidth,
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '资产匹配总价',
                    align: columnsAlign,
                    dataIndex: 'amMatchTotalPrice',
                    width: _tableWidth,
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '房产产权人',
                    align: columnsAlign,
                    dataIndex: 'housePropertyOwner',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '房产证编号',
                    align: columnsAlign,
                    dataIndex: 'housePropertyNum',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '匹配标识',
                    align: columnsAlign,
                    dataIndex: 'matchFlag',
                    width: _tableWidth,
                    render: (text) => text ? this.matchFlag(text) : '--'
                },
                {
                    title: '是否停用',
                    align: columnsAlign,
                    dataIndex: 'stopFlag',
                    width: _tableWidth,
                    render: (text) => text ? text === '1' ? <span className="red-style">是</span> : '否' : '--'
                },
                {
                    title: '录入状态',
                    align: columnsAlign,
                    dataIndex: 'operatorStatus',
                    width: _tableWidth,
                    render: (text) => text ? text === '1' ? <span className="red-style">待录入</span> : '已录入' : '--'
                },
                {
                    title: '操作',
                    align: columnsAlign,
                    dataIndex: 'amId',
                    render: (text,record) => this.operationDo(text,record)
                },
            ],
        }
    }

    componentDidMount() { //预加载数据
        this.loadlists({...this.state.pageInfo, queryParams: {...this.state.searchInfo}}) //获取数据列表
        sessionStorage.removeItem('_ifBack');
    }

    matchFlag = (text) => {
        let val = '';
        switch (text) {
            case '1': val = '公司-1';break;
            case '2': val = '公司-2';break;
            case '3': val = '公司-3';break;
            default: val = '--';
        }
        return val;
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
        if (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('am:edit') > -1)) {
            editShow = true;
        }
        return <span>
                    {editShow && <Button size="small" onClick={this.addTableRow.bind(this,text,1)}>编辑</Button>}
                    {editShow && <br></br>}
                    {this.state.childrenMenuList.indexOf('am:query') > -1 && <Button className="delete_btn" size="small" onClick={this.addTableRow.bind(this,text,2)}>查看</Button>}
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

    handleSearch = (e,ifDown) => { //查询请求
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
            const result = await HTTP.assetsManage({
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
        this.props.history.push('/project/assets-manage/detail/'+ id +'/' + status)
    }

    tableTitle = () => {
        return '资产信息表'
    }
    
    render() {
        const { searchArr, childrenMenuList, searchInfo } = this.state;
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
                                {childrenMenuList.indexOf('am:add') > -1 && <Col xl={24} lg={24}>
                                <span style={{float: 'right'}}>
                                    <Button onClick={this.addTableRow.bind(this,-1,0)} type="primary"><Icon type="plus" /><span>新增</span></Button>
                                </span>
                                </Col>}
                            </Row>
                        </Form>
                        <LocaleProvider locale={zh_CN}>
                        <Table  title={this.tableTitle} bordered rowKey="amId" columns={this.state.columns}
                                dataSource={this.state.tableListDataSource} loading={this.state.loading}
                                onChange={this.pageJump} pagination={{showQuickJumper: true,...this.state.pagination}}/>
                        </LocaleProvider>
                </Card>
            </div>
        )
    }
}

const AssetsManage = Form.create()(AssetsManageForm)
export default AssetsManage
