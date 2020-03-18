import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Row, Col, Form, Button, Modal, message, Input } from 'antd';
import * as HTTP from 'units/Axios';
import FormSet from 'common/FormSet';

class ReceiptDetailForm extends React.Component {
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
            searchArr1: [
                {
                    label: '验收有效数量',
                    child: [
                        {
                            fieldName: 'ysyxNum',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '付款备注',
                    child: [
                        {
                            fieldName: 'fkRemark',
                            value:'',
                            style: 'textarea'
                        }
                    ],
                },
                {
                    label: '备注',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'remark',
                            value:'',
                            style: 'textarea'
                        }
                    ],
                },
            ],
            searchArr: [
                {
                    label: '渠道',
                    isRequired: true, 
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
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'sjDate',
                            value:'',
                            style: 'data',
                            format: 'YYYY-MM-DD',
                        }
                    ],
                },
                {
                    label: '收件数量',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'sjNum',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '项目摘要',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'xmzy',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '付款金额',
                    child: [
                        {
                            fieldName: 'fkje',
                            value:'',
                            style: 'input'
                        }
                    ],
                },
                {
                    label: '付款日期',
                    isRequired: true, 
                    child: [
                        {
                            fieldName: 'fkDate',
                            value:'',
                            style: 'data',
                            format: 'YYYY-MM-DD',
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
            const result = await HTTP.receiptManageQuery({},'/'+id);
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
            values.sjDate = values.sjDate ? values.sjDate.format('YYYY-MM-DD') : '';
            values.fkDate = values.fkDate ? values.fkDate.format('YYYY-MM-DD') : '';
            if (this.state.ifEdit === 0) {
                this._submitAdd(values);
            } else if (this.state.ifEdit === 1) {
                this._submitEdit(values);
            }
            
        })
    };
    _submitEdit = async (param) => { //编辑提交
        try {
            const result = await HTTP.receiptManageUpdate({
                id: this.state.id,
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
                const result = await HTTP.receiptManageSave({
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
        const { searchArr, loading, searchArr1, detailInfo, ifEdit } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="收件明细表"
                visible={this.props.detailVisible}
                onCancel={this._detailHandleCancel}
                footer={null}
                width= '58%'
                destroyOnClose={true}
                >
                <Spin size="large" spinning={loading}>
                    <Form layout="inline" className={(ifEdit === 1 || ifEdit === 0) ? '' : 'detail_box border_top_let'} style={{marginTop: '0'}}>
                        <FormSet isShow={ifEdit === 1 || ifEdit === 0 ? false: true } defaultValues={detailInfo} ColMd={12} ColsM={12} form={this.props.form} searchArr={searchArr}/>
                        <FormSet isShow={ifEdit === 1 || ifEdit === 0 ? false: true} defaultValues={detailInfo} ColMd={24} ColsM={24} form={this.props.form} searchArr={searchArr1}/>
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
const ReceiptDetail = Form.create()(ReceiptDetailForm)
export default ReceiptDetail