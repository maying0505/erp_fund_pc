import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Row, Col, Form, Button, Modal, message } from 'antd';
import * as HTTP from 'units/Axios';
import FormSet from 'common/FormSet';

class MortgageUserDetailForm extends React.Component {
    static propTypes = {
        detailVisible: PropTypes.bool,
        id: PropTypes.number,
        ifEdit: PropTypes.number,
        detailHandleCancel: PropTypes.func,
    };

    static defaultProps = {
        detailHandleCancel: ()=>{},
        detailVisible: false,
        id: -1,
        ifEdit: 0
    };

    constructor(props) {
        super(props)
        this.state = {
            searchArr: [
                {
                    label: '抵押权人名称',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'muName',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '收款账号',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'muAccount',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '收款银行',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'muBank',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '收款银行开户行',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'muOpeningBank',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '身份证号码',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'muCardNo',
                            value:'',
                            style: 'input',
                        }
                    ],
                },
                {
                    label: '身份证地址',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'muCardAddress',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '电话号码',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'muPhoneNum',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
            ],
            searchArr_1: [
                {
                    label: '抵押权人状态',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'muStatus',
                            defaultValue: '1',
                            value: [
                                {
                                    value: '1',
                                    text: '启用',
                                },
                                {
                                    value: '2',
                                    text: '停用',
                                }
                            ],
                            style: 'select',
                        }
                    ],
                },
            ],
            detailInfo: {},
            id: -1,
            loading: true,
            ifEdit: 0
        }
    }
    
    componentWillMount(){ //预加载数据
        this.propsGet(this.props);
    }
    componentWillReceiveProps(nextProps){ //组件接收到新的props时调用
        this.propsGet(nextProps);
    }

    propsGet = (props) => {
        console.log('props:',props,this.state.id)
        if ((props.ifEdit === 1 || props.ifEdit === 2) && props.id !== this.state.id && props.detailVisible) {
            this.setState({
                ifEdit: props.ifEdit,
                id: props.id
            },function(){
                this._getDetail(props.id)
            })
        } else {
            this.setState({
                loading: false
            })
        }
    }
    
    _getDetail = async (id) => {
        try {
            const result = await HTTP.mortgageUserQuery({},'/'+id);
            this.setState({
                loading: false,
                detailInfo: result.data ? result.data :{}
            })
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }
    _submitHandleOk = (e) => { //提交
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err){ 
                message.warning('请填完必填项！');  
                return;
            }
            this.setState({
                loading: true
            })
            if (this.state.ifEdit === 0) {
                this._submitAdd(values);
            } else if (this.state.ifEdit === 1) {
                this._submitEdit(values);
            }
            
        })
    };
    _submitEdit = async (param) => { //编辑提交
        try {
            const result = await HTTP.mortgageUserUpdate({
                muId: this.state.id,
                ...param
            });
            this.setState({
                loading: false
            })
            this.props.detailHandleCancel(true)
            message.success(result.msg);
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    };
    _submitAdd = async (param) => { //新增提交
            try {
                const result = await HTTP.mortgageUserSave({
                    ...param
                });
                this.setState({
                    loading: false
                })
                this.props.detailHandleCancel(true)
                message.success(result.msg);
            } catch (e) {
                this.setState({
                    loading: false
                })
            }
    };

    _detailHandleCancel = (e) => {
        console.log(e);
        this.props.detailHandleCancel()
    }
   
 
    render() {
        const { searchArr_1, searchArr, loading, detailInfo, ifEdit } = this.state;
        return (
            <Modal
                title="抵押权人明细表"
                visible={this.props.detailVisible}
                onCancel={this._detailHandleCancel}
                footer={null}
                width= '60%'
                destroyOnClose={true}
                >
                <Spin size="large" spinning={loading}>
                    <Form layout="inline" className={((sessionStorage.getItem('superadmin_cs') === 'true' && ifEdit === 1)|| ifEdit === 0) ? '' : 'detail_box border_top_let'} style={{marginTop: '0'}}>
                        <FormSet isShow={(sessionStorage.getItem('superadmin_cs') === 'true' && ifEdit === 1) || ifEdit === 0 ? false: true } defaultValues={detailInfo} ColMd={12} ColsM={12} form={this.props.form} searchArr={searchArr}/>
                        <FormSet isShow={ifEdit === 1 || ifEdit === 0 ? false: true } defaultValues={detailInfo} ColMd={12} ColsM={12} form={this.props.form} searchArr={searchArr_1}/>
                    </Form>
                    <Row className="mar_top15">
                        <Col md={24} sm={24} style={{textAlign: 'center'}}>
                            {(ifEdit === 1 || ifEdit === 0) &&<Button onClick={this._submitHandleOk}>提交</Button>}
                            <Button type="primary" style={{marginLeft: 8}} onClick={this._detailHandleCancel}>关闭</Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>              
        );
    }
}
const MortgageUserDetail = Form.create()(MortgageUserDetailForm)
export default MortgageUserDetail