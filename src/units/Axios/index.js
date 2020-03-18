import { http } from './http';
import apis from './apis';

export function updatepwd(params = {}) {
    return http.postForm(apis.updatepwd, params)
}

export function login(params = {},urlBefore = '') {
    return http.get(apis.login, params,{}, urlBefore)
}

export function receiptManage(params = {}) {
    return http.post(apis.receiptManage, params)
}

export function receiptManageSave(params = {}) {
    return http.post(apis.receiptManageSave, params);
}

export function receiptManageDel(params = {},urlBefore = '') {
    return http.delete(apis.receiptManageDel, params, {}, urlBefore)
}

export function receiptManageUpdate(params = {},urlBefore = '') {
    return http.put(apis.receiptManageUpdate, params, {}, urlBefore)
}

export function receiptManageQuery(params = {},urlBefore = '') {
    return http.get(apis.receiptManageQuery, params,{}, urlBefore)
}

export function companyBase(params = {}) {
    return http.post(apis.companyBase, params)
}

export function companyBaseDel(params = {},urlBefore = '') {
    return http.delete(apis.companyBaseDel, params, {}, urlBefore)
}

export function companyBaseSave(params = {}, config = {}) {
    return http.post(apis.companyBaseSave, params, config)
}

export function companyBaseQuery(params = {},urlBefore = '') {
    return http.get(apis.companyBaseQuery, params,{}, urlBefore)
}

export function companyBaseUpdate(params = {},urlBefore = '') {
    return http.put(apis.companyBaseUpdate, params, {}, urlBefore)
}

export function companyJudicial(params = {}) {
    return http.post(apis.companyJudicial, params)
}

export function companyJudicialQuery(params = {},urlBefore = '') {
    return http.get(apis.companyJudicialQuery, params,{}, urlBefore)
}

export function companyJudicialUpdate(params = {},urlBefore = '') {
    return http.post(apis.companyJudicialUpdate, params, {}, urlBefore)
}

export function companyIc(params = {}) {
    return http.post(apis.companyIc, params)
}

export function companyIcQuery(params = {},urlBefore = '') {
    return http.get(apis.companyIcQuery, params,{}, urlBefore)
}

export function companyIcUpdate(params = {},urlBefore = '') {
    return http.post(apis.companyIcUpdate, params, {}, urlBefore)
}

export function companyAccount(params = {}) {
    return http.post(apis.companyAccount, params)
}

export function companyAccountQuery(params = {},urlBefore = '') {
    return http.get(apis.companyAccountQuery, params,{}, urlBefore)
}

export function companyAccountUpdate(params = {},urlBefore = '') {
    return http.post(apis.companyAccountUpdate, params, {}, urlBefore)
}

export function company(params = {}) {
    return http.post(apis.company, params)
}

export function companyQuery(params = {},urlBefore = '') {
    return http.get(apis.companyQuery, params,{}, urlBefore)
}

export function companyUpdate(params = {},urlBefore = '') {
    return http.postForm(apis.companyUpdate, params, {}, urlBefore)
}

export function companyDownload(params = {},urlBefore = '') {
    return http.post(apis.companyDownload, params, {}, urlBefore)
}

export function cyberbankManage(params = {}) {
    return http.post(apis.cyberbankManage, params)
}

export function cyberbankManageQuery(params = {},urlBefore = '') {
    return http.get(apis.cyberbankManageQuery, params,{}, urlBefore)
}

export function cyberbankManageUpdate(params = {},urlBefore = '') {
    return http.post(apis.cyberbankManageUpdate, params, {}, urlBefore)
}

export function cyberbankCheckPdf(params = {},urlBefore = '') {
    return http.get(apis.cyberbankCheckPdf, params,{}, urlBefore)
}

export function cyberbankManageSubmit(params = {},urlBefore = '') {
    return http.post(apis.cyberbankManageSubmit, params, {}, urlBefore)
}

export function mortgageUser(params = {},urlBefore = '') {
    return http.post(apis.mortgageUser, params, {}, urlBefore)
}

export function mortgageUserDel(params = {},urlBefore = '') {
    return http.delete(apis.mortgageUserDel, params, {}, urlBefore)
}

export function mortgageUserQuery(params = {},urlBefore = '') {
    return http.get(apis.mortgageUserQuery, params,{}, urlBefore)
}

export function mortgageUserUpdate(params = {},urlBefore = '') {
    return http.put(apis.mortgageUserUpdate, params, {}, urlBefore)
}

export function mortgageUserSave(params = {}) {
    return http.post(apis.mortgageUserSave, params);
}

export function assetsManage(params = {}) {
    return http.post(apis.assetsManage, params);
}

export function checkCompanyName(params = {}) {
    return http.postForm(apis.checkCompanyName, params);
}

export function assetsManageQuery(params = {},urlBefore = '') {
    return http.get(apis.assetsManageQuery, params,{}, urlBefore)
}

export function assetsManageUpdate(params = {}) {
    return http.post(apis.assetsManageUpdate, params);
}

export function assetsManageSubmit(params = {}) {
    return http.post(apis.assetsManageSubmit, params);
}

export function assetsManageDelFile(params = {}) {
    return http.postForm(apis.assetsManageDelFile, params);
}

export function companyBaseImportExcel(params = {}) {
    return http.postForm(apis.companyBaseImportExcel, params);
}

export function companyBaseImportExcelSub(params = {}) {
    return http.postForm(apis.companyBaseImportExcelSub, params);
}

export function loanTypeAll(params = {}) {
    return http.postForm(apis.loanTypeAll, params);
}

export function loanTermAll(params = {}) {
    return http.postForm(apis.loanTermAll, params);
}

export function repaymentModeAll(params = {}) {
    return http.postForm(apis.repaymentModeAll, params);
}

export function organAll(params = {}) {
    return http.postForm(apis.organAll, params);
}

export function assetsMatchList(params = {}) {
    return http.post(apis.assetsMatchList, params);
}

export function mortgageUserAll(params = {}) {
    return http.postForm(apis.mortgageUserAll, params);
}

export function assetsManageAll(params = {}) {
    return http.postForm(apis.assetsManageAll, params);
}
export function companyBaseAll(params = {}) {
    return http.postForm(apis.companyBaseAll, params);
}

export function assetsMatchAdd(params = {}) {
    return http.post(apis.assetsMatchAdd, params);
}

export function companyMatchRecord(params = {},urlBefore = '') {
    return http.get(apis.companyMatchRecord, params,{}, urlBefore)
}

export function assetsMatchRecord(params = {},urlBefore = '') {
    return http.get(apis.assetsMatchRecord, params,{}, urlBefore)
}

export function subjectDetail(params = {}) {
    return http.post(apis.subjectDetail, params);
}

export function subjectDetailEditQuery(params = {},urlBefore = '') {
    return http.get(apis.subjectDetailEditQuery, params,{}, urlBefore)
}

export function subjectDelFile(params = {}) {
    return http.postForm(apis.subjectDelFile, params);
}

export function subjectDetailEditSave(params = {}) {
    return http.post(apis.subjectDetailEditSave, params);
}

export function cyberbankManageImportExcel(params = {}) {
    return http.postForm(apis.cyberbankManageImportExcel, params);
}

export function cyberbankManageImportSub(params = {}) {
    return http.postForm(apis.cyberbankManageImportSub, params);
}

export function companyAccoutImportExcel(params = {}) {
    return http.postForm(apis.companyAccoutImportExcel, params);
}

export function companyAccoutImportSub(params = {}) {
    return http.postForm(apis.companyAccoutImportSub, params);
}

export function companyIcImportExcel(params = {}) {
    return http.postForm(apis.companyIcImportExcel, params);
}

export function companyIcImportSub(params = {}) {
    return http.postForm(apis.companyIcImportSub, params);
}



























