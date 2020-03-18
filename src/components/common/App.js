import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout,BackTop,Spin} from 'antd';
import 'style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import ReceiptManage from 'page/receipt-manage';
import CompanyBase from 'page/company/company-base';
import CompanyBaseDetail from 'page/company/company-base/detail/company-base-detail';
import CompanyJudicial from 'page/company/company-judicial';
import CompanyJudicialDetail from 'page/company/company-judicial/detail/company-judicial-detail';
import CompanyIc from 'page/company/company-ic';
import CompanyIcDetail from 'page/company/company-ic/detail/company-ic-detail';
import CompanyAccount from 'page/company/company-account';
import CompanyAccountDetail from 'page/company/company-account/detail/company-account-detail';
import Company from 'page/company';
import CompanyAllDetail from 'page/company/detail/company-detail';
import CyberbankManage from 'page/cyberbank-manage';
import CyberbankManageDetail from 'page/cyberbank-manage/detail/cyberbank-manage-detail';
import MortgageUser from 'page/mortgage-user';
import AssetsManage from 'page/assets-manage';
import AssetsManageDetail from 'page/assets-manage/detail/assets-manage-detail';
import AssetsMatchManage from 'page/assets-match';
import AssetsMatchDetail from 'page/assets-match/detail/assets-match-detail';
import SubjectDetailManage from 'page/subject-detail';
import SubjectDetailDetail from 'page/subject-detail/detail/subject-detail-detail';
import NotFound from 'components/NotFound';

const {Content} = Layout;

export default class App extends Component {
    state = {
        loading: false,
        collapsed: localStorage.getItem("mspa_SiderCollapsed") === "true",
        pageRouters: [
            {
                href: '/project/subject-detail/detail/:id/:ifShow/:loanTypeDesc',
                component: SubjectDetailDetail
            },
            {
                href: '/project/assets-match/detail',
                component: AssetsMatchDetail
            },
            {
                href: '/project/subject-detail',
                component: SubjectDetailManage
            },
            {
                href: '/project/assets-match',
                component: AssetsMatchManage
            },
            {
                href: '/project/assets-manage',
                component: AssetsManage
            },
            {
                href: '/project/assets-manage/detail/:id/:ifShow',
                component: AssetsManageDetail
            },
            {
                href: '/project/mortgage-user',
                component: MortgageUser
            },
            {
                href: '/project/receipt-manage',
                component: ReceiptManage
            },
            {
                href: '/project/company-base',
                component: CompanyBase
            },
            {
                href: '/project/company-base/detail/:id/:ifShow',
                component: CompanyBaseDetail
            },
            {
                href: '/project/company-judicial',
                component: CompanyJudicial
            },
            {
                href: '/project/company-judicial/detail/:id/:ifShow',
                component: CompanyJudicialDetail
            },
            {
                href: '/project/company-ic',
                component: CompanyIc
            },
            {
                href: '/project/company-ic/detail/:id/:ifShow',
                component: CompanyIcDetail
            },
            {
                href: '/project/company-account',
                component: CompanyAccount
            },
            {
                href: '/project/company-account/detail/:id/:ifShow/:cyberBankStatus',
                component: CompanyAccountDetail
            },
            {
                href: '/project/company',
                component: Company
            },
            {
                href: '/project/company/detail/:id/:ifShow',
                component: CompanyAllDetail
            },
            {
                href: '/project/cyberbank-manage',
                component: CyberbankManage
            },
            {
                href: '/project/cyberbank-manage/detail/:id/:ifShow/:ifSupplement',
                component: CyberbankManageDetail
            },
        ]
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("mspa_SiderCollapsed") === null) {
            localStorage.setItem("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed,pageRouters} = this.state;
        const {location} = this.props;
        let name;
        if (sessionStorage.getItem("mspa_user") === null) {
            return <Redirect to="/login"/>
        } else {
            name = location.state === undefined ? JSON.parse(sessionStorage.getItem("mspa_user")).username : location.state.username;
        }
        let isSmallSider = false;
        if (this.props.location.pathname.indexOf('asset_detail/1') !== -1) {
            isSmallSider = true;
        }
        return (
            <div className='yt-admin-framework'>
                <Spin key="yt-admin-framework-layout" spinning={this.state.loading} size="large">
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>
                    <SiderCustom collapsed={collapsed} path={location.pathname}/>
                    <Content className="yt-admin-framework-content" style={{marginLeft : `${isSmallSider? '340px' : '200px'}`}}>
                    <Switch>
                            {pageRouters.map((item,index)=>
                                <Route exact key={index} path={item.href} component={item.component} />
                            )}
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    
                    <BackTop style={{right: '40px', bottom: '60px'}}/>
                </Spin>
            </div>
        );
    }
}
