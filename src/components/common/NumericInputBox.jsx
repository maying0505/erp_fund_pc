import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Tooltip } from 'antd';
import { convertCurrency, formatNumber, delcommafy } from 'common/NumberFormat';
const maxNum = 100000000000;


class NumericInput extends React.Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        fieldName: PropTypes.string.isRequired,
        defaultValue: PropTypes.string
    };

    static defaultProps = {
        defaultValue: '',
    };
    constructor(props) {
        super(props);
        this.state = { 
            tooltipVisible: false,
            value: '',
            defaultValue: ''
        };
    }
    componentWillMount(){ //预加载数据
        this.propsDo(this.props)
        
    }
    componentWillReceiveProps(nextProps){ //组件接收到新的props时调用
        this.propsDo(nextProps)
    }

    propsDo = (props) => {
        if (props.defaultValue !== this.state.defaultValue) {
            this.setState({
                value: delcommafy(props.defaultValue),
                defaultValue: props.defaultValue,
            })
        }
    }

    onChange = (value) => {
        console.log('value',value)
        value = delcommafy(value);
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
            this.setState({
                tooltipVisible: value && value !== '-' ? true : false
            })
            value += ''; 
            if (Number(value) > maxNum) {
                value = maxNum+''
            }
            this.setState({
                value: value
            })
        }
    }

    onBlur = (fieldName) => {
        this.setState({
            tooltipVisible: false
        })
        const { value } = this.state;
        if (value) {
            let setValue = {};
            let showNumber = formatNumber(Number(value).toFixed(2),maxNum)
            setValue[fieldName] = showNumber.replace(/\$\s?|(,*)/g, '');
            this.props.form.setFieldsValue(setValue);
            this.setState({
                value: Number(value).toFixed(2)
            })
        }
    }
    onFocus = (e) => {
        console.log('value1',e.target)
        this.setState({
            tooltipVisible: this.state.value && this.state.value !== '-' ? true : false
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { fieldName } = this.props;
        const { defaultValue, value, tooltipVisible } = this.state;
        const title = value ? (
            <span className="numeric-input-title">
                {value !== '-' ? convertCurrency(value,maxNum) : '-'}
            </span>
        ) : '';
        return (
            <Tooltip
                trigger={['focus']}
                visible={tooltipVisible}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                {getFieldDecorator(this.props.fieldName, {
                    initialValue: defaultValue.replace(/\$\s?|(,*)/g, ''),
                    rules: [{ required: this.props.isRequired, message: '必填项!' }]
                })(
                     <InputNumber
                        style={{width: '90%'}}
                        onChange={this.onChange}
                        formatter={val => formatNumber(value)}
                        onBlur={() => this.onBlur(fieldName)}
                        onFocus={this.onFocus}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        max={maxNum}
                        step={'1'}
                        min={0}
                    />
                )}

            </Tooltip>
        );
    }
}

export default NumericInput
