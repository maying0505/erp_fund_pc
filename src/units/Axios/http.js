import axios from 'axios';
import {message} from 'antd';
import Qs from 'qs';
import {createHashHistory} from 'history'

// const DevUrl = 'http://en.nengpaifafu.com/pai-manage';
const DevUrl = 'http://39.104.178.102:8899';         // 开发http请求地址
// const DevUrl = 'http://192.168.2.120:7001';          // 开发http请求地址
// const DevUrl = 'http://192.168.2.19:9870'; //px
// const DevUrl = 'http://192.168.2.135:9870'; //yyj
const ProUrl = '/fund';
// 正式包http请求地址
let url = null;
const errMsg = '请求服务异常';

const Process_Env = ['development', 'production'];
let process_env = null;

switch (process.env.NODE_ENV) {
    case 'development':
    case  'test':
        url = DevUrl;
        process_env = Process_Env[0];
        break;
    case 'production':
        url = ProUrl;
        process_env = Process_Env[1];
        break;
    default:
        url = ProUrl;
        process_env = Process_Env[1];
        break;
}

class ResponseError extends Error {
    constructor(message, code, origin) {
        super(message);
        this.code = code;
        this.origin = origin;
    }
}

axios.defaults.baseURL = url;
axios.defaults.withCredentials = false;
axios.defaults.timeout = 20000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['Content-type'] = 'application/json; charset=UTF-8';

const pending = [];
let cancelToken = axios.CancelToken;
const removePending = (config) => {
    for (let p in pending) {
        if (pending[p].url === config.url + '&' + config.method) {
            pending[p].cancelFunc();
            pending.splice(p, 1);
        }
    }
};


const _onHandleError = (error) => {
    console.log('_onHandleError', error);
    if (process_env === Process_Env[0]) {
        if (error.response) {
            message.error(errMsg);
            const {data, status, header} = error.response;
            data && console.log("data", error.response.data);
            status && console.log('status', error.response.status);
            header && console.log('header', error.response.header);
        }
    }

    if (error && error.response && error.response.status === 666) {
        message.error('登录失效，请重新登录');
        createHashHistory().push('/login');
    } else {
        console.log('error.message', error.response.status);
        message.error(errMsg);
        throw new Error(error);
    }
};

axios.interceptors.request.use(config => {
    console.log('config', config)
    removePending(config);
    config.cancelToken = new cancelToken((func) => {
        pending.push({url: config.url + '&' + config.method, cancelFunc: func});
    });
    config.headers = {
        // 在此处添加Token
        token: sessionStorage.getItem('token_y'),
        ...config.headers
    };
    if (config.url.indexOf('/company/save') !== -1){
        // alert(1)
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        console.log('urlencoded',config.headers)
    }
    return config;
}, error => {
    _onHandleError(error);
});

axios.interceptors.response.use(response => {
    // 在这里你可以判断后台返回数据携带的请求码
    console.log('err response', response);
    removePending(response.config);

    const {status, data, header} = response;
    if (status === 200 && response.data && response.data.code === 0) {
        return data;
    } else {
        if (status === 666) {
            message.error('登录失效，请重新登录');
            createHashHistory().push('/login');
            return
        }
        // 非200请求
        message.error(response.data.msg ? response.data.msg : '请求失败');
        console.log('err response', response);
        throw new ResponseError(status, status, header);
    }
}, error => {
    console.log('err', error)
    _onHandleError(error);
});

const http = {};

http.get = function (url, params = {}, config = {}, urlBefore = '') {
    return axios.get(url+urlBefore, {params}, config);
};

http.post = function (url, params = {}, config = {}) {
    // params = Qs.stringify(params)
    return axios.post(url, params, config);
};

http.delete = function (url, params = {}, config = {}, urlBefore = '') {
    // params = Qs.stringify(params)
    return axios.delete(url+urlBefore, params, config);
};

http.put = function (url, params = {}, config = {}, urlBefore = '') {
    // params = Qs.stringify(params)
    return axios.put(url+urlBefore, params, config);
};

http.postForm = function (url, params = {}, config = {}) {
    var fd = new FormData();
    for (let i in params) {
        if (i === 'files') {
            params[i].forEach((file) => {
                fd.append('files', file);
            });
        } else {
            fd.append(i, params[i])
        }
    }
    console.log('formData',fd.get("files"))
    config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(url, fd, config);
};

const companyExcelUrl = url + '/company/excel';
const cyberbankDownLoadExcel = url + '/cyberbank-manage/excel';
const cyberbankPdf= url + '/cyberbank-manage/pdf';
const transferAccountExcel = url + '/cyberbank-manage/transferAccountExcel';
const singleFileDownload = url + '/company/singleFileDownload';
const companyFileUrl = url;//公司管理下载路径
const assetsManageFileUpload = url + '/assets-manage/fileUpload';
const assetsManageFileDownload = url + '/assets-manage/fileDownload?filePath=';
const cBDownloadTemplate = url + '/company-base/downloadTemplate';//公司管理-基本信息-下载导入模板
const cMDownloadTemplate = url + '/cyberbank-manage/downloadTemplate';//网银验收-下载导入模板
const cADownloadTemplate = url + '/company-accout/downloadTemplate';//公司信息-账户信息-下载导入模板
const cIDownloadTemplate = url + '/company-ic/downloadTemplate';//公司信息-工商信息-下载导入模板
const subjectDetailExcel = url +'/subject-detail/excel';//标的明细下载
const subjectFileUpload = url + '/subject-detail-enclosure/fileUpload';//标的明细图片上传
const subjectFileDownload = url + '/subject-detail-enclosure/fileDownload';//标的明细图片下载
export { cIDownloadTemplate, cADownloadTemplate, cMDownloadTemplate, subjectFileUpload, subjectFileDownload, subjectDetailExcel, cBDownloadTemplate, assetsManageFileDownload, assetsManageFileUpload, transferAccountExcel, singleFileDownload, http, companyExcelUrl, companyFileUrl, cyberbankDownLoadExcel, cyberbankPdf};