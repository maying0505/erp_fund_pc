import React, { Component } from 'react';
import { Icon, Layout, Menu, Divider } from 'antd';
import { inject, observer } from 'mobx-react';
import "./style.less";
import { withRouter } from 'react-router';
import receiptManage from 'style/img/receipt-manage.png';
import receiptManage1 from 'style/img/receipt-manage_1.png';
import company from 'style/img/company.png';
import company1 from 'style/img/company_1.png';
import cyberbankManage from 'style/img/cyberbank-manage.png';
import cyberbankManage1 from 'style/img/cyberbank-manage_1.png';
import assetsManage from 'style/img/assets-manage.png';
import assetsManage1 from 'style/img/assets-manage_1.png';
import mortgageUser from 'style/img/mortgage-user.png';
import mortgageUser1 from 'style/img/mortgage-user_1.png';
import assetsMatch from 'style/img/assets-match.png';
import assetsMatch1 from 'style/img/assets-match_1.png';
import subjectDetail from 'style/img/subject-detail.png';
import subjectDetail1 from 'style/img/subject-detail_1.png';
import open from 'style/img/open.png';
import retract from 'style/img/retract.png';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

@withRouter
@inject('pageTitle') 
@observer 
export default class SiderCustom extends Component{
    constructor(props){
        super(props);
        const { collapsed }= props;
        this.state = {
            ifOpen: true,
            ifOpenIcon: retract,
            iconArr: {
                "subject-detail": subjectDetail,
                "subject-detail_1": subjectDetail1,
                "assets-match": assetsMatch,
                "assets-match_1": assetsMatch1,
                "mortgage-user": mortgageUser,
                "mortgage-user_1": mortgageUser1,
                "assets-manage": assetsManage,
                "assets-manage_1": assetsManage1,
                "receipt-manage": receiptManage,
                "receipt-manage_1": receiptManage1,
                "company": company,
                "company_1": company1,
                "cyberbank-manage": cyberbankManage,
                "cyberbank-manage_1": cyberbankManage1
            },
            collapsed: collapsed,
            urlM: [],
            path: '',
            firstHide: true, //第一次先隐藏暴露的子菜单
            selectedKey: '', //选择的路径
            openKey: '', //打开的路径（选择的上一层）
        }
    }
    componentDidMount() {
        console.log('this.props.history',this.props.history)
        this.setMenuOpen(this.props);
        this.setState({urlM: sessionStorage.getItem('sidebarArr')? JSON.parse(sessionStorage.getItem('sidebarArr')):[]})
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps);
    }
    setMenuOpen = props => {
        const {path} = props;
        console.log('props',props,this.state.urlM)
        const { changePageTitle } = this.props.pageTitle;
        changePageTitle(sessionStorage.getItem('pageTitle') ? sessionStorage.getItem('pageTitle') : '');
        const sidebarArr = sessionStorage.getItem('sidebarArr')? JSON.parse(sessionStorage.getItem('sidebarArr')):[]
        for (let item of sidebarArr) {
            console.log('selectedKeyrrr',path,('/'+item.href))
            if (path.indexOf('/'+item.href) !== -1 && item.href !== '' ) {
                // changePageTitle(item.name);
                let pathArr = path.split('/');
                this.setState({
                    openKey: '/project/'+item.href,
                    selectedKey: '/' + pathArr[1]+ '/' + pathArr[2],
                    path: path
                },function(){
                    console.log('selectedKey',this.state.selectedKey,this.state.openKey)
                });
            }
        }
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    jumpPage = (key,name,childrenMenuList) => {
        childrenMenuList = childrenMenuList ?childrenMenuList : [];
        let childrenMenuListJ = [];
        childrenMenuList.map((item,idnex)=>
            childrenMenuListJ.push(item.permission)
        )
        sessionStorage.setItem('childrenMenuList',JSON.stringify(childrenMenuListJ));
        sessionStorage.setItem('pageTitle',name);
        this.props.history.push(key)
        // history.push(key);
    }
    _getItemIconByCode = (href) => {
        let selectedKeyArr = this.state.selectedKey.split("/");
        if (selectedKeyArr[2] === href) {
            return this.state.iconArr[href+'_1'] ? this.state.iconArr[href+'_1'] : this.state.iconArr['receipt-manage']
        } else {
            return this.state.iconArr[href] ? this.state.iconArr[href] : this.state.iconArr['receipt-manage']
        }
    };

    openDo = (e) => {
        e.stopPropagation();
        this.setState({
            ifOpen: !this.state.ifOpen,
        })
    }
    getSubMenu(item) {
        let menuList = [item];
        console.log('menuListitem',item)
        if (item.menuList) {
            menuList[0].ifFirstMenu = true;
            for (let val of item.menuList) {
                let secondMenu = val;
                secondMenu.ifSecondMenu = true;
                menuList.push(secondMenu)
            }
        }
        console.log('menuList',menuList)
        return menuList.map((item) =>{
            return (<Menu.Item className={`${item.ifSecondMenu ? 'second_menu' : ''} ${item.ifSecondMenu && !this.state.ifOpen ? 'no_open' : ''}`} key={`/project/${item.href}`} onClick={this.jumpPage.bind(this,`/project/${item.href}`,item.name,item.childrenMenuList)}>
                <span>
                    {!item.ifSecondMenu && <img className='sider_icon'
                    src={this._getItemIconByCode(item.href)}
                    alt={item.name}/>}
                    <span>{item.name}</span>
                    {item.ifFirstMenu && <img onClick={this.openDo} src={this.state.ifOpen ? retract : open} className="open_icon"/>}
                </span>
                {/* {item.menuList && <Icon type="down" className="sider_open_icon"/>} */}
            </Menu.Item>)
        }) 
        
        // return menuList.map((val) => {
        //     return (
        //         <Menu.Item
        //             key={`/project/${val.href}`}
        //             style={this.props.miniMode === true && {display: 'none', transition: 0.3}}
        //             onClick={this.jumpPage.bind(this,`/project/${val.href}`,val.name,val.childrenMenuList)}
        //         >
        //                 {
        //                     val.target &&
        //                     <img
        //                         className={'sidebar-menu-icon-size'}
        //                         src={this._getItemIconByCode(val.href)}
        //                         alt={val.name}
        //                     />
        //                 }
        //                 <span style={{color: 'white'}}>{val.name}</span>
        //         </Menu.Item>
        //     )
        // });
    }
    
    render(){
        const { collapsed, firstHide, openKey, selectedKey  } = this.state;
        const name = sessionStorage.getItem("mspa_user") ? JSON.parse(sessionStorage.getItem("mspa_user")).username : '';
        return(
            <div className="yt-admin-framework-sidebar flex">
                <Sider
                trigger={null}
                collapsed={collapsed}
                >
                        <div className="header_img_box">
                            {/* <img src={headPortrait}/> */}
                            <p className="text_canter">{name}</p>
                            <div className="text_canter">
                            您好！欢迎回来
                                {/* <span className="sett"><Icon type="setting" /><span style={{marginLeft: '5px'}}>设置</span></span> */}
                            </div>
                        </div>
                        <Divider/>
                        <Menu
                            style={{paddingTop: '20px'}}
                            theme="dark"
                            mode="inline"
                            selectedKeys={[selectedKey]}
                            onClick={this.menuClick}
                            onOpenChange={this.openMenu}
                            openKeys={firstHide ? null : [openKey]}
                        >
                            {
                                this.state.urlM.map((item,index)=>
                                    this.getSubMenu(item)
                                // item.menuList ?
                                // <SubMenu
                                //     selectable={false}
                                //     key={`/project/${item.href}`}
                                //     title={<span><img className={'sider_icon'}
                                //                     src={this._getItemIconByCode(item.href)}
                                //                     alt={item.name}/><span>{item.name}</span></span>}>
                                //     {
                                //         this.getSubMenu(item.menuList, index)
                                //     }
                                // </SubMenu>
                                // :
                                // <Menu.Item key={`/project/${item.href}`} onClick={this.jumpPage.bind(this,`/project/${item.href}`,item.name,item.childrenMenuList)}>
                                //     <span>
                                //         <img className='sider_icon'
                                //           src={this._getItemIconByCode(item.href)}
                                //           alt={item.name}/>
                                //         <span>{item.name}</span>
                                //     </span>
                                // </Menu.Item>
                            )
                            }
                        </Menu>
                </Sider>
            </div>
        )
    }
}