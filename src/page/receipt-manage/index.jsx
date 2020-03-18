import React from 'react';
import { LocaleProvider, Icon, Row, Col, Table, Card, Form, Button, Popconfirm, message, Divider } from 'antd';
import FormSet from 'common/FormSet';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import ReceiptDetail from './detail/receipt-detail';
import * as HTTP from 'units/Axios';
// const _tableWidth = 100/15+'%';
const _tableWidth = '';
const columnsAlign = 'center';

class ReceiptManageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detailId: -1,
            ifEdit: 0,
            searchArr: [
                {
                    label: '渠道',
                    child: [
                        {
                            fieldName: 'qd',
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
            ],
            childrenMenuList: sessionStorage.getItem('childrenMenuList') ? JSON.parse(sessionStorage.getItem('childrenMenuList')) : [],
            detailVisible: false,
            loading: true,
            tableListDataSource: [],
            pageInfo: {pageNum: '1', pageSize: '10'},
            searchInfo: {},
            pagination: {total: 1, pageSize: 10, current: 1},
            columns:[
                {
                    title: '渠道',
                    align: columnsAlign,
                    dataIndex: 'qd',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '收件日期',
                    align: columnsAlign,
                    dataIndex: 'sjDate',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '收件数量',
                    align: columnsAlign,
                    dataIndex: 'sjNum',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '项目摘要',
                    align: columnsAlign,
                    dataIndex: 'xmzy',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '付款金额',
                    align: columnsAlign,
                    dataIndex: 'fkje',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '付款日期',
                    align: columnsAlign,
                    dataIndex: 'fkDate',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '验收有效数量',
                    align: columnsAlign,
                    dataIndex: 'ysyxNum',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '付款备注',
                    align: columnsAlign,
                    dataIndex: 'fkRemark',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '备注',
                    align: columnsAlign,
                    dataIndex: 'remark',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '操作',
                    align: columnsAlign,
                    dataIndex: 'id',
                    render: (text,record) => this.operationDo(text,record)
                },
            ],
        }
    }

    componentDidMount() { //预加载数据
        console.log('this.props.history',this.props.history)
        this.loadlists(this.state.pageInfo) //获取数据列表
    }

    operationDo = (text,record) => {
        let superadmin_cs = sessionStorage.getItem('superadmin_cs');
        let editShow = false;
        let delShow = false;
        if (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('rm:edit') > -1)) {
            editShow = true;
        }
        if (superadmin_cs === 'true' || (this.state.childrenMenuList.indexOf('rm:del') > -1)) {
            delShow = true;
        }
        return <span>
                    {editShow && <Button size="small" onClick={this.addTableRow.bind(this,text,1)}>编辑</Button>}
                    {editShow && <br></br>}
                    {this.state.childrenMenuList.indexOf('rm:query') > -1 && <Button className="delete_btn" size="small" onClick={this.addTableRow.bind(this,text,2)}>查看</Button>}
                    {this.state.childrenMenuList.indexOf('rm:query') > -1 && <br></br>}
                    {delShow && <Popconfirm title="确定删除?" onConfirm={this.confirmDelete.bind(this,text)} onCancel={this.cancelDelete} okText="确定" cancelText="取消">
                        <Button className="delete_btn" type="danger" size="small">删除</Button>
                    </Popconfirm>}
                </span>
    }

    confirmDelete = async (id) => { //请求数据函数
        try {
            const result = await HTTP.receiptManageDel({},'/'+id);
            console.log('result', result);
            message.success('删除成功！');
            this.handleFormReset();
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }
      
    cancelDelete(e) {
        console.log(e);
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
                values.startTime = values.sjDate[0] ?  values.sjDate[0].format('YYYY-MM-DD') : '';
                values.endTime = values.sjDate[1] ?  values.sjDate[1].format('YYYY-MM-DD') : '';
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
            const result = await HTTP.receiptManage({
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

    addTableRow = (id,ifEdit) => { //新建
            this.setState({
                ifEdit: ifEdit,
                detailId: id,
                detailVisible: true
            },function(){
                console.log(id,ifEdit)
            })
    }

    detailHandleCancel = (e) => {
        this.setState({
            detailVisible: false,
        },function(){
            if (e) {
                this.handleFormReset();
            }
        });
    }

    tableTitle = () => {
        return '收件明细表'
    }

    onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }
    
    render() {
        const { searchArr, childrenMenuList, detailId, ifEdit } = this.state;
        return (
            <div className="table-list">
                <Card bordered={false}>
                        <Form onSubmit={this.handleSearch} layout="inline" className="ant-search-form">
                            <FormSet form={this.props.form} searchArr={searchArr}/>
                            <Row>
                                <Col xl={24} lg={24}>
                                    <Button htmlType="submit" type="primary">查询</Button>
                                    <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
                                </Col>
                            
                            </Row>
                            <Divider />
                            <Row>
                                {childrenMenuList.indexOf('rm:add') > -1 && <Col xl={24} lg={24}>
                                <span style={{float: 'right'}}>
                                    <Button onClick={this.addTableRow.bind(this,-1,0)} type="primary"><Icon type="plus" /><span>新增</span></Button>
                                </span>
                                </Col>}
                            </Row>
                        </Form>
                        <LocaleProvider locale={zh_CN}>
                            <Table title={this.tableTitle} bordered rowKey="id" columns={this.state.columns}
                                dataSource={this.state.tableListDataSource} loading={this.state.loading}
                                onChange={this.pageJump} pagination={{showQuickJumper: true,...this.state.pagination}}/>
                        </LocaleProvider>
                </Card>
                {this.state.detailVisible && <ReceiptDetail ifEdit={ifEdit} id={detailId} detailVisible={this.state.detailVisible}  detailHandleCancel={this.detailHandleCancel} />}
            </div>
        )
    }
}

const ReceiptManage = Form.create()(ReceiptManageForm)
export default ReceiptManage
