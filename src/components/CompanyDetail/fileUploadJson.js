const fileUploadJson ={
    assetsManageFileInfo: [
        {
            label: '企业信用信息查询',
            fieldName: 'enterpriseCreditInfo',
        },
        {
            label: '身份证复印件（房主）',
            isRequired: true, 
            fieldName: 'idCardCopy',
        },
        {
            label: '土地证',
            fieldName: 'landCertificate',
        },
        {
            label: '签署的其他文件',
            fieldName: 'signOtherFile',
        },
        {
            label: '房产证/房屋产权证复印件',
            isRequired: true, 
            fieldName: 'housePropertyCopy',
        },
        {
            label: '评估报告/抵押物评估报告',
            isRequired: true, 
            fieldName: 'assessReport',
        },
        {
            label: '抵押物照片',
            fieldName: 'pawnImage',
        },
        {
            label: '法院执行相关查询（房主）',
            fieldName: 'courtExecuteQuery',
        },
        {
            label: '法院失信被执行查询（房主）',
            fieldName: 'courtBreakFaithExecuteQuery',
        },
    ]
};
export default fileUploadJson;