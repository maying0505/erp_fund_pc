import React, { Component } from 'react';
import 'style/login.less';
import loginLogo from 'style/img/login_log.png';
import * as HTTP from 'units/Axios';
import { inject, observer } from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox, message, Spin } from 'antd';
const FormItem = Form.Item;

const login = [{
    username:'admin',
    password:'admin'
},{
    username:'zysoft',
    password:'zysoft'
}];


function PatchUser(values) {  //匹配用户
    const results = login.map(function(item){
        if(values.username === item.username && values.password === item.password){
            return 1;
        }else{
            return 0;
        }
    });
    return results.includes(1);
};

@inject('login') // 给组件注入其需要的 store，指定对应的子 store 名称
@observer // 将组件转化为响应式组件
class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoding: false,
        loading: false,
    };

    componentWillMount() {
        sessionStorage.clear();
        // const { changeLoginState } = this.props.login;
        // changeLoginState(true); 
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this._loginFetch(values)
                // if(PatchUser(values)){
                //     this.setState({
                //         isLoding: true,
                //     });
                    
                //     localStorage.setItem('mspa_user',JSON.stringify(values));
                //     message.success('登录成功!'); //成功信息
                //     let that = this;
                //     setTimeout(function() { //延迟进入
                //         that.props.history.push({pathname:'/app',state:values});
                //     }, 2000);

                // }else{
                //     message.error('login failed!'); //失败信息
                // }
                
            }
        });
    };

    _loginFetch = async (params) => {
        this.setState({
            loading: true,
        });
        try {
            const result = await HTTP.login({},'/'+params.username+'/'+params.password);
            console.log('result', result);
            this.setState({
                loading: false,
            });
               
                sessionStorage.setItem('sidebarArr',JSON.stringify(result.data))
                sessionStorage.setItem('headPortrait',result.data.photo)
                sessionStorage.setItem('zoneOperator_cs',result.data4? result.data4 : '');
                sessionStorage.setItem('token_y',result.data2);
                sessionStorage.setItem('superadmin_cs',result.data3);
                sessionStorage.setItem('mspa_user',JSON.stringify(params));
                message.success('登录成功!'); //成功信息
                sessionStorage.setItem('pageTitle',result.data[0]?result.data[0].name:'');
                if (result.data[0]) {
                    // if (result.data[0].menuList) {
                    //     let childrenMenuList = result.data[0].menuList[0].childrenMenuList ? result.data[0].menuList[0].childrenMenuList : [];
                    //     let childrenMenuListJ = [];
                    //     childrenMenuList.map((item,index)=>
                    //         childrenMenuListJ.push(item.permission)
                    //     )
                    //     sessionStorage.setItem('childrenMenuList',JSON.stringify(childrenMenuListJ));
                    //     // this.props.history.push({pathname:result.data[0].menuList[0]?'/project/'+result.data[0].menuList[0].href:'/project',state:params});
                    // } else {
                        let childrenMenuList = result.data[0].childrenMenuList ? result.data[0].childrenMenuList : [];
                        let childrenMenuListJ = [];
                        childrenMenuList.map((item,index)=>
                            childrenMenuListJ.push(item.permission)
                        )
                        sessionStorage.setItem('childrenMenuList',JSON.stringify(childrenMenuListJ));
                    // }
                    this.props.history.push({pathname:result.data[0].href?'/project/'+result.data[0].href:'/project',state:params});
                } else {
                    this.props.history.push({pathname:'/project',state:params});
                }
                
            
        } catch (e) {
            this.setState({
                loading: false,
            });
            // message.error('登录失败!');
        }
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.isLoding?<Spin size="large" className="loading" />:
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <div className="text_center login-logo-img"><img src={loginLogo}/></div>
                        <div className="login-name">登录</div>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem style={{marginBottom:'0'}}>
                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )} */}
                            {/* <a className="login-form-forgot" href="" style={{float:'right'}}>忘记密码?</a> */}
                            <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            {/* Or <a href="">现在就去注册!</a> */}
                        </FormItem>
                    </Form>
                    {/* <a className="githubUrl" href="https://github.com/zhaoyu69/antd-spa"> </a> */}
                </div>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;