//const prefix = '/lhb-manage/a/rest/credit/weixin'; // api地址前缀
const prefix = '';
const apis = (config => {
    Object.keys(config).forEach((item) => {
        config[item] = `${prefix}${config[item]}`;
    });
    return config;
})({
    login: '/login',//登录
    updatepwd: '/login/updPassword',//修改密码
    receiptManage: '/receipt-manage',//收件明细管理列表
    receiptManageSave: '/receipt-manage/save',//收件明细管理新增
    receiptManageDel: '/receipt-manage/del',//收件明细管理删除
    receiptManageQuery: '/receipt-manage/query',//收件明细管理查询详情
    receiptManageUpdate: '/receipt-manage/update',//收件明细管理编辑保存
    companyBaseDel: '/company-base/del',//公司管理-基本信息-删除
    companyBase: '/company-base',//公司管理-基本信息-列表
    companyBaseSave: '/company-base/save',//公司管理-基本信息-新增
    companyBaseQuery: '/company-base/query',//公司管理-基本信息-详情
    companyBaseUpdate: '/company-base/update',//公司管理-基本信息-编辑保存
    companyJudicial: '/company-judicial',//公司管理-司法信息-列表
    companyJudicialQuery: '/company-judicial/edit',//公司管理-司法信息-详情
    companyJudicialUpdate: '/company-judicial/save',//公司管理-司法信息-编辑保存
    companyIc: '/company-ic',//公司管理-工商信息-列表
    companyIcQuery: '/company-ic/edit',//公司管理-工商信息-详情
    companyIcUpdate: '/company-ic/save',//公司管理-工商信息-编辑保存
    companyAccount: '/company-accout',//公司管理-账户信息-列表
    companyAccountQuery: '/company-accout/edit',//公司管理-账户信息-详情
    companyAccountUpdate: '/company-accout/save',//公司管理-账户信息-编辑保存
    company: '/company',//公司管理-列表
    companyQuery: '/company/edit',//公司管理-详情
    companyUpdate: '/company/save',//公司管理-编辑保存
    companyDownload: '/company/downLoadExcel',//公司管理下载
    cyberbankManage: '/cyberbank-manage',//网银验收-列表
    cyberbankManageQuery: '/cyberbank-manage/edit',//网银验收-详情
    cyberbankManageUpdate: '/cyberbank-manage/save',//网银验收-编辑保存
    cyberbankManageSubmit: '/cyberbank-manage/tempSave',//网银验收-编辑提交
    cyberbankCheckPdf: '/cyberbank-manage/checkPdf',//检验网银盾账户密码数据
    mortgageUser: '/mortgage-user',//抵押权人管理列表
    mortgageUserDel: '/mortgage-user/del',//抵押权人管理删除
    mortgageUserQuery: '/mortgage-user/editQuery',//抵押权人管理编辑查看
    mortgageUserUpdate: '/mortgage-user/update',//抵押权人管理编辑保存
    mortgageUserSave: '/mortgage-user/save',//抵押权人管理新增保存
    assetsManage: '/assets-manage',//资产管理列表
    checkCompanyName: '/company-base/checkCompanyName',//校验公司名称是否重复
    assetsManageQuery: '/assets-manage/editQuery',//资产管理编辑查看
    assetsManageUpdate: '/assets-manage/tempSsave',//资产管理保存
    assetsManageSubmit: '/assets-manage/save',//资产管理提交
    assetsManageDelFile: '/assets-manage/delFile',//资产管理附件删除
    companyBaseImportExcel: '/company-base/importExcel',//资产管理-基本信息-信息导入
    companyBaseImportExcelSub: '/company-base/importSub',//资产管理-基本信息-信息导入提交
    loanTypeAll: '/loan-type/selectAll',//数据字典-查询所有贷款类别
    loanTermAll: '/loan-term/selectAll',//数据字典-查询所有贷款期限
    repaymentModeAll: '/repayment-mode/selectAll',//数据字典-查询所有平台还款方式
    organAll: '/organ/selectAll',//数据字典-查询所有所属机构
    assetsMatchList: '/assets-match',//资产匹配-列表查询
    mortgageUserAll: '/mortgage-user/selectAll',//获取所有抵押权人
    assetsManageAll: '/assets-manage/selectAll',//查询满足匹配条件的所有资产列表
    companyBaseAll: '/company-base/selectAll',//查询满足匹配条件的所有公司
    assetsMatchAdd: '/assets-match/add',//资产匹配新增
    companyMatchRecord: '/company-base/selectMatchRecord',//查询公司的匹配记录
    assetsMatchRecord: '/assets-manage/selectMatchRecord',//查询资产的匹配记录
    subjectDetail: '/subject-detail',//标的明细列表
    subjectDetailEditQuery: '/subject-detail/editQuery',//标的明细编辑查看
    subjectDelFile: '/subject-detail-enclosure/delFile',//标的明细图片删除
    subjectDetailEditSave: '/subject-detail/editSave',//标的明细编辑保存
    cyberbankManageImportExcel: '/cyberbank-manage/importExcel',//网银验收管理-信息导入
    cyberbankManageImportSub: '/cyberbank-manage/importSub',//网银验收管理-信息导入提交
    companyAccoutImportExcel: '/company-accout/importExcel',//公司信息-账户信息-信息导入
    companyAccoutImportSub: '/company-accout/importSub',//公司信息-账户信息-信息导入
    companyIcImportExcel: '/company-ic/importExcel',//公司信息-工商信息-信息导入
    companyIcImportSub: '/company-ic/importSub',//公司信息-工商信息-信息导入
});

export default apis;