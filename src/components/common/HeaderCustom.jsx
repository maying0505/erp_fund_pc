import React, { Component } from 'react';
import { Modal, Layout, Icon, Menu, message, Button, Divider, Form, Input, Spin } from 'antd';
import "./style.less";
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import * as HTTP from 'units/Axios';
import headerLogo from 'style/img/header_logo.png';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
// const SubMenu = Menu.SubMenu;


@withRouter
@inject('pageTitle') 
@observer 
class HeaderCustomForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: props.collapsed,
            visible: false,
            loading: false
        }
        this.logout = this.logout.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
    }
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
        });
    };
    logout(){
        sessionStorage.removeItem("mspa_user");
        this.props.history.push('/login');
    }
    back = () => {
        this.props.history.go(-1);
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleOk = async (e) => { 
        this.setState({
            loading: true,
        })
        let params = {};
        this.props.form.validateFields((err, values) => {
            params = values
        })
        try {
            const result = await HTTP.updatepwd({
                ...params
            });
            this.setState({
                loading: false,
            })
            message.success('修改成功！');
            this.logout();
        } catch (e) {
            this.setState({
                loading: false,
            })
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let isSmallSider = false;
        let isDetail = false;
        if (this.props.location.pathname.indexOf('asset_detail/1') !== -1) {
            isSmallSider = true;
        }
        if (this.props.location.pathname.indexOf('asset_detail') !== -1) {
            isDetail = true;
        }
        return(
            <Header style={{ background: '#F9F9F9', padding: 0 }} className="header yt-admin-framework-header">
                {/* <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.props.toggle}
                /> */}
                <div className="fl" style={{marginLeft : `${isSmallSider? '360px' : '240px'}`}}>
                    <img style={{height: '35px'}} src={headerLogo}/>
                    <Divider type="vertical" style={{height: '25px'}}/>
                    <span>{this.props.pageTitle.PageTitleT}</span>
                    {isDetail && <Button style={{marginLeft: '30px'}} icon={'rollback'} size={'small'} onClick={this.back}>
                        返回
                    </Button>}
                </div>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key={"user"}>
                    <Icon type="user" /><span>{this.props.username}</span>
                    </Menu.Item>
                    <Menu.Item key={"unlock"} onClick={this.showModal}>
                    <Icon type="unlock" /><span>修改密码</span>
                    </Menu.Item>
                    <SubMenu 
                        title={<span>
                            <Icon type="poweroff" />
                        </span>}
                        >
                        <Menu.Item key="logout" style={{textAlign:'center'}} className="logout">
                            <span onClick={this.logout}>退出</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
                <Modal
                    title="修改密码"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                    >
                    <Spin  spinning={this.state.loading}>
                        <Form>
                            <FormItem
                                label="原密码"
                            >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '必填' }],
                            })(
                                <Input type="password"/>
                            )}
                            </FormItem>
                            <FormItem
                                label="新密码"
                            >
                            {getFieldDecorator('newPassword', {
                                rules: [{ required: true, message: '必填' }],
                            })(
                                <Input type="password"/>
                            )}
                            </FormItem>
                            <FormItem
                                label="确认新密码"
                            >
                            {getFieldDecorator('verifyNewPassword', {
                                rules: [{ required: true, message: '必填' }],
                            })(
                                <Input type="password"/>
                            )}
                            </FormItem>
                        </Form>
                    </Spin>
                </Modal>
            </Header>
        )
    }
} 
const HeaderCustom = Form.create()(HeaderCustomForm)
export default HeaderCustom