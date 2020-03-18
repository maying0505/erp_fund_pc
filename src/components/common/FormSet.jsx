import React from 'react'
import PropTypes from 'prop-types'
import { Cascader, Icon, Row, Col, Form, Input, Select, DatePicker, InputNumber, message } from 'antd'
import zh_CN from 'antd/lib/date-picker/locale/zh_CN';
import NumericInputBox from './NumericInputBox';
import 'moment/locale/zh-cn';
import moment from 'moment';
import * as HTTP from 'units/Axios';
import showJson from'components/CompanyDetail/showJson';
import { convertCurrency } from 'common/NumberFormat';
const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const Option = Select.Option;
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
class FormSet extends React.Component {
    static propTypes = {
        size:  PropTypes.string,
        searchArr: PropTypes.array,
        ColMd: PropTypes.number,
        ColSm: PropTypes.number,
        form: PropTypes.object.isRequired,
        defaultValues: PropTypes.object,
        isShow: PropTypes.bool,
        receiptTypeChange: PropTypes.func,
    };

    static defaultProps = {
        receiptTypeChange: ()=>{},
        size: 'default',
        isShow: false,
        defaultValues: {},
        ColMd: 6,
        ColSm: 12,      
        searchArr: [],
    };

    constructor(props) {
        super(props)
        this.state = {
            loanTermValue: 0,//贷款期限
            interestUppercaseValue: undefined,//利息大写
            totalRepaymentInterestLowercaseValue: undefined,//本息共计小写
            totalRepaymentInterestUppercaseValue: undefined,//本息共计大写
            infoServiceTotalFeeLowercaseValue: undefined,//信息技术服务费小写
            infoServiceTotalFeeUppercaseValue: undefined,//信息技术服务费大写
            annualizedRateValue: 0,//平台借款利率/年化
            annualizedInfoServiceFeeValue: 0,//信息技术服务费标准/年化
            interestLowercaseValue: undefined,//利息小写
            amAddressValue: undefined,
            organAll: [],
            repaymentModeAll: [],
            proxyReceiptAll: [],
            loanTermAll: [],
            loanTypeAll: [],
            matchFlagChange: false,
            matchFlagVal: undefined,
            amAddressJSON: showJson.amAddressJSON,
            amAddressData: [],
            value: undefined,
            companyNameChecked: '',
            courtList: [],
            areaList: [],
            keyArray: [0,1,2],
            uuid: 3,
            defaultValues: {},
            numberInput: '',
            warrantSituation: [],//权证情况
        }
    }
    
    componentWillMount(){ //预加载数据
        this.propsGet(this.props); 
        this.loanTypeGet();//贷款类别
        this.loanTermGet();//贷款期限
        this.repaymentModeGet();//平台还款方式
        this.proxyReceiptGet();//抵押权人
        this.organGet();//所属机构
    }
    componentWillReceiveProps(nextProps){ //组件接收到新的props时调用
        this.propsGet(nextProps);
    }

    proxyReceiptGet  = async (e) => {
        if (sessionStorage.getItem('proxyReceiptAll')) {
            this.setState({
                proxyReceiptAll: JSON.parse(sessionStorage.getItem('proxyReceiptAll'))
            })
            return
        } 
        try {
            const result = await HTTP.mortgageUserAll({
            });
            this.setState({
                proxyReceiptAll: result.data
            })
            sessionStorage.setItem('proxyReceiptAll',JSON.stringify(result.data))
        } catch (e) {
            // message.error(e.message);
        }
    }

    organGet  = async (e) => {
        if (sessionStorage.getItem('organAll')) {
            this.setState({
                organAll: JSON.parse(sessionStorage.getItem('organAll'))
            })
            return
        } 
        try {
            const result = await HTTP.organAll({
            });
            this.setState({
                organAll: result.data
            })
            sessionStorage.setItem('organAll',JSON.stringify(result.data))
        } catch (e) {
            // message.error(e.message);
        }
    }

    repaymentModeGet  = async (e) => {
        if (sessionStorage.getItem('repaymentModeAll')) {
            this.setState({
                repaymentModeAll: JSON.parse(sessionStorage.getItem('repaymentModeAll'))
            })
            return
        } 
        try {
            const result = await HTTP.repaymentModeAll({
            });
            this.setState({
                repaymentModeAll: result.data
            })
            sessionStorage.setItem('repaymentModeAll',JSON.stringify(result.data))
        } catch (e) {
            // message.error(e.message);
        }
    }

    loanTypeGet  = async (e) => {
        if (sessionStorage.getItem('loanTypeAll')) {
            this.setState({
                loanTypeAll: JSON.parse(sessionStorage.getItem('loanTypeAll'))
            })
            return
        } 
        try {
            const result = await HTTP.loanTypeAll({
            });
            this.setState({
                loanTypeAll: result.data
            })
            sessionStorage.setItem('loanTypeAll',JSON.stringify(result.data))
        } catch (e) {
            // message.error(e.message);
        }
    }

    loanTermGet  = async (e) => {
        if (sessionStorage.getItem('loanTermAll')) {
            this.setState({
                loanTermAll: JSON.parse(sessionStorage.getItem('loanTermAll'))
            })
            return
        } 
        try {
            const result = await HTTP.loanTermAll({
            });
            this.setState({
                loanTermAll: result.data
            })
            sessionStorage.setItem('loanTermAll',JSON.stringify(result.data))
        } catch (e) {
            // message.error(e.message);
        }
    }

    propsGet = (props) => {
        if (props.defaultValues !== this.state.defaultValues){
            if (props.defaultValues.warrants && JSON.parse(props.defaultValues.warrants).length > 1) {
                let keyArrayB = [];
                JSON.parse(props.defaultValues.warrants).forEach(function(currentValue, index){
                    keyArrayB.push(index)
                })
                this.setState({
                    keyArray: keyArrayB,
                    uuid: (JSON.parse(props.defaultValues.warrants).length)+1
                })
            }
            
            this.setState({
                defaultValues: props.defaultValues,
                amAddressValue: props.defaultValues['amAddress'] ? props.defaultValues['amAddress']: undefined,
                warrantSituation: props.defaultValues.warrants ? JSON.parse(props.defaultValues.warrants) : [],
                loanTermValue: props.defaultValues['loanTermId'] ? props.defaultValues['loanTermId'] : 0,//贷款期限
                interestUppercaseValue: props.defaultValues['interestUppercase'] ? props.defaultValues['interestUppercase'] : undefined,//利息大写
                totalRepaymentInterestLowercaseValue: props.defaultValues['totalRepaymentInterestLowercase'] ? props.defaultValues['totalRepaymentInterestLowercase'] : undefined,//本息共计小写
                totalRepaymentInterestUppercaseValue: props.defaultValues['totalRepaymentInterestUppercase'] ? props.defaultValues['totalRepaymentInterestUppercase'] : undefined,//本息共计大写
                infoServiceTotalFeeLowercaseValue: props.defaultValues['infoServiceTotalFeeLowercase'] ? props.defaultValues['infoServiceTotalFeeLowercase']: undefined,//信息技术服务费小写
                infoServiceTotalFeeUppercaseValue: props.defaultValues['infoServiceTotalFeeUppercase'] ? props.defaultValues['infoServiceTotalFeeUppercase'] : undefined,//信息技术服务费大写
                annualizedRateValue: props.defaultValues['annualizedRate'] ? props.defaultValues['annualizedRate'] : 0,//平台借款利率/年化
                annualizedInfoServiceFeeValue: props.defaultValues['annualizedInfoServiceFee'] ? props.defaultValues['annualizedInfoServiceFee'] : 0,//信息技术服务费标准/年化
                interestLowercaseValue: props.defaultValues['interestLowercase'] ? props.defaultValues['interestLowercase'] : undefined,//利息小写
            },function(){
                sessionStorage.setItem('plarformProxyOpeningBankValue',props.defaultValues['platformInfo'] && props.defaultValues['platformInfo']['plarformProxyOpeningBank'] ? props.defaultValues['platformInfo']['plarformProxyOpeningBank']: '');//指定收款人银行开户行
                sessionStorage.setItem('platformProxyAccountValue',props.defaultValues['platformInfo'] && props.defaultValues['platformInfo']['platformProxyAccount'] ? props.defaultValues['platformInfo']['platformProxyAccount']: '');//指定收款人账号
                sessionStorage.setItem('guarantyGuarantorUsccValue',props.defaultValues['guarantyInfo'] && props.defaultValues['guarantyInfo']['guarantyGuarantorUscc'] ? props.defaultValues['guarantyInfo']['guarantyGuarantorUscc']: '');//担保方法定代表人名称
                sessionStorage.setItem('platformGuarantorValue',props.defaultValues['platformInfo'] && props.defaultValues['platformInfo']['platformGuarantor'] ? props.defaultValues['platformInfo']['platformGuarantor']: '');//担保方
                sessionStorage.setItem('guarantyGuarantorNameValue',props.defaultValues['guarantyInfo'] && props.defaultValues['guarantyInfo']['guarantyGuarantorName'] ? props.defaultValues['guarantyInfo']['guarantyGuarantorName']: '');//担保方法定代表人名称
                
                sessionStorage.setItem('guarantyGuarantorAddressValue',props.defaultValues['guarantyInfo'] && props.defaultValues['guarantyInfo']['guarantyGuarantorAddress'] ? props.defaultValues['guarantyInfo']['guarantyGuarantorAddress']: '');//担保方法定代表人名称
                console.log('defaultValues',props.defaultValues)
            })
        }
    }

