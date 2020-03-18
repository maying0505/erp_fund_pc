import React from 'react';
import { message, Spin, Form, Button  } from 'antd';
import * as HTTP from 'units/Axios';
import companyJudicialShow from './companyJudicial';
import DetailModuleBox from 'common/DetailModuleBox';
import FormSet from 'common/FormSet';
import LodashDebounce from 'common/debounce';

class CompanyJudicialDetailForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            detailData: {},
            queryHttpUrl: HTTP.companyJudicialQuery,
            updateHttpUrl: HTTP.companyJudicialUpdate,
            id: Number(this.props.match.params['id']) ? Number(this.props.match.params['id']) : -1,
            ifShow: this.props.match.params['ifShow'] ? this.props.match.params['ifShow'] : '0'
        }
    }

    componentDidMount() { //预加载数据
        this._getDetailData(this.state.id)
    }

    _getDetailData = async (id) => { 
        try {
            const result = await this.state.queryHttpUrl({},'/'+id);
            console.log('result',result)
            this.setState({
                loading: false,
            })
            if (result.data) {
                let detailDataJ = {};
                for(var p in result.data){//遍历json对象的每个key/value对,p为key
                     if (result.data[p]) {
                        detailDataJ = {...detailDataJ,...result.data[p]}
                    }
                }
                this.setState({
                    detailData: detailDataJ
                })
            }
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }

    /**
     * @desc 添加防抖，防止连击
     * */
    _handleSave1 = LodashDebounce((e) => this.handleSave(e,'1'));
    _handleSave2 = LodashDebounce((e) => this.handleSave(e,'2'));

    handleSave = (e,result) => {        
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err){   
                message.warning('请填完必填项！');
                return;
            }
            this.setState({
                loading: true,
            })
            let requestValues = {};
            requestValues.judicialResult = result;
            requestValues.companyId = this.state.id;
            requestValues.icAscription = this.state.detailData['icAscription'];
            requestValues.icContrast = values.icContrast;
            requestValues.judicialFeedback = values.judicialFeedback;
            requestValues.legalJudicial = values.legalJudicial;
            requestValues.partnerFirstJudicial = values.partnerFirstJudicial;
            requestValues.partnerSecondJudicial = values.partnerSecondJudicial;
            requestValues.partnerThirdJudicial = values.partnerThirdJudicial;
            requestValues.qdSource = this.state.detailData['qdSource'];
            requestValues.companyJudicial = values.companyJudicial;
            this._save(requestValues);
        })
    }
   
    _save = async (values) => { 
        try {
            const result = await this.state.updateHttpUrl({
               ...values
            });
            console.log('result', result);
            this.setState({
                loading: false,
            })
            message.success('提交成功！');
            this.handleFormBack();
        } catch (e) {
            this.setState({
                loading: false,
            })
        }
    }

    handleFormBack = (e) => {
        sessionStorage.setItem('_ifBack','0');
        this.props.history.go(-1);
    }

    render() {
        const { form } = this.props;
        const { ifShow, detailData, loading } = this.state;
        return (
            <Spin size="large" spinning={loading}>
                <Form layout="inline" id="wy-scroll-layout" className="compeny_judicial_box"> 
                    {companyJudicialShow.map((item,index)=>
                        <DetailModuleBox key={index} className={ifShow === '2' ? 'detail_box' : ''}>
                            <FormSet ColMd={index === (companyJudicialShow.length-1) ? 24 : 12} ColsM={index === (companyJudicialShow.length-1) ? 24 : 12} isShow={ifShow === '2'} defaultValues={detailData ? detailData : {}} searchArr={item.child} form={form}/>
                        </DetailModuleBox>
                    )}
                    <div className="text_center form_submit_box">
                        {(ifShow === '0' || ifShow === '1') && <span>
                            <Button type="primary" onClick={this._handleSave1}>通过</Button>
                            <Button type="primary" style={{marginLeft: 8}} onClick={this._handleSave2}>驳回</Button>
                        </span>}
                        <Button style={{marginLeft: 8}} onClick={this.handleFormBack.bind(this,true)}>返回列表</Button>
                    </div>
                </Form>
            </Spin>
        )
    }
}

const CompanyJudicialDetail = Form.create()(CompanyJudicialDetailForm)

export default CompanyJudicialDetail
