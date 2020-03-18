const subjectShow ={
    businessTypeInfo: {
        title: '业务类型',
        name: 'businessType',
        child: [
            {
                isRequired: true, 
                label: '标的ID',
                child: [
                    {
                        fieldName: 'subjectId',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '匹配ID',
                child: [
                    {
                        fieldName: 'matchId',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '匹配日期',
                child: [
                    {
                        fieldName: 'matchDate',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '预计到期日',
                child: [
                    {
                        fieldName: 'expectDate',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '上线日期',
                child: [
                    {
                        fieldName: 'onlineDate',
                        value: '',
                        disabled: true,
                        format: 'YYYY-MM-DD',
                        style: 'data',
                    }
                ],
            },
            {
                label: '实际到期日',
                child: [
                    {
                        fieldName: 'actualDate',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                isRequired: true, 
                label: '所属机构',
                child: [
                    {
                        fieldName: 'organId',
                        value: '',
                        style: 'organ',
                    }
                ],
            },
            {
                label: '贷款类别',
                child: [
                    {
                        fieldName: 'loanTypeId',
                        disabled: true,
                        value: '',
                        style: 'loanType',
                    }
                ],
            },
            {
                label: '贷款方式',
                isRequired: true,
                child: [
                    {
                        fieldName: 'loanMode',
                        defaultValue: '1',
                        value: [
                            {
                                value: '1',
                                text: '企业',
                            },
                            {
                                value: '2',
                                text: '个人',
                            },
                        ],
                        style: 'select',
                    }
                ],
            },
            {
                label: '是否续贷',
                isRequired: true,
                child: [
                    {
                        fieldName: 'continuedLoanFlag',
                        defaultValue: '1',
                        value: [
                            {
                                value: '1',
                                text: '新增',
                            },
                            {
                                value: '2',
                                text: '续贷',
                            },
                        ],
                        style: 'select',
                    }
                ],
            },
        ]
    },
    personalInfo: {
        title: '个人信息',
        name: 'personalInfo',
        child: [
            {
                label: '真实姓名',
                child: [
                    {
                        fieldName: 'zsxm',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '身份证号/工商注册号',
                child: [
                    {
                        fieldName: 'cardNoAndIcNum',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '电子邮箱',
                child: [
                    {
                        fieldName: 'email',
                        value: '',
                        unit: '@163.com',
                        width: '70',
                        style: 'input',
                    }
                ],
            },
        ]
    },
    loanInfo: {
        title: '借款信息',
        name: 'loanInfo',
        child: [
            {
                label: '贷款总金额小写',
                child: [
                    {
                        fieldName: 'loanTotalPriceLowercase',
                        disabled: true,
                        value: '',
                        unit: '万',
                        style: 'input',
                    }
                ],
            },
            {
                label: '贷款总金额大写',
                child: [
                    {
                        fieldName: 'loanTotalPriceUppercase',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '平台还款方式',
                isRequired: true, 
                child: [
                    {
                        fieldName: 'repaymentModeId',
                        value: '',
                        style: 'repaymentMode',
                    }
                ],
            },
            {
                label: '贷款期限',
                isRequired: true, 
                child: [
                    {
                        fieldName: 'loanTermId',
                        value: '',
                        style: 'loanTerm',
                    }
                ],
            },
            {
                label: '平台借款利率/年化',
                isRequired: true, 
                child: [
                    {
                        fieldName: 'annualizedRate',
                        value: '',
                        unit: '%',
                        style: 'numberInput',
                    }
                ],
            },
            {
                label: '信息技术服务费标准/年化',
                isRequired: true, 
                child: [
                    {
                        fieldName: 'annualizedInfoServiceFee',
                        value: '',
                        unit: '%',
                        style: 'numberInput',
                    }
                ],
            },
            {
                label: '利息小写',
                child: [
                    {
                        fieldName: 'interestLowercase',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '利息大写',
                child: [
                    {
                        fieldName: 'interestUppercase',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '本息共计还款小写',
                child: [
                    {
                        fieldName: 'totalRepaymentInterestLowercase',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '本息共计还款大写',
                child: [
                    {
                        fieldName: 'totalRepaymentInterestUppercase',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '信息技术服务费总金额小写',
                child: [
                    {
                        fieldName: 'infoServiceTotalFeeLowercase',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '信息技术服务费总金额大写',
                child: [
                    {
                        fieldName: 'infoServiceTotalFeeUppercase',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '还款来源',
                child: [
                    {
                        fieldName: 'repaymentSource',
                        defaultValue: '经营收入',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '借款用途',
                child: [
                    {
                        fieldName: 'loanUse',
                        defaultValue: '资金周转',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '推荐方/担保方/代偿方',
                child: [
                    {
                        fieldName: 'housePropertyOwner',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '法定代表人',
                child: [
                    {
                        fieldName: 'houseOwnerLegalName',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '地址',
                child: [
                    {
                        fieldName: 'address',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '身份证号/统一社会信用代码',
                child: [
                    {
                        fieldName: 'houseOwnerCardNoAndIcNo',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '手机号',
                child: [
                    {
                        fieldName: 'phoneNum',
                        value: '',
                        style: 'input',
                    }
                ],
            },
        ],
    },
    platformInfo2: [
        {
            label: '指定收款人名称',
            isRequired: true,
            child: [
                {
                    fieldName: 'proxyReceiptId',
                    value: '',
                    style: 'proxyReceipt',
                }
            ],
        },
        {
            label: '指定收款人银行开户行',
            child: [
                {
                    fieldName: 'plarformProxyOpeningBank',
                    value: '',
                    disabled: true,
                    style: 'input',
                }
            ],
        },
        {
            label: '指定收款人账号',
            child: [
                {
                    fieldName: 'platformProxyAccount',
                    value: '',
                    disabled: true,
                    style: 'input',
                }
            ],
        },
        {
            label: '指定收款人银行',
            isRequired: true,
            child: [
                {
                    fieldName: 'appointReceiptBank',
                    value: '',
                    style: 'input',
                }
            ],
        },
    ],
    platformInfo1: [
        {
            label: '借款人收款银行账户开户行',
            child: [
                {
                    fieldName: 'platformLoanOpeningBank',
                    disabled: true,
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '借款人收款账号',
            child: [
                {
                    fieldName: 'platformLoanAccount',
                    disabled: true,
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '借款人收款银行',
            isRequired: true,
            child: [
                {
                    fieldName: 'borrowerReceiptBank',
                    value: '',
                    style: 'input',
                }
            ],
        },
    ],
    platformInfo: {
        title: '平台信息',
        name: 'platformInfo',
        child: [
            {
                label: '平台借款人',
                child: [
                    {
                        fieldName: 'platformLoanPerson',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '法定代表人/经营者',
                child: [
                    {
                        fieldName: 'legalName',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '工商注册号/身份证号',
                child: [
                    {
                        fieldName: 'platformIcNumAndCardNo',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '地址',
                child: [
                    {
                        fieldName: 'platformAddress',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '担保方',
                child: [
                    {
                        fieldName: 'platformGuarantor',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '收款方式',
                isRequired: true,
                child: [
                    {
                        fieldName: 'receiptType',
                        defaultValue: '1',
                        value: [
                            {
                                value: '1',
                                text: '借款人收款',
                            },
                            {
                                value: '2',
                                text: '委托人收款',
                            },
                        ],
                        style: 'select',
                    }
                ],
            },           
        ]
    },
    guarantyInfo_long: {
        title: '抵押物信息',
        name: 'guarantyInfo',
        child: [
            {
                label: '房主身份证/工商注册号',
                child: [
                    {
                        fieldName: 'houseOwnerCardNoAndIcNo',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '房主法定代表人',
                child: [
                    {
                        fieldName: 'houseOwnerLegalName',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '首次支付服务费（小写）',
                child: [
                    {
                        fieldName: 'firstPayServiceFee',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '剩余未支付服务费金额（小）',
                child: [
                    {
                        fieldName: 'unpaidServiceFee',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '法人姓名（产权方为公司）',
                child: [
                    {
                        fieldName: 'legalName',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '抵押权人身份证号/工商注册号',
                child: [
                    {
                        fieldName: 'muCardNo',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '抵押权人住所',
                child: [
                    {
                        fieldName: 'muCardAddress',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '担保方法定代表人名称',
                child: [
                    {
                        fieldName: 'guarantyGuarantorName',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '担保方工商注册号/身份证号',
                child: [
                    {
                        fieldName: 'guarantyGuarantorUscc',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '担保方地址',
                child: [
                    {
                        fieldName: 'guarantyGuarantorAddress',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '抵押权人名称',
                child: [
                    {
                        fieldName: 'muName',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '房产产权人',
                child: [
                    {
                        fieldName: 'housePropertyOwner',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '房产证编号',
                child: [
                    {
                        fieldName: 'housePropertyNum',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '建成年代',
                child: [
                    {
                        fieldName: 'ageOfCompletion',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '登记日期',
                child: [
                    {
                        fieldName: 'registrationDate',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '房产地址',
                child: [
                    {
                        fieldName: 'housePropertyAddress',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '建筑面积',
                child: [
                    {
                        fieldName: 'houseArea',
                        disabled: true,
                        unit: '㎡',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '所在层数及总高层数',
                child: [
                    {
                        fieldName: 'layerNum',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '房屋用途',
                child: [
                    {
                        fieldName: 'houseUse',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '土地证使用权人',
                child: [
                    {
                        fieldName: 'landCertificateUser',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '宗地号',
                child: [
                    {
                        fieldName: 'landNum',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '宗地面积',
                child: [
                    {
                        fieldName: 'lanNumArea',
                        disabled: true,
                        unit: '㎡',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '使用终止日期',
                child: [
                    {
                        fieldName: 'lanNumArea',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '土地证用途类型',
                child: [
                    {
                        fieldName: 'landCertificateUseType',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '评估金额总价',
                child: [
                    {
                        fieldName: 'assessTotalPrice',
                        disabled: true,
                        unit: '万',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '评估金额单价/㎡',
                child: [
                    {
                        fieldName: 'assessPrice',
                        disabled: true,
                        unit: '万',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '当地市场收购总价',
                child: [
                    {
                        fieldName: 'marketBuyTotalPrice',
                        disabled: true,
                        unit: '万',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '房产抵押率',
                child: [
                    {
                        fieldName: 'houseMortgageRate',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '实缴资本',
                child: [
                    {
                        fieldName: 'actialCapital',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '所属行业',
                child: [
                    {
                        fieldName: 'industry',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
        ]
    },
    guarantyInfo_day: {
        title: '抵押物信息',
        name: 'guarantyInfo',
        child: [
            {
                label: '房屋产权人',
                child: [
                    {
                        fieldName: 'housePropertyOwner',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '房产证号',
                child: [
                    {
                        fieldName: 'housePropertyNum',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '土地宗号',
                child: [
                    {
                        fieldName: 'landNum',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '房屋面积',
                child: [
                    {
                        fieldName: 'houseArea',
                        disabled: true,
                        unit: '㎡',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '房屋地址',
                child: [
                    {
                        fieldName: 'housePropertyAddress',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '项目简介',
                isRequired: true,
                child: [
                    {
                        fieldName: 'projectDesc',
                        value: '',
                        style: 'textarea',
                    }
                ],
            },
            {
                label: '房产评估金额总价',
                child: [
                    {
                        fieldName: 'assessTotalPrice',
                        disabled: true,
                        unit: '万',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '合作机构工商登记号或身份证号',
                child: [
                    {
                        fieldName: 'guarantyGuarantorUscc',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '合作机构法定代表人名称',
                child: [
                    {
                        fieldName: 'guarantyGuarantorName',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '权证人身份证号',
                child: [
                    {
                        fieldName: 'muCardNo',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '权证人住所',
                child: [
                    {
                        fieldName: 'muCardAddress',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '合作机构地址',
                child: [
                    {
                        fieldName: 'guarantyGuarantorAddress',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '所属行业',
                child: [
                    {
                        fieldName: 'industry',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '实缴资本',
                child: [
                    {
                        fieldName: 'actialCapital',
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                label: '抵押权人名称',
                child: [
                    {
                        fieldName: 'muName',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
        ]
    },
    subjectInfo: {
        title: '',
        child: [
            {
                label: '标的状态',
                isRequired: true,
                child: [
                    {
                        fieldName: 'status',
                        value: [
                            {
                                value: '2',
                                text: '上线',
                            },
                            {
                                value: '3',
                                text: '还款',
                            },
                            {
                                value: '4',
                                text: '作废',
                            },
                        ],
                        style: 'select',
                    }
                ],
            },
            {
                label: '状态说明',
                child: [
                    {
                        fieldName: 'statusDesc',
                        value: '',
                        style: 'textarea',
                    }
                ],
            },           
        ]
    },
    subjectInfo1: {
        title: '',
        child: [
            {
                label: '标的状态',
                child: [
                    {
                        fieldName: 'status',
                        disabled: true,
                        value: [
                            {
                                value: '2',
                                text: '上线',
                            },
                            {
                                value: '3',
                                text: '还款',
                            },
                            {
                                value: '4',
                                text: '作废',
                            },
                        ],
                        style: 'select',
                    }
                ],
            },
            {
                label: '状态说明',
                child: [
                    {
                        fieldName: 'statusDesc',
                        value: '',
                        style: 'textarea',
                    }
                ],
            },           
        ]
    },
}

export default subjectShow;
