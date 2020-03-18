import React from 'react';
import * as HTTP from 'units/Axios';
import FormSet from 'common/FormSet';
import DetailModuleBox from 'common/DetailModuleBox';
import LodashDebounce from 'common/debounce';
import { Spin, Table, Form, Row, Col, Button, Select, Divider, InputNumber, message, Modal } from 'antd';
import './index.less';
import addImg from 'style/img/add.png';
import deleteImg from 'style/img/shanchu.png';
const _tableWidth1 = 100/6+'%';
const _tableWidth2 = 100/5+'%';
const _tableWidth3 = 100/1+'%';
const columnsAlign = 'center';
const Option = Select.Option;

class AssetsMatchDetailForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleModal1: false,//公司匹配记录弹窗
            visibleModal2: false,//资产匹配记录弹窗
            columnsModal1: [
                {
                    title: '档案编号',
                    align: columnsAlign,
                    dataIndex: 'archivesId',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '公司名称',
                    align: columnsAlign,
                    dataIndex: 'companyName',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '匹配日期',
                    align: columnsAlign,
                    dataIndex: 'amDate',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '上线金额',
                    align: columnsAlign,
                    dataIndex: 'onlineAmount',
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '贷款期限',
                    align: columnsAlign,
                    dataIndex: 'name',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '预计到期日',
                    align: columnsAlign,
                    dataIndex: 'expectDate',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '实际到期日',
                    align: columnsAlign,
                    dataIndex: 'actualDate',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '状态',
                    align: columnsAlign,
                    dataIndex: 'status',
                    render: (text, record) => text ? this.sdStatus(text) : '--'
                },
            ],//公司匹配记录columns
            columnsModal2: [
                {
                    title: '资产编号',
                    align: columnsAlign,
                    dataIndex: 'amNum',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '资产匹配总价',
                    align: columnsAlign,
                    dataIndex: 'amMatchTotalPrice',
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '匹配日期',
                    align: columnsAlign,
                    dataIndex: 'amDate',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '上线金额',
                    align: columnsAlign,
                    dataIndex: 'onlineAmount',
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '贷款期限',
                    align: columnsAlign,
                    dataIndex: 'name',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '实际到期日',
                    align: columnsAlign,
                    dataIndex: 'actualDate',
                    render: (text) => text ? text : '--'
                },
                {
                    title: '状态',
                    align: columnsAlign,
                    dataIndex: 'status',
                    render: (text, record) => text ? this.sdStatus(text) : '--'
                },
            ],//资产匹配记录columns
            matchingRecord1: [],//公司匹配记录data
            matchingRecord2: [],//资产匹配记录data
            loadingModal1: true,//公司匹配记录表格loading
            loadingModal2: true,//资产匹配记录表格loading
            surplusAvailableArray: {},//剩余可借出json
            onlineAmountArray: [],//上线金额数组
            remnantBorrowableArray: {},//剩余可借入json
            onlineAmountJson1: {},//公司上线金额json数组
            onlineAmountJson2: {},//资产上线金额json数组
            loanType: sessionStorage.getItem('loanTypeAll') ? JSON.parse(sessionStorage.getItem('loanTypeAll')) : [],//资产类别
            matchResultLabel: [
                [
                    {
                        label: '公司名称',
                        fieldName: 'companyName'
                    },
                    {
                        label: '可借总额',
                        fieldName: 'availableAmount',
                        unit: '万'
                    },
                    {
                        label: '上线金额',
                        fieldName: 'onlineAmount',
                        unit: '万'
                    },
                    {
                        label: '剩余可借入',
                        fieldName: 'remnantBorrowable',
                        unit: '万'
                    },
                ],
                [
                    {
                        label: '资产编号',
                        fieldName: 'amNum'
                    },
                    {
                        label: '资产匹配总价',
                        fieldName: 'amMatchTotalPrice',
                        unit: '万'
                    },
                    {
                        label: '上线金额',
                        fieldName: 'onlineAmount1',
                        unit: '万'
                    },
                    {
                        label: '剩余可借出',
                        fieldName: 'surplusAvailable',
                        unit: '万'
                    },
                ],
                [
                    {
                        label: '抵押权人',
                        fieldName: 'muName'
                    }
                ]
            ],//匹配结果label
            matchResult: [],//匹配结果
            loading1: true,//公司列表loading
            loading2: true,//资产列表loading
            loading3: true,//抵押权人列表loading
            loading: false,//页面loading
            tableListDataSource1: [],//公司列表data
            tableListDataSource2: [],//资产列表data
            tableListDataSource3: [],//抵押权人列表data
            searchArr1: [               
                {
                    label: '实际到期日',
                    child: [
                        {
                            fieldName: 'date1',
                            value:'',
                            style: 'dataRange',
                            format: 'YYYY-MM-DD',
                        }
                    ],
                },
                {
                    label: '搜索',
                    child: [
                        {
                            fieldName: 'name',
                            value:'',
                            placeholder: '档案编号或公司名称',
                            style: 'input'
                        }
                    ],
                },
            ],//公司列表查询条件
            searchArr2: [               
                {
                    label: '实际到期日',
                    child: [
                        {
                            fieldName: 'date2',
                            value:'',
                            style: 'dataRange',
                            format: 'YYYY-MM-DD',
                        }
                    ],
                },
                {
                    label: '搜索',
                    child: [
                        {
                            fieldName: 'amNum',
                            placeholder: '资产编号',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
            ],//资产列表查询条件
            searchArr3: [               
                {
                    label: '搜索',
                    child: [
                        {
                            fieldName: 'muName',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
            ],//抵押权人列表查询条件
            columns1: [
                {
                    title: '档案编号',
                    align: columnsAlign,
                    dataIndex: 'archivesId',
                    width: _tableWidth1,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '公司名称',
                    align: columnsAlign,
                    dataIndex: 'companyName',
                    width: _tableWidth1,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '可借总额',
                    align: columnsAlign,
                    dataIndex: 'availableAmount',
                    width: _tableWidth1,
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '剩余可借入',
                    align: columnsAlign,
                    dataIndex: 'surplusAvailable',
                    width: _tableWidth1,
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '实际到期日',
                    align: columnsAlign,
                    dataIndex: 'actualExpireDate',
                    width: _tableWidth1,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '匹配记录',
                    align: columnsAlign,
                    dataIndex: 'companyId',
                    width: _tableWidth1,
                    render: (text, record) => <span className="green-color" onClick={this.showModal1.bind(this,text)}>查看记录</span>
                },
            ],//公司列表columns
            columns2: [
                {
                    title: '资产编号',
                    align: columnsAlign,
                    dataIndex: 'amNum',
                    width: _tableWidth2,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '资产匹配总价',
                    align: columnsAlign,
                    dataIndex: 'amMatchTotalPrice',
                    width: _tableWidth2,
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '剩余可借出',
                    align: columnsAlign,
                    dataIndex: 'surplusAvailable',
                    width: _tableWidth2,
                    render: (text) => text ? text + '万' : '--'
                },
                {
                    title: '实际到期日',
                    align: columnsAlign,
                    dataIndex: 'actualExpireDate',
                    width: _tableWidth2,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '匹配记录',
                    align: columnsAlign,
                    dataIndex: 'amId',
                    width: _tableWidth2,
                    render: (text, record) => <span className="green-color" onClick={this.showModal2.bind(this,text)}>查看记录</span>
                },
            ],//资产列表columns
            columns3: [
                {
                    title: '抵押权人',
                    align: columnsAlign,
                    dataIndex: 'muName',
                    width: _tableWidth3,
                    render: (text) => text ? text : '--'
                },
            ],//抵押权人列表columns
            selectedRowKeys1: [],//公司列表选择项key
            selectedRowKeys2: [],//资产列表选择项key
            selectedRowKeys3: [],//抵押权人列表选择项key
            selectedRows1: [],//公司列表选择项
            selectedRows2: [],//资产列表选择项
            selectedRows3: [],//抵押权人列表选择项
            searchInfo1: {},//公司列表查询内容
            searchInfo2: {},//资产列表查询内容
            searchInfo3: {},//抵押权人列表查询内容
            amIdSelected: {},//已选择过的资产
            ltIdArray: [],//资产类别key数组
        }
    }

    componentDidMount() { //预加载数据
       this.companyBaseAllGet();
       this.assetsManageAllGet();
       this.mortgageUserAllGet();
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

    handleSearch1 = (e) => { //公司列表查询请求
        this.setState({
            loading1: true
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            let searchInfoB = {};
            if (values.date1) {
                searchInfoB.startDate = values.date1[0] ?  values.date1[0].format('YYYY-MM-DD') : '';
                searchInfoB.endDate = values.date1[1] ?  values.date1[1].format('YYYY-MM-DD') : '';
            }
            searchInfoB.name = values.name ? values.name : '';
            this.setState({
                searchInfo1: {...this.state.searchInfo1, ...searchInfoB}
            }, function () {
                this.setState({
                    tableListDataSource1: []
                },function(){
                    this.companyBaseAllGet(this.state.searchInfo1)
                })
                
            })
        });
    }

    handleSearch2 = (e) => { //资产列表查询请求
        this.setState({
            loading2: true
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            let searchInfoB = {};
            if (values.date2) {
                searchInfoB.startDate = values.date2[0] ?  values.date2[0].format('YYYY-MM-DD') : '';
                searchInfoB.endDate = values.date2[1] ?  values.date2[1].format('YYYY-MM-DD') : '';
            }
            searchInfoB.amNum = values.amNum ? values.amNum : '';
            this.setState({
                searchInfo2: {...this.state.searchInfo2, ...searchInfoB}
            }, function () {
                this.setState({
                    tableListDataSource2: []
                },function(){
                    this.assetsManageAllGet(this.state.searchInfo2)
                })
                
            })
        });
    }

    handleSearch3 = (e) => { //抵押权人查询请求
        this.setState({
            loading3: true
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            let searchInfoB = {};
            searchInfoB.muName = values.muName ? values.muName : '';
            this.setState({
                searchInfo3: {...this.state.searchInfo3, ...searchInfoB}
            }, function () {
                this.setState({
                    tableListDataSource3: []
                },function(){
                    this.mortgageUserAllGet(this.state.searchInfo3)
                })
                
            })
        });
    }

    companyBaseAllGet = async (data) => { //公司列表
        console.log(data)
        try {
            const result = await HTTP.companyBaseAll({
                ...data
            });
            console.log('result', result);
            this.setState({
                loading1: false,
                tableListDataSource1: result.data,
            })
        } catch (e) {
            this.setState({
                loading1: false
            })
        }
    }

    assetsManageAllGet = async (data) => { //资产列表
        console.log(data)
        try {
            const result = await HTTP.assetsManageAll({
                ...data
            });
            console.log('result', result);
            this.setState({
                loading2: false,
                tableListDataSource2: result.data,
            })
        } catch (e) {
            this.setState({
                loading2: false
            })
        }
    }

    mortgageUserAllGet = async (data) => { //抵押权人列表
        console.log(data)
        try {
            const result = await HTTP.mortgageUserAll({
                ...data
            });
            console.log('result', result);
            this.setState({
                loading3: false,
                tableListDataSource3: result.data,
            })
        } catch (e) {
            this.setState({
                loading3: false
            })
        }
    }

    matchOk = () => {
        console.log('matchResult',this.state.matchResult)
        if (this.state.selectedRows1.length === 0) {
            message.warning('请选择要匹配的公司！');
        }
        if (this.state.selectedRows2.length === 0) {
            message.warning('请选择要匹配的资产！');
        }
        if (this.state.selectedRows3.length === 0) {
            message.warning('请选择要匹配的抵押权人！');
        }
        if (this.state.selectedRows1.length > 0 && this.state.selectedRows2.length > 0 && this.state.selectedRows3.length > 0 ) {
            if (this.state.matchResult.length > 4) {
                message.warning('单次匹配数量不超过5条!');
                return;
            }
            let amIdSelectedB = this.state.amIdSelected;
            if (amIdSelectedB[this.state.selectedRows2[0]['amId']] && amIdSelectedB[this.state.selectedRows2[0]['amId']].length > 0 && amIdSelectedB[this.state.selectedRows2[0]['amId']][0] !== this.state.selectedRows1[0]['companyId']) {
                message.warning('一个资产只能匹配一个公司，请重新选择！')
                return;
            }
            let matchB = [...this.state.selectedRows1,...this.state.selectedRows2,...this.state.selectedRows3];
            let matchResultB = this.state.matchResult;
            
          
            amIdSelectedB[this.state.selectedRows2[0]['amId']] = amIdSelectedB[this.state.selectedRows2[0]['amId']] ? amIdSelectedB[this.state.selectedRows2[0]['amId']] : [];
            amIdSelectedB[this.state.selectedRows2[0]['amId']].push(this.state.selectedRows1[0]['companyId']); 
            matchResultB.push(matchB)
            console.log('matchResult',matchResultB)
            this.setState({
                matchResult: matchResultB,
                amIdSelected: amIdSelectedB
            },function(){
                let curCompanyId = this.state.selectedRows1[0]['companyId'];
                let curAmId = this.state.selectedRows2[0]['amId'];
                let remnantBorrowableArrayB = this.state.remnantBorrowableArray;
                let surplusAvailableArrayB = this.state.surplusAvailableArray;
                let onlineAmountArrayB = this.state.onlineAmountArray;
                let onlineAmountJsonB1 = this.state.onlineAmountJson1;
                let onlineAmountJsonB2 = this.state.onlineAmountJson2;
                onlineAmountArrayB.push(0);
                if (onlineAmountJsonB1[curCompanyId]){
                    onlineAmountJsonB1[curCompanyId].push(0);
                } else {
                    onlineAmountJsonB1[curCompanyId] = [];
                    onlineAmountJsonB1[curCompanyId].push(0);
                }
                if (onlineAmountJsonB2[curAmId]){
                    onlineAmountJsonB2[curAmId].push(0);
                } else {
                    onlineAmountJsonB2[curAmId] = [];
                    onlineAmountJsonB2[curAmId].push(0);
                }
                if (!remnantBorrowableArrayB[curCompanyId]) {
                    remnantBorrowableArrayB[curCompanyId] = this.state.selectedRows1[0]['availableAmount'];
                }
                if (!surplusAvailableArrayB[curAmId]) {
                    surplusAvailableArrayB[curAmId] = this.state.selectedRows2[0]['amMatchTotalPrice'];
                }

                this.setState({
                    remnantBorrowableArray: remnantBorrowableArrayB,
                    surplusAvailableArray: surplusAvailableArrayB,
                    onlineAmountArray: onlineAmountArrayB,
                    onlineAmountJson1: onlineAmountJsonB1,
                    onlineAmountJson2: onlineAmountJsonB2,
                },function(){
                    console.log('onlineAmountJson1',this.state.onlineAmountJson1)
                })
                console.log('matchResult',this.state.matchResult)
                console.log('amIdSelected',this.state.amIdSelected)
            })
        }
    }

    onSelectChange1 = (selectedRowKeys1, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys1,selectedRows);
        this.setState({ 
            selectedRowKeys1,
            selectedRows1: selectedRows
        });
    }

    onSelectChange2 = (selectedRowKeys2,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys2,selectedRows);
        this.setState({ 
            selectedRowKeys2,
            selectedRows2: selectedRows
        });
    }

    onSelectChange3 = (selectedRowKeys3,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys3,selectedRows);
        this.setState({ 
            selectedRowKeys3,
            selectedRows3: selectedRows
        });
    }

    handleFormReset1 = () => { //公司列表重置查询
        this.setState({
            loading1: true
        })
        this.props.form.setFieldsValue({
            date1: undefined,
            name: undefined
        });
        this.setState({
            searchInfo1: {},
            tableListDataSource1: [],
            selectedRowKeys1: [],
            selectedRows1: []
        }, function () {
            this.companyBaseAllGet()
        })
    }

    handleFormReset2 = () => { //资产列表重置查询
        this.setState({
            loading2: true
        })
        this.props.form.setFieldsValue({
            date2: undefined,
            amNum: undefined
        });
        this.setState({
            searchInfo2: {},
            tableListDataSource2: [],
            selectedRowKeys2: [],
            selectedRows2: []
        }, function () {
            this.assetsManageAllGet()
        })
    }

    handleFormReset3 = () => { //抵押权人列表重置查询
        this.setState({
            loading3: true
        })
        this.props.form.setFieldsValue({
            muName: undefined
        });
        this.setState({
            searchInfo3: {},
            tableListDataSource3: [],
            selectedRowKeys3: [],
            selectedRows3: []
        }, function () {
            this.mortgageUserAllGet()
        })
    }

    matchresultDelete = (index) => {//删除匹配结果
        let matchResultB = this.state.matchResult;
        let curCompanyId = this.state.matchResult[index][0]['companyId'];
        let curAmId = this.state.matchResult[index][1]['amId'];
        let onlineAmountArrayB = this.state.onlineAmountArray;
        let onlineAmountJsonB1 = this.state.onlineAmountJson1;
        let onlineAmountJsonB2 = this.state.onlineAmountJson2;
        let remnantBorrowableArrayB = this.state.remnantBorrowableArray;
        let surplusAvailableArrayB = this.state.surplusAvailableArray;
        let ltIdArrayB = this.state.ltIdArray;
        let amIdSelectedB = this.state.amIdSelected;
        amIdSelectedB[curAmId].splice(0,1);
        console.log('del:onlineAmountJsonB1:',onlineAmountJsonB1)
        console.log('del:remnantBorrowableArrayB:',remnantBorrowableArrayB)
        remnantBorrowableArrayB[curCompanyId] = (remnantBorrowableArrayB[curCompanyId] ? Number(remnantBorrowableArrayB[curCompanyId]) : 0) + (onlineAmountJsonB1[curCompanyId] && onlineAmountJsonB1[curCompanyId][index] ? Number(onlineAmountJsonB1[curCompanyId][index]) : 0);
        surplusAvailableArrayB[curAmId] = (surplusAvailableArrayB[curAmId]? Number(surplusAvailableArrayB[curAmId]) : 0) + (onlineAmountJsonB2[curAmId] && onlineAmountJsonB2[curAmId][index] ? Number(onlineAmountJsonB2[curAmId][index]) : 0);
        
        onlineAmountArrayB.splice(index,1);
        
        if (onlineAmountJsonB1[curCompanyId]) {
            // for (let i in onlineAmountJsonB1) {
            //     onlineAmountJsonB1[i].splice(index,1);
            // }
            onlineAmountJsonB1[curCompanyId].splice(index,1);
        }
        if (onlineAmountJsonB2[curAmId]) {
            // for (let i in onlineAmountJsonB2) {
            //     onlineAmountJsonB2[i].splice(index,1);
            // }
            onlineAmountJsonB2[curAmId].splice(index,1);
        }
        console.log('onlineAmountArrayonlineAmountJsonB1:',onlineAmountJsonB1)
        console.log('del:remnantBorrowableArrayB:',remnantBorrowableArrayB)
        console.log('del:onlineAmountArray:',onlineAmountArrayB)
        matchResultB.splice(index,1);
        ltIdArrayB.splice(index,1);
        this.setState({
            ltIdArray: ltIdArrayB,
            matchResult: matchResultB,
            onlineAmountArray: onlineAmountArrayB,
            onlineAmountJson1: onlineAmountJsonB1,
            onlineAmountJson2: onlineAmountJsonB2,
            remnantBorrowableArray: remnantBorrowableArrayB,
            surplusAvailableArray: surplusAvailableArrayB,
            amIdSelected: amIdSelectedB
        }) 
        
    }

    linkageShow = (fieldName,item,index,key) => {//上线金额与剩余可借入\借出联动显示
        console.log('linkageShow',fieldName,item,index,key)
        let maxNum = {};
       
        let availableAmountV = 0;
        let amMatchTotalPriceV = 0;
        let curCompanyId = this.state.matchResult[index][0]['companyId'];
        let curAmId = this.state.matchResult[index][1]['amId'];
        let curRemnantBorrowable = this.state.matchResult[index][0]['availableAmount'];
        let curSurplusAvailable = this.state.matchResult[index][1]['amMatchTotalPrice'];
        let onlineAmountJsonB1 = this.state.onlineAmountJson1;
        let onlineAmountJsonB2 = this.state.onlineAmountJson2;
    
        if (Number(curRemnantBorrowable) > Number(curSurplusAvailable)) {
            maxNum[curCompanyId] = Number(curSurplusAvailable);
        } else {
            maxNum[curCompanyId] = Number(curRemnantBorrowable);
        }
        console.log('maxNum',maxNum,curRemnantBorrowable,curSurplusAvailable)
        

        availableAmountV = this.state.matchResult[index][0]['availableAmount'];
        if (this.state.onlineAmountJson1[curCompanyId]) {
            let sum = 0;
            for (let i in this.state.onlineAmountJson1[curCompanyId]) {
                if (Number(i) !== Number(index)) {
                    sum += this.state.onlineAmountJson1[curCompanyId][i] ? this.state.onlineAmountJson1[curCompanyId][i] : 0;
                }
            }
            availableAmountV = availableAmountV - sum;
        }
       
        amMatchTotalPriceV = this.state.matchResult[index][1]['amMatchTotalPrice'];
        if (this.state.onlineAmountJson2[curAmId]) {
            let sum = 0;
            for (let i in this.state.onlineAmountJson2[curAmId]) {
                if (Number(i) !== Number(index)) {
                    sum += this.state.onlineAmountJson2[curAmId][i] ? this.state.onlineAmountJson2[curAmId][i] : 0;
                }
            }
            amMatchTotalPriceV = amMatchTotalPriceV - sum;
        }
        
        const onlineAmountChange = (value) => {
            let onlineAmount = 0;
            if (value > maxNum[curCompanyId]) {
                onlineAmount = maxNum[curCompanyId]
            } else {
                onlineAmount = value
            }
            let remnantBorrowableArrayB = this.state.remnantBorrowableArray;
            let surplusAvailableArrayB = this.state.surplusAvailableArray;
            if ((availableAmountV- onlineAmount) < 0) {
                onlineAmount = onlineAmount + (availableAmountV- onlineAmount);
            }
            if ((amMatchTotalPriceV- onlineAmount) < 0) {
                onlineAmount = onlineAmount + (amMatchTotalPriceV- onlineAmount);
            }
            if (((amMatchTotalPriceV- onlineAmount) < 0) && ((availableAmountV- onlineAmount) < 0)) {
                if ((amMatchTotalPriceV- onlineAmount) > (availableAmountV- onlineAmount)) {
                    onlineAmount = onlineAmount + (availableAmountV- onlineAmount);
                } else{
                    onlineAmount = onlineAmount + (amMatchTotalPriceV- onlineAmount);
                }
            }

            if ((availableAmountV- onlineAmount) < 0) {
                remnantBorrowableArrayB[curCompanyId] = 0;
            } else {
                remnantBorrowableArrayB[curCompanyId] = availableAmountV- onlineAmount;
            }
            if ((amMatchTotalPriceV- onlineAmount) < 0) {
                surplusAvailableArrayB[curAmId] = 0;
            } else {
                surplusAvailableArrayB[curAmId] = amMatchTotalPriceV- onlineAmount;
            }

            let onlineAmountArrayB = this.state.onlineAmountArray;
            onlineAmountArrayB[index] = onlineAmount;
            
            if (onlineAmountJsonB1[curCompanyId]) {
                onlineAmountJsonB1[curCompanyId][index] = onlineAmount
            } else {
                onlineAmountJsonB1[curCompanyId] = [];
                onlineAmountJsonB1[curCompanyId][index] = onlineAmount;
            }
            if (onlineAmountJsonB2[curAmId]) {
                onlineAmountJsonB2[curAmId][index] = onlineAmount
            } else {
                onlineAmountJsonB2[curAmId] = [];
                onlineAmountJsonB2[curAmId][index] = onlineAmount;
            }
            
            
            this.setState({
                onlineAmountJson1: onlineAmountJsonB1,
                onlineAmountJson2: onlineAmountJsonB2,
                onlineAmountArray: onlineAmountArrayB,
                remnantBorrowableArray: remnantBorrowableArrayB,
                surplusAvailableArray: surplusAvailableArrayB
            },function(){
                console.log('availableAmountVBB1',onlineAmountJsonB1)
                console.log('availableAmountVBB2',onlineAmountJsonB2)
                console.log(amMatchTotalPriceV, onlineAmount)
                console.log(this.state.onlineAmountArray)
                console.log('remnantBorrowableArray',this.state.remnantBorrowableArray)
                console.log(this.state.surplusAvailableArray)
            })
        }
        
        if (fieldName === 'onlineAmount') {
            return <span className="flex-1 text_right">
                        <InputNumber 
                        size="small" value={this.state.onlineAmountArray[index]} min={0} max={maxNum[curCompanyId]} onChange={onlineAmountChange} style={{width: '70%',marginRight: '5px'}}/>
                    万</span>
        } else if (fieldName === 'remnantBorrowable')  {
            return  <span><span style={{marginRight: '5px'}}>{this.state.remnantBorrowableArray[curCompanyId] ? this.state.remnantBorrowableArray[curCompanyId] : 0}</span>万</span>
        } else if (fieldName === 'onlineAmount1') {
            return <span><span style={{marginRight: '5px'}}>{this.state.onlineAmountArray[index] ? this.state.onlineAmountArray[index] : 0}</span>万</span>
        } else if (fieldName === 'surplusAvailable') {
            return  <span><span style={{marginRight: '5px'}}>{this.state.surplusAvailableArray[curAmId] ? this.state.surplusAvailableArray[curAmId] : 0}</span>万</span>
        }
        
    }

    handleFormBack = () => {
        this.props.history.go(-1);
    }

     /**
     * @desc 添加防抖，防止连击
     * */
    handleSubmit = LodashDebounce((e) => this._handleSubmit(e));

    _handleSubmit = async(e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        let data = [];
        let matchResultB = this.state.matchResult;
        let remnantBorrowableArrayB = this.state.remnantBorrowableArray;
        let surplusAvailableArrayB = this.state.surplusAvailableArray;
        let ltIdArrayB = this.state.ltIdArray;
        for (let i in matchResultB) {
            let dataJson = {};
            dataJson['companyId'] = matchResultB[i][0]['companyId'];
            dataJson['amId'] = matchResultB[i][1]['amId'];
            dataJson['muId'] = matchResultB[i][2]['muId'];
           
            if (ltIdArrayB[i]) {
                dataJson['ltId'] = ltIdArrayB[i];
            } else {
                message.warning('请填写完善贷款类别！');
                this.setState({
                    loading: false
                })
                return;
            }
            if (this.state.onlineAmountArray[i]) {
                dataJson['onlineAmount'] = this.state.onlineAmountArray[i];
            } else {
                message.warning('请填写完善上线金额！');
                this.setState({
                    loading: false
                })
                return;
            }
            
            dataJson['companySurplusAvailable'] = remnantBorrowableArrayB[matchResultB[i][0]['companyId']] ? remnantBorrowableArrayB[matchResultB[i][0]['companyId']] : 0;
            dataJson['assetsSurplusAvailable'] =  surplusAvailableArrayB[matchResultB[i][1]['amId']] ? surplusAvailableArrayB[matchResultB[i][1]['amId']] : 0;
            data.push(dataJson)
        }
        let requestData = JSON.stringify(data);
        console.log('handleSubmit',JSON.stringify(data))
        try {
            const result = await HTTP.assetsMatchAdd(
                requestData
            );
            console.log('result', result);
            this.setState({
                loading: false
            })
            message.success('匹配成功');
            this.handleFormBack();
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }

    loanTypeChange = (index,value) => {
        let ltIdArrayB = this.state.ltIdArray;
        ltIdArrayB[index] = value;
        this.setState({
            ltIdArray: ltIdArrayB
        })
    }   

    handleCancel1 = (e) => {
        console.log(e);
        this.setState({
            matchingRecord1: [],
            visibleModal1: false,
        });
    }

    handleCancel2 = (e) => {
        console.log(e);
        this.setState({
            matchingRecord2: [],
            visibleModal2: false,
        });
    }

    showModal1 = async(id) => {
        this.setState({
            visibleModal1: true,
            loadingModal1: true
        });
        try {
            const result = await HTTP.companyMatchRecord({},'/'+id);
            console.log('result', result);
            this.setState({
                loadingModal1: false,
                matchingRecord1: result.data
            })
        } catch (e) {
            this.setState({
                loadingModal1: false
            })
        }
    }

    showModal2 = async(id) => {
        this.setState({
            visibleModal2: true,
            loadingModal2: true
        });
        try {
            const result = await HTTP.assetsMatchRecord({},'/'+id);
            console.log('result', result);
            this.setState({
                loadingModal2: false,
                matchingRecord2: result.data
            })
        } catch (e) {
            this.setState({
                loadingModal2: false
            })
        }
    }

    render() {
        const { ltIdArray, loanType, matchResultLabel, matchResult, searchArr1, searchArr2, searchArr3, selectedRowKeys1, selectedRowKeys2, selectedRowKeys3, loading, columns1, columns2, columns3, tableListDataSource1, tableListDataSource2, tableListDataSource3, loading1, loading2, loading3 } = this.state;
        const rowSelection1 = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys1,
            onChange: this.onSelectChange1,
        };
        const rowSelection2 = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys2,
            onChange: this.onSelectChange2,
        };
        const rowSelection3 = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys3,
            onChange: this.onSelectChange3,
        };
        return (
            <Spin spinning={loading}>
                <Form layout="inline" id="wy-scroll-layout">
                    <div className="flex flex-wrap-wrap font_size_12">
                        <div className="mar_right">
                            <DetailModuleBox title='公司列表'>
                                <div className="mar_bot15">
                                    <div className="search_row">
                                        <FormSet size="small" ColMd={24} ColsM={24} form={this.props.form} searchArr={searchArr1}/>
                                    </div>
                                    <Row>
                                        <Col xl={24} lg={24}>
                                            <Button size="small" type="primary" onClick={this.handleSearch1}>查询</Button>
                                            <Button size="small" style={{marginLeft: 8}} onClick={this.handleFormReset1}>重置</Button>
                                        </Col>
                                    </Row>
                                </div>
                                <Table rowSelection={rowSelection1} size="small" scroll={{y: 250}} bordered rowKey="companyId" columns={columns1}
                                    dataSource={tableListDataSource1} loading={loading1}
                                pagination={false}/>
                            </DetailModuleBox>
                        </div>
                        <div className="mar_right">
                            <DetailModuleBox title='资产列表'>
                                <div className="mar_bot15">
                                    <div className="search_row">
                                        <FormSet size="small"  ColMd={24} ColsM={24} form={this.props.form} searchArr={searchArr2}/>
                                    </div>
                                    <Row>
                                        <Col xl={24} lg={24}>
                                            <Button size="small" type="primary" onClick={this.handleSearch2}>查询</Button>
                                            <Button size="small" style={{marginLeft: 8}} onClick={this.handleFormReset2}>重置</Button>
                                        </Col>
                                    </Row>
                                </div>
                                <Table rowSelection={rowSelection2} size="small" scroll={{y: 250}} bordered rowKey="amId" columns={columns2}
                                    dataSource={tableListDataSource2} loading={loading2}
                                pagination={false}/>
                            </DetailModuleBox>
                        </div>
                        <div className="mar_right1">
                             <DetailModuleBox title='抵押权人列表'>
                                <div className="mar_bot15">
                                    <div className="search_row">
                                        <FormSet size="small"  ColMd={24} ColsM={24} form={this.props.form} searchArr={searchArr3}/>
                                    </div>
                                    <Row>
                                        <Col xl={24} lg={24}>
                                            <Button size="small"  type="primary" onClick={this.handleSearch3}>查询</Button>
                                            <Button size="small" style={{marginLeft: 8}} onClick={this.handleFormReset3}>重置</Button>
                                        </Col>
                                    </Row>
                                </div>
                                <Table rowSelection={rowSelection3} size="small" scroll={{y: 250}} bordered rowKey="muId" columns={columns3}
                                    dataSource={tableListDataSource3} loading={loading3}
                                pagination={false}/>
                            </DetailModuleBox>
                        </div>
                        <Button type="primary" size="small" onClick={this.matchOk}>确定匹配</Button>
                    </div>
                    {matchResult.length > 0 && <DetailModuleBox title='匹配结果'>
                        {
                            matchResult.map((item,index)=>
                                <div key={index}>
                                    <div className="flex flex-justify-content-space-around match_result">
                                        {matchResultLabel.map((value,key)=>
                                            <div key={key} className="flex flex-1 flex-justify-content-center flex-align-items-center">
                                                <div className="match_result_m flex flex-wrap-wrap flex-1 flex-justify-content-center flex-align-items-center">
                                                    {value.map((v,k)=>
                                                        <div key={k} className="match_result_m_m flex flex-justify-content-space-between">
                                                            <span className="flex-1">{v.label}</span>
                                                            {(v.fieldName === 'surplusAvailable' || v.fieldName === 'onlineAmount' || v.fieldName === 'onlineAmount1' || v.fieldName === 'remnantBorrowable') ? this.linkageShow(v.fieldName,matchResult[index][key],index,key):
                                                                <span  className="flex-1 text_right">{matchResult[index][key][v.fieldName] ? matchResult[index][key][v.fieldName] : ''}{v.unit ? v.unit: ''}</span>
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="match_result_add">
                                                    <img src={addImg}/>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex flex-1 flex-justify-content-center flex-align-items-center">
                                            <div className="match_result_m flex flex-wrap-wrap flex-1 flex-justify-content-center flex-align-items-center">
                                                <span className="flex-1">贷款类别</span>
                                                <Select className="flex-1" placeholder="请选择贷款类别" value={ltIdArray[index]} onChange={this.loanTypeChange.bind(this,index)}>
                                                    {loanType.map((item,index)=>
                                                        <Option key={index} value={item.id}>{item.name}</Option>
                                                    )}
                                                </Select>
                                            </div>
                                            <div className="match_result_add match_result_delete">
                                                <img src={deleteImg} onClick={this.matchresultDelete.bind(this,index)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                        )}
                        <Row>
                            <Col xl={24} lg={24}>
                                <Button size="small"  type="primary" onClick={this.handleSubmit}>提交</Button>
                                <Button size="small" style={{marginLeft: 8}} onClick={this.handleFormBack}>返回</Button>
                            </Col>
                        </Row>
                    </DetailModuleBox>}
                </Form>
                <Modal
                    title="公司匹配记录"
                    visible={this.state.visibleModal1}
                    onCancel={this.handleCancel1}
                    width="50%"
                    footer={[
                        <Button type="primary" onClick={this.handleCancel1}>
                            关闭
                        </Button>
                    ]}
                >
                    <Table bordered size="small" rowKey="archivesId" columns={this.state.columnsModal1}
                        dataSource={this.state.matchingRecord1} loading={this.state.loadingModal1}
                        pagination={false}/>
                </Modal>
                <Modal
                    title="资产匹配记录"
                    visible={this.state.visibleModal2}
                    onCancel={this.handleCancel2}
                    width="50%"
                    footer={[
                        <Button type="primary" onClick={this.handleCancel2}>
                            关闭
                        </Button>
                    ]}
                >
                    <Table bordered size="small" rowKey="amNum" columns={this.state.columnsModal2}
                        dataSource={this.state.matchingRecord2} loading={this.state.loadingModal2}
                        pagination={false}/>
                </Modal>
            </Spin>
        )
    }
}

const AssetsMatchDetail = Form.create()(AssetsMatchDetailForm)
export default AssetsMatchDetail