    inputOnBlur = async (e) => {
        let value = e.target.value;
        try {
            const result = await HTTP.checkCompanyName({
                companyName: value,
                companyId: this.state.defaultValues['companyId'] ? this.state.defaultValues['companyId'] : 0
            });
            this.props.form.setFieldsValue({
                companyNameChecked: true,
            });
            this.setState({
                companyNameChecked: 'success'
            })
        } catch (e) {
            this.props.form.setFieldsValue({
                companyNameChecked: false,
            });
            this.setState({
                companyNameChecked: 'error'
            })
        }
    }

    handleSearch = (value) => {
        console.log('valuesss',value)
        if (!value) {
            this.setState({
                amAddressData: []
            })
            return
        }
        let amAddressDataB = [];
        for (let item of this.state.amAddressJSON) {
            if (item.value.indexOf(value) === 0) {
                amAddressDataB.push(item);
            }
        }
        
        this.setState({
            amAddressData: amAddressDataB,
            amAddressValue: value
        },function(){
            console.log('valuesss',this.state.amAddressData)
            console.log('valuesss',this.state.amAddressValue)
        })
    }

    handleChange = (value) => {
        console.log('handleChange',value)
        this.setState({ amAddressValue: value });
    }

    amAddressFocus = () => {
        for (let item of this.state.amAddressJSON) {
            if (item.value === this.state.amAddressValue) {
                this.setState({
                    amAddressData: [item]
                },function(){
                    console.log('amAddressData',this.state.amAddressData)
                })
            } 
        }
    }

    amAddressBlur = (e) =>{
        console.log(this.state.amAddressData,this.state.amAddressValue,e)
        if (this.state.amAddressValue) {
            let myResult = true;
            if (this.state.amAddressData.length > 0) {
                for (let item of this.state.amAddressData) {
                    if (item.value === this.state.amAddressValue) {
                        myResult = false;
                    } 
                }
            } 
            
            if (myResult) {
                console.log('valuesss:myResult',myResult)
                this.setState({
                    amAddressValue: undefined,
                    amAddressData: [],
                },function(){
                    // message.warning('没有这个资产地!')
                })
            }
            
        }
    }

    numberChange = (fieldName,e) => {
        console.log(fieldName,e.target.value)
        let value = Number(e.target.value);
        let matchFlagValue = undefined;
        if (fieldName === 'amMatchTotalPrice') {
            if (80 < value && value <= 100) {
                matchFlagValue = '1';
            } else if (50 < value && value <= 80) {
                matchFlagValue = '2';
            } else if (0 <= value && value <= 50) {
                matchFlagValue = '3';
            }
            console.log(matchFlagValue)
            this.setState({
                matchFlagChange: true,
                matchFlagVal: matchFlagValue
            })
        }
    }

    selectChange = (style, loanTotalPriceLowercase, value, options) => {
        console.log('loanTermChange',style, value, loanTotalPriceLowercase,options)
        if (style === 'loanTerm') {
            loanTotalPriceLowercase = loanTotalPriceLowercase ? Number(loanTotalPriceLowercase)* 10000 : 0;
            let loanTermValueB = this.state.loanTermAll[Number(value)-1] && this.state.loanTermAll[Number(value)-1]['subName'] ? this.state.loanTermAll[Number(value)-1]['subName'] : 0;//贷款期限
            let interestLowercaseValueB = this.state.interestLowercaseValue;//利息小写
            let interestUppercaseValueB = this.state.interestUppercaseValue;//利息大写
            let totalRepaymentInterestLowercaseValueB =  this.state.totalRepaymentInterestLowercaseValue;//本息共计小写
            let totalRepaymentInterestUppercaseValueB =  this.state.totalRepaymentInterestUppercaseValue;//本息共计大写
            let infoServiceTotalFeeLowercaseValueB =  this.state.infoServiceTotalFeeLowercaseValue;//信息技术服务费小写
            let infoServiceTotalFeeUppercaseValueB =  this.state.infoServiceTotalFeeUppercaseValue;//信息技术服务费大写
            let annualizedRateValueB = this.state.annualizedRateValue;//平台借款利率/年化
            let annualizedInfoServiceFeeValueB = this.state.annualizedInfoServiceFeeValue;//信息技术服务费标准/年化
            
            interestLowercaseValueB = loanTotalPriceLowercase * annualizedRateValueB * (loanTermValueB/12);
            interestLowercaseValueB = Number(interestLowercaseValueB).toFixed(2);
            interestUppercaseValueB = convertCurrency(interestLowercaseValueB);
            totalRepaymentInterestLowercaseValueB = Number(loanTotalPriceLowercase) + Number(interestLowercaseValueB);
            totalRepaymentInterestLowercaseValueB = Number(totalRepaymentInterestLowercaseValueB).toFixed(2);
            totalRepaymentInterestUppercaseValueB = convertCurrency(totalRepaymentInterestLowercaseValueB);
            infoServiceTotalFeeLowercaseValueB = loanTotalPriceLowercase * annualizedInfoServiceFeeValueB * (loanTermValueB/12);
            infoServiceTotalFeeLowercaseValueB = Number(infoServiceTotalFeeLowercaseValueB).toFixed(2);
            infoServiceTotalFeeUppercaseValueB = convertCurrency(infoServiceTotalFeeLowercaseValueB);
            this.setState({
                loanTermValue: loanTermValueB,
                interestLowercaseValue: interestLowercaseValueB,
                interestUppercaseValue: interestUppercaseValueB,
                totalRepaymentInterestLowercaseValue: totalRepaymentInterestLowercaseValueB,
                totalRepaymentInterestUppercaseValue: totalRepaymentInterestUppercaseValueB,
                infoServiceTotalFeeLowercaseValue: infoServiceTotalFeeLowercaseValueB,
                infoServiceTotalFeeUppercaseValue: infoServiceTotalFeeUppercaseValueB,
            },function(){
                console.log('interestLowercaseValue',this.state.interestLowercaseValue)
            })
        } 
        if (style === 'organ') {
            let organValue = this.state.organAll[Number(value)-1]? this.state.organAll[Number(value)-1] : {};//所属机构
            let guarantyGuarantorNameB = organValue['legalName'] ? organValue['legalName'] : '';
            let guarantyGuarantorUsccB = organValue['uscc'] ? organValue['uscc'] : '';
            let guarantyGuarantorAddressB = organValue['companyAddress'] ? organValue['companyAddress'] : '';
            let platformGuarantorB = organValue['companyName'] ? organValue['companyName'] : '';
            sessionStorage.setItem('platformGuarantorValue',platformGuarantorB)
            sessionStorage.setItem('guarantyGuarantorNameValue',guarantyGuarantorNameB)
            sessionStorage.setItem('guarantyGuarantorUsccValue',guarantyGuarantorUsccB)
            sessionStorage.setItem('guarantyGuarantorAddressValue',guarantyGuarantorAddressB)
        }

        if (style === 'proxyReceipt') {
            if (options) {
                let proxyReceiptAllB = this.state.proxyReceiptAll;//抵押权人
                let key = options['key'] ? Number(options['key']) : 0;
                let plarformProxyOpeningBankB = proxyReceiptAllB[key] && proxyReceiptAllB[key]['muOpeningBank'] ? proxyReceiptAllB[key]['muOpeningBank'] : '';//指定收款人银行开户行
                let platformProxyAccountB = proxyReceiptAllB[key] && proxyReceiptAllB[key]['muAccount'] ? proxyReceiptAllB[key]['muAccount'] : '';//指定收款人账号
                sessionStorage.setItem('plarformProxyOpeningBankValue',plarformProxyOpeningBankB)
                sessionStorage.setItem('platformProxyAccountValue',platformProxyAccountB)
            } else {
                sessionStorage.setItem('plarformProxyOpeningBankValue','')
                sessionStorage.setItem('platformProxyAccountValue','')
            }
            
        }
    }

    numberInputChange = (fieldName,loanTotalPriceLowercase, value) =>{
        console.log('numberInputChange',fieldName,loanTotalPriceLowercase, value)
        let loanTermValueB = this.state.loanTermValue;//贷款期限
        loanTotalPriceLowercase = loanTotalPriceLowercase ? Number(loanTotalPriceLowercase)* 10000 : 0;
        let interestLowercaseValueB = this.state.interestLowercaseValue;//利息小写
        let interestUppercaseValueB = this.state.interestUppercaseValue;//利息大写
        let totalRepaymentInterestLowercaseValueB =  this.state.totalRepaymentInterestLowercaseValue;//本息共计小写
        let totalRepaymentInterestUppercaseValueB =  this.state.totalRepaymentInterestUppercaseValue;//本息共计大写
        let infoServiceTotalFeeLowercaseValueB =  this.state.infoServiceTotalFeeLowercaseValue;//信息技术服务费小写
        let infoServiceTotalFeeUppercaseValueB =  this.state.infoServiceTotalFeeUppercaseValue;//信息技术服务费大写
        if (fieldName ==='annualizedRate') {
            let annualizedRateValueB = value ? value/100 : 0;//平台借款利率/年化
            interestLowercaseValueB = loanTotalPriceLowercase * annualizedRateValueB * (loanTermValueB/12);
            interestLowercaseValueB = Number(interestLowercaseValueB).toFixed(2);
            interestUppercaseValueB = convertCurrency(interestLowercaseValueB);
            totalRepaymentInterestLowercaseValueB =  Number(loanTotalPriceLowercase) +  Number(interestLowercaseValueB);
            totalRepaymentInterestLowercaseValueB = Number(totalRepaymentInterestLowercaseValueB).toFixed(2);
            totalRepaymentInterestUppercaseValueB = convertCurrency(totalRepaymentInterestLowercaseValueB);
            this.setState({
                annualizedRateValue: annualizedRateValueB,
                interestLowercaseValue: interestLowercaseValueB,
                interestUppercaseValue: interestUppercaseValueB,
                totalRepaymentInterestLowercaseValue: totalRepaymentInterestLowercaseValueB,
                totalRepaymentInterestUppercaseValue: totalRepaymentInterestUppercaseValueB,
            })
        } else if (fieldName ==='annualizedInfoServiceFee') {
            let annualizedInfoServiceFeeValueB = value ? value/100 : 0;//信息技术服务费标准/年化
            infoServiceTotalFeeLowercaseValueB = loanTotalPriceLowercase * annualizedInfoServiceFeeValueB * (loanTermValueB/12);
            infoServiceTotalFeeLowercaseValueB = Number(infoServiceTotalFeeLowercaseValueB).toFixed(2);
            infoServiceTotalFeeUppercaseValueB = convertCurrency(infoServiceTotalFeeLowercaseValueB);
            this.setState({
                annualizedInfoServiceFeeValue: annualizedInfoServiceFeeValueB,
                infoServiceTotalFeeLowercaseValue: infoServiceTotalFeeLowercaseValueB,
                infoServiceTotalFeeUppercaseValue: infoServiceTotalFeeUppercaseValueB,
            })
        }
    }

    receiptTypeChange = (defaultValues,value) => {
        sessionStorage.setItem('plarformProxyOpeningBankValue',defaultValues['plarformProxyOpeningBank'] ? defaultValues['plarformProxyOpeningBank']: '');//指定收款人银行开户行
        sessionStorage.setItem('platformProxyAccountValue',defaultValues['platformProxyAccount'] ? defaultValues['platformProxyAccount']: '');//指定收款人账号
        console.log('plarformProxyOpeningBankValue2',defaultValues)
        console.log('plarformProxyOpeningBankValue',sessionStorage.getItem('plarformProxyOpeningBankValue'))
        console.log('plarformProxyOpeningBankValue1',sessionStorage.getItem('platformProxyAccountValue'))
        this.props.receiptTypeChange(value);
    }
  
    inputBoxShow = (defaultValues,fieldName,key,style,value,length,placeholder,width,mode,format,disabled,disabledText) =>{
        let text = '';
        if (style === 'input') {
            text = <Input size={this.props.size} disabled={disabled ? disabled : false} key={key} placeholder={placeholder ? placeholder :""} style={{width: `${width ? width :90/length}%`}}/>
        } else if (style === 'checkInput') {
            this.props.form.getFieldDecorator('companyNameChecked', { initialValue: true});
            text = <Input size={this.props.size} className="check_input" onBlur={this.inputOnBlur} disabled={disabled ? disabled : false} key={key} placeholder={placeholder ? placeholder :""} style={{width: `${width ? width :90/length}%`}}/>
        } else if (style === 'numberInput') {
            text = <InputNumber onChange={this.numberInputChange.bind(this,fieldName,defaultValues['loanTotalPriceLowercase'])} precision={2} size={this.props.size} max={100} min={0} onBlur={this.numberChange.bind(this,fieldName)} disabled={disabled ? disabled : false} key={key} placeholder={placeholder ? placeholder :""} style={{width: `${width ? width :90/length}%`}}/>
        } else if (style === 'data') {
            text =<DatePicker size={this.props.size} disabled={disabled ? disabled : false} showTime = {format? false : true} format={`${format ? format: "YYYY-MM-DD HH:mm:ss"}`} key={key} locale={zh_CN} placeholder={placeholder ? placeholder :"年/月/日"} style={{width: `${width ? width :90/length}%`}}/>
        } else if (style === 'dataRange') {
            text = <RangePicker size={this.props.size} disabled={disabled ? disabled : false} showTime = {format? false : true} format={`${format ? format: "YYYY-MM-DD HH:mm:ss"}`} key={key} locale={zh_CN} style={{width: `${width ? width :90/length}%`}}/>
        } else if (style === 'textarea') {
            text =<textarea disabled={disabled ? disabled : false}  placeholder={placeholder ? placeholder :""} style={{width: `${width ? width :90/length}%`}}></textarea>
        } else if (style === 'inputSelect') {
            const options = this.state.amAddressData.map(d => <Option key={d.value}>{d.value}</Option>);
            text =
            <Select
                size={this.props.size}
                disabled={disabled ? disabled : false}
                showSearch
                showArrow={false}
                optionFilterProp="children"
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                onFocus={this.amAddressFocus}
                onBlur={this.amAddressBlur}
                filterOption={false}
                notFoundContent={null}
            >
            {options}
            </Select>   
        } else if (style === 'select') {
            text =<Select onChange={this.receiptTypeChange.bind(this,defaultValues)} size={this.props.size} disabled={disabled ? disabled : false} allowClear={true} mode={mode ? "multiple" : ''} key={key} placeholder={placeholder ? placeholder :"请选择"} style={{width: `${width ? width :90/length}%`}}>
                
                {
                    value.length ? value.map((val,index)=>
                    <Option value={val.value} key={index}>{val.text}</Option>
                ) : null
                }
            </Select>
        } else if (style === 'court' || style === 'area') { 
            
            text = style === 'court' ? <Cascader size={this.props.size} changeOnSelect disabled={disabled ? disabled : false} style={{width: `${width ? width :90/length}%`}} placeholder={placeholder ? placeholder :"请选择"} options={this.state.courtList}/> :
            <Cascader size={this.props.size} disabled={disabled ? disabled : false} style={{width: `${width ? width :90/length}%`}} placeholder={placeholder ? placeholder :"请选择"} options={this.state.areaList}/>
        } else if (style === 'proxyReceipt' || style === 'loanType' || style === 'organ' || style === 'loanTerm' || style === 'repaymentMode') {
            let selectvalue = [];
            switch (style) {
                case 'loanType': selectvalue = this.state.loanTypeAll;break;
                case 'organ': selectvalue = this.state.organAll;break;
                case 'loanTerm': selectvalue = this.state.loanTermAll;break;
                case 'repaymentMode': selectvalue = this.state.repaymentModeAll;break;
                case 'proxyReceipt': selectvalue = this.state.proxyReceiptAll;break;
                default: selectvalue = [];
            }
            console.log('selectvalue',style,selectvalue)
            text =<Select onChange={this.selectChange.bind(this,style,defaultValues['loanTotalPriceLowercase'])} size={this.props.size} disabled={disabled ? disabled : false} allowClear={true} mode={mode ? "multiple" : ''} key={key} placeholder={placeholder ? placeholder :"请选择"} style={{width: `${width ? width :90/length}%`}}>
                {
                    selectvalue.length ? selectvalue.map((val,index)=>
                    <Option value={val.id ? val.id : val.muId} key={index}>{this.optionValueShow(val)}</Option>
                ): null
                }
            </Select>
        }
        return text; 
    }

    optionValueShow = (val) => {
        if (val.name) {
            return val.name
        } else if (val.companyName) {
            return val.companyName
        } else if (val.muName) {
            return val.muName
        }
    }

    _add = () => {
        const { form } = this.props;
        // // can use data-binding to get
        const keys = form.getFieldValue('emergencyKeys');
        if (keys.length === 5) {
            return;
        } 
        const nextKeys = keys.concat(this.state.uuid);
        this.setState({
            uuid: this.state.uuid+1
        });
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            emergencyKeys: nextKeys,
        });
    }

    _remove = (k) => {
        
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('emergencyKeys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            emergencyKeys: keys.filter(key => key !== k),
        });
    }

    _addHtmlText = (child,isRequired) => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { warrantSituation } = this.state;
        let emergencyKeys = []
        // if (!this.props.ifShow) {
            getFieldDecorator('emergencyKeys', { initialValue: this.state.keyArray});
            emergencyKeys = getFieldValue('emergencyKeys');
        // } else {
        //     emergencyKeys = this.state.keyArray

        // }
        // console.log(getFieldValue('emergencyKeys'))
        const initialValueDo = (index,item) => {
            let text = '';
            if (warrantSituation[index] && warrantSituation[index][item.fieldName]) {
                if (item.fieldName === 'cardDate') {
                    text = moment(`${warrantSituation[index][item.fieldName]}`, 'YYYY-MM-DD')
                } else {
                    text =  warrantSituation[index][item.fieldName]
                }
            } else if (item.disabledText) {
                text = item.disabledText[index];
            } else {
                text = undefined;
            }
            return text;
        }
        const formItems = emergencyKeys.map((k, index) => {
        return (
            <span key={index} style={{position: 'relative'}}>
                {child.map((item,key)=>
                    <span key={key}>
                        {item.beforeText && <span className="number-bettw">
                            {item.beforeText}
                        </span>}
                        {getFieldDecorator(`${item.fieldName}[${k}]`,{
                            initialValue: initialValueDo(index,item),
                            rules: [{ required: isRequired, message: '必填项!' }]
                        })(
                            this.inputBoxShow(null,item.fieldName,key,item.style,item.value,child.length,item.placeholder,item.width,item.mode,item.format,item.disabled && item.disabledText && item.disabledText[index]? true : false, item.disabledText && item.disabledText[index]? item.disabledText[index] : false)
                        )}
                        {item.unit && <span className="number-bettw">
                            {item.unit}
                        </span>}
                        
                </span>)}
                {index === 0 && <Icon type="plus-circle-o" className="add_icon" onClick={this._add}/>}
                {index > 2 && <Icon type="close" className="add_icon" onClick={() => this._remove(k)}/>}
            </span>
            );
        })
        return formItems;
    }
    initialValueDo = (style,data,fieldName,defaultValue) => {
        if (style === 'inputSelect') {
            if (data[fieldName]) {
                return data[fieldName]
            } else {
                return this.state.amAddressValue
            }
        } else if (fieldName === 'plarformProxyOpeningBank') {
            return sessionStorage.getItem('plarformProxyOpeningBankValue') ? sessionStorage.getItem('plarformProxyOpeningBankValue') : undefined
        } else if (fieldName === 'platformProxyAccount') {
            return sessionStorage.getItem('platformProxyAccountValue') ? sessionStorage.getItem('platformProxyAccountValue') : undefined
        } else if (fieldName === 'platformGuarantor') {
            return sessionStorage.getItem('platformGuarantorValue') ? sessionStorage.getItem('platformGuarantorValue') : undefined
        } else if (fieldName === 'guarantyGuarantorName') {
            return sessionStorage.getItem('guarantyGuarantorNameValue') ? sessionStorage.getItem('guarantyGuarantorNameValue') : undefined
        } else if (fieldName === 'guarantyGuarantorUscc') {
            return sessionStorage.getItem('guarantyGuarantorUsccValue') ? sessionStorage.getItem('guarantyGuarantorUsccValue') : undefined
        } else if (fieldName === 'guarantyGuarantorAddress') {
            return sessionStorage.getItem('guarantyGuarantorAddressValue') ? sessionStorage.getItem('guarantyGuarantorAddressValue') : undefined
        } else if (fieldName === 'interestLowercase') {
            return this.state.interestLowercaseValue
        } else if (fieldName === 'interestUppercase') {
            return this.state.interestUppercaseValue
        } else if (fieldName === 'totalRepaymentInterestLowercase') {
            return this.state.totalRepaymentInterestLowercaseValue
        } else if (fieldName === 'totalRepaymentInterestUppercase') {
            return this.state.totalRepaymentInterestUppercaseValue
        } else if (fieldName === 'infoServiceTotalFeeLowercase') {
            return this.state.infoServiceTotalFeeLowercaseValue
        } else if (fieldName === 'infoServiceTotalFeeUppercase') {
            return this.state.infoServiceTotalFeeUppercaseValue
        } else if (fieldName === 'matchFlag') {
            return data[fieldName] && !this.state.matchFlagChange ? data[fieldName] : this.state.matchFlagVal
        } else if (defaultValue && !data[fieldName]) {
            return defaultValue
        } else if (style === 'data' && data[fieldName]) {
            return moment(`${data[fieldName]}`, dateFormat)
        } else if (style === 'court') {
            return data['sysOffice'] && data['sysUser'] && data['officeProvince'] && data['officeCity'] ? [data['officeProvince'],data['officeCity'],data['sysOffice'],data['sysUser']] : []
        } else if (style === 'area') {
            return data['province'] && data['city'] && data['area'] ? [data['province'],data['city'],data['area']] : []
        } else if (fieldName === 'file') {
            return data['file'] ? JSON.parse(data['file']) : undefined
        } else if (data[fieldName] || data[fieldName] === 0) {
            return data[fieldName]
        }
        return undefined
    }
    
    numberInputShow = (fieldName,defaultValues) => {
        return <NumericInputBox form={this.props.form} fieldName={fieldName} defaultValue={defaultValues[fieldName]? defaultValues[fieldName]: ''}/>
    }

    getFieldDecoratorOption = (item,isRequired,defaultValues) => {
        if (item.ifNumber) {
            return {
                initialValue: this.initialValueDo(item.style,defaultValues,item.fieldName,item.defaultValue),
                rules: [{ 
                     required: isRequired,
                     message: '只能填入数字，必填项!' 
                }],
                getValueFromEvent: (event) => {
                    return event.target.value.replace(/\D/g,'')
                }
             }
        } else {
            return {
                initialValue: this.initialValueDo(item.style,defaultValues,item.fieldName,item.defaultValue),
                rules: [{ 
                     required: isRequired,
                     message: '必填项!' 
                }]
             }
        }
    }
    searchContent = (index,label,child,isRequired,operation,checkName) => {
        const {getFieldDecorator} = this.props.form;
        const { defaultValues } = this.state;

        const text =  checkName === '公司名称检验' ? 
                <FormItem label={label} key={index} validateStatus={this.state.companyNameChecked}>
                    {
                        operation ? this._addHtmlText(child,isRequired):
                        child.map((item,key)=>
                            <span key={key}>
                                {item.beforeText && <span className="number-bettw">
                                    {item.beforeText}
                                </span>}
                            {item.style === 'number' ? this.numberInputShow(item.fieldName,defaultValues):
                                getFieldDecorator(item.fieldName,this.getFieldDecoratorOption(item,isRequired,defaultValues))(
                                    this.inputBoxShow(defaultValues,item.fieldName,key,item.style,item.value,child.length,item.placeholder,item.width,item.mode,item.format,!item.disabled? false : true)
                                )}
                                {item.unit && <span className="number-bettw">
                                    {item.unit}
                                </span>}
                                
                            </span>
                        ) 
                    }   
                </FormItem>: 
                <FormItem label={label} key={index}>
                        {
                            operation ? this._addHtmlText(child,isRequired):
                            child.map((item,key)=>
                                <span key={key}>
                                    {item.beforeText && <span className="number-bettw">
                                        {item.beforeText}
                                    </span>}
                                   {item.style === 'number' ? this.numberInputShow(item.fieldName,defaultValues):
                                    getFieldDecorator(item.fieldName,this.getFieldDecoratorOption(item,isRequired,defaultValues))(
                                        this.inputBoxShow(defaultValues,item.fieldName,key,item.style,item.value,child.length,item.placeholder,item.width,item.mode,item.format,!item.disabled? false : true)
                                    )}
                                    {item.unit && <span className="number-bettw">
                                        {item.unit}
                                    </span>}
                                    
                                </span>
                            ) 
                        }   
                    </FormItem>;
        
        return text
    }
    showValueDo = (value,style,defaultValues,fieldName) => {
        let text = defaultValues[fieldName];
        if (style === 'select') {
            if (fieldName === 'file' && text && isArray(JSON.parse(text))) {
                let textJson = [];
                for (let item of value){
                    for (let val of JSON.parse(text)) {
                        if (item.value === val){
                            textJson.push(item.text);
                        }
                    }
                    
                }
                return textJson.join('、');
            }
            for (let item of value){
                if (item.value === defaultValues[fieldName]){
                    return text = item.text;
                }
            }
        }else if (style === 'court') {
            text = defaultValues['sysOffice'] && defaultValues['sysUser'] && defaultValues['officeProvince'] && defaultValues['officeCity'] ? `${defaultValues['officeProvince']} - ${defaultValues['officeCity']} - ${defaultValues['sysOffice']} - ${defaultValues['sysUser']}` : ''
            return text
        } else if (style === 'area') {
            text = defaultValues['province'] && defaultValues['city'] && defaultValues['area'] ? `${defaultValues['province']}-${defaultValues['city']}-${defaultValues['area']}` : ''
            return text
        } else if (style === 'proxyReceipt' || style === 'loanType' || style === 'organ' || style === 'loanTerm' || style === 'repaymentMode') {
            let selectvalue = [];
            switch (style) {
                case 'loanType': selectvalue = this.state.loanTypeAll;break;
                case 'organ': selectvalue = this.state.organAll;break;
                case 'loanTerm': selectvalue = this.state.loanTermAll;break;
                case 'repaymentMode': selectvalue = this.state.repaymentModeAll;break;
                case 'proxyReceipt': selectvalue = this.state.proxyReceiptAll;break;
                default: selectvalue = [];
            }
            for (let item of selectvalue){
                if (item.id === defaultValues[fieldName]){
                    return text = item.name ? item.name : item.companyName;
                }
            }
            return text;
        } 
        return text; 
    }
    _addShowHtmlText = (child) => {
        const text = this.state.warrantSituation.map((item,index)=>
           <span key={index} className={ index> 0 ? 'margin_left_70' : ''}>
               {index+1}、
                {
                    child.map((val,key)=>
                    <span key={key}>
                        {val.showText}：{item[val.fieldName]} 
                        <span className="number-bettw_10"></span>
                    </span>
                )
                }
                <br></br>
            </span>
        )
        return text
    }
    showContent = (index,label,child,operation) => {
        const { defaultValues } = this.state;
        const text = <span key={index}>
                        <span>{label}{`${label? '：': ''}`}</span>
                        {
                            operation ? this._addShowHtmlText(child):
                            child.map((item,key)=>
                                <span key={key}>
                                    {item.beforeText && <span className="number-bettw">
                                        {item.beforeText}
                                    </span>}
                                    {this.showValueDo(item.value,item.style,defaultValues,item.fieldName)}
                                    {item.unit && <span className="number-bettw">
                                        {item.unit}
                                    </span>}
                                    
                                </span>
                            ) 
                        }   
                    </span>;
        
        return text
    }
    render() {
        const { ColMd, searchArr, ColSm } = this.props;
        return (
                <Row className="flex-wrap-wrap flex">
                    {searchArr.length ?
                        searchArr.map((item,index)=>
                        <Col md={24} xl={item.ColMd ? item.ColMd : ColMd} lg={item.ColSm ? item.ColSm : ColSm} key={index} className={`show_box ${item.class_name ? item.class_name : ''}`}>
                            {this.props.isShow ? 
                                this.showContent(index,item.label,item.child,item.operation) :
                                this.searchContent(index,item.label,item.child,item.isRequired,item.operation,item.checkName)}
                        </Col>
                    ) : null
                    }
                </Row>                
        );
    }
}
export default FormSet