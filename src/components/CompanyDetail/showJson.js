const showJson ={
    amAddressJSON: [
        {
            value: '北京',
            id: 0,
        },
        {
            value: '天津',
            id: 1,
        },
        {
            value: '上海',
            id: 2,
        },
        {
            value: '重庆',
            id: 3,
        },
        {
            value: '河北',
            id: 4,
        },
        {
            value: '山西',
            id: 5,
        },
        {
            value: '辽宁',
            id: 6,
        },
        {
            value: '吉林',
            id: 7,
        },
        {
            value: '黑龙江',
            id: 8,
        },
        {
            value: '江苏',
            id: 9,
        },
        {
            value: '浙江',
            id: 10,
        },
        {
            value: '安徽',
            id: 11,
        },
        {
            value: '福建',
            id: 12,
        },
        {
            value: '江西',
            id: 13,
        },
        {
            value: '山东',
            id: 14,
        },
        {
            value: '湖北',
            id: 15,
        },
        {
            value: '湖南',
            id: 16,
        },
        {
            value: '广东',
            id: 17,
        },
        {
            value: '海南',
            id: 18,
        },
        {
            value: '四川',
            id: 19,
        },
        {
            value: '贵州',
            id: 20,
        },
        {
            value: '云南',
            id: 21,
        },
        {
            value: '陕西',
            id: 22,
        },
        {
            value: '甘肃',
            id: 23,
        },
        {
            value: '青海',
            id: 24,
        },
        {
            value: '西藏',
            id: 25,
        },
        {
            value: '广西',
            id: 26,
        },
        {
            value: '内蒙古',
            id: 27,
        },
        {
            value: '宁夏',
            id: 28,
        },
        {
            value: '新疆',
            id: 29,
        },
        {
            value: '香港',
            id: 30,
        },
        {
            value: '澳门',
            id: 31,
        },
        {
            value: '台湾',
            id: 32,
        },
        {
            value: '河南',
            id: 34,
        },
    ],
    assetsManageInfo: [
        {
            label: '资产编号',
            child: [
                {
                    fieldName: 'amNum',
                    value: '',
                    disabled: true,
                    style: 'input',
                }
            ],
        },
        {
            label: '资产所在地',
            isRequired: true, 
            child: [
                {
                    fieldName: 'amAddress',
                    value: '',
                    style: 'inputSelect',
                }
            ],
        },
        {
            label: '资产匹配总价',
            isRequired: true, 
            child: [
                {
                    fieldName: 'amMatchTotalPrice',
                    value: '',
                    unit: '万',
                    style: 'numberInput',
                }
            ],
        },
        {
            label: '房主法定代表人',
            isRequired: true, 
            child: [
                {
                    fieldName: 'houseOwnerLegalName',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '房主身份证/工商注册号',
            isRequired: true, 
            child: [
                {
                    fieldName: 'houseOwnerCardNoAndIcNo',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '公司法定代表人',
            isRequired: true, 
            child: [
                {
                    fieldName: 'companyLegalName',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '房产产权人/房屋产权人',
            isRequired: true, 
            child: [
                {
                    fieldName: 'housePropertyOwner',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '房产证编号/房产证号',
            isRequired: true, 
            child: [
                {
                    fieldName: 'housePropertyNum',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '建成年代',
            isRequired: true, 
            child: [
                {
                    fieldName: 'ageOfCompletion',
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
                    value: '',
                    format: 'YYYY-MM-DD',
                    style: 'data',
                }
            ],
        },
        {
            label: '房产地址/房屋地址',
            isRequired: true, 
            child: [
                {
                    fieldName: 'housePropertyAddress',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '建筑面积/房屋面积',
            isRequired: true, 
            child: [
                {
                    fieldName: 'houseArea',
                    value: '',
                    unit: '㎡',
                    style: 'input',
                }
            ],
        },
        {
            label: '所在层数及总高层数',
            isRequired: true, 
            child: [
                {
                    fieldName: 'layerNum',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '房屋用途',
            isRequired: true, 
            child: [
                {
                    fieldName: 'houseUse',
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
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '宗地号/土地宗号',
            child: [
                {
                    fieldName: 'landNum',
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
                    fieldName: 'useEndDate',
                    value: '',
                    format: 'YYYY-MM-DD',
                    style: 'data',
                }
            ],
        },
        {
            label: '土地证用途类型',
            child: [
                {
                    fieldName: 'landCertificateUseType',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '（房产）评估金额总价',
            isRequired: true, 
            child: [
                {
                    fieldName: 'assessTotalPrice',
                    unit: '万',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '评估金额单价/㎡',
            isRequired: true, 
            child: [
                {
                    fieldName: 'assessPrice',
                    value: '',
                    unit: '万',
                    style: 'input',
                }
            ],
        },
        {
            label: '当地市场收购总价',
            isRequired: true, 
            child: [
                {
                    fieldName: 'marketBuyTotalPrice',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '匹配标识',
            child: [
                {
                    fieldName: 'matchFlag',
                    disabled: true,
                    value: [
                        {
                            value: '1',
                            text: '公司-1',
                        },
                        {
                            value: '2',
                            text: '公司-2',
                        },
                        {
                            value: '3',
                            text: '公司-3',
                        },
                    ],
                    style: 'select',
                }
            ],
        },
    ],
    assetsManageInfo_1: [
        {
            label: '是否停用',
            isRequired: true, 
            child: [
                {
                    fieldName: 'stopFlag',
                    defaultValue: '2',
                    value: [
                        {
                            value: '1',
                            text: '是',
                        },
                        {
                            value: '2',
                            text: '否',
                        },
                    ],
                    style: 'select',
                }
            ],
        },
        {
            label: '停用说明',
            child: [
                {
                    fieldName: 'stopExplain',
                    value: '',
                    style: 'textarea',
                }
            ],
        },
    ],
    cyberbankInfo_wldPhone: [
        {
            isRequired: true, 
            label: '网利贷绑卡手机号',
            child: [
                {
                    fieldName: 'wldPhone',
                    value: '',
                    style: 'input',
                }
            ],
        },
    ],
    cyberbankInfo_accountKepping: [
        {
            isRequired: true, 
            label: '走账是否成功',
            child: [
                {
                    fieldName: 'accountKeppingResult',
                    value: [
                        {
                            value: '1',
                            text: '是',
                        },
                        {
                            value: '2',
                            text: '否',
                        },
                    ],
                    style: 'select',
                }
            ],
        },
        {
            label: '走账说明',
            child: [
                {
                    fieldName: 'accountKeppingReason',
                    value: '',
                    style: 'input',
                }
            ],
        },
    ],
    cyberbankInfo_remark: [
        {
            label: '备注',
            child: [
                {
                    fieldName: 'remark',
                    value: '',
                    style: 'textarea',
                }
            ],
        },
        {
            label: '是否停用',
            isRequired: true, 
            child: [
                {
                    fieldName: 'stopFlag',
                    value: [
                        {
                            value: '1',
                            text: '是',
                        },
                        {
                            value: '2',
                            text: '否',
                        },
                    ],
                    style: 'select',
                }
            ],
        },
    ],
    cyberbankInfo: [
        {
            label: '档案编号',
            child: [
                {
                    fieldName: 'archivesId',
                    disabled: true,
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '网银编号',
            child: [
                {
                    fieldName: 'cyberBankNum',
                    disabled: true,
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '银行开户日期',
            child: [
                {
                    fieldName: 'bankOpenDate',
                    disabled: true,
                    value: '',
                    style: 'data',
                    format: 'YYYY-MM-DD'
                }
            ],
        },
        {
            label: '渠道',
            child: [
                {
                    fieldName: 'qdSource',
                    disabled: true,
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '公司名称',
            child: [
                {
                    fieldName: 'companyName',
                    disabled: true,
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '核准号',
            child: [
                {
                    fieldName: 'approvalNum',
                    disabled: true,
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '法人姓名',
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
            label: '开户行全称',
            child: [
                {
                    fieldName: 'openingBank',
                    disabled: true,
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '银行账户',
            child: [
                {
                    fieldName: 'bankAccount',
                    disabled: true,
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '制单盾编号',
            child: [
                {
                    fieldName: 'makeShieldNum',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '审核盾1编号',
            child: [
                {
                    fieldName: 'aduitShieldNum',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '审核盾2编号',
            child: [
                {
                    fieldName: 'reviewShieldNum',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '制单盾密码',
            child: [
                {
                    fieldName: 'makeShieldPwd',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '审核盾1密码',
            child: [
                {
                    fieldName: 'aduitShieldPwd',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '审核盾2密码',
            child: [
                {
                    fieldName: 'reviewShieldPwd',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '对公日单笔限额',
            child: [
                {
                    fieldName: 'grdbxe',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '对私日单笔限额',
            child: [
                {
                    fieldName: 'srdbxe',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '银行预留手机号',
            child: [
                {
                    fieldName: 'bankReservePhone',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '对公日限额',
            child: [
                {
                    fieldName: 'grxe',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '对私日限额',
            child: [
                {
                    fieldName: 'srxe',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '电话号码',
            child: [
                {
                    fieldName: 'phoneNum',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '对公自助服务卡',
            child: [
                {
                    fieldName: 'selfServiceCard',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '结算卡密码',
            child: [
                {
                    fieldName: 'settlementCardPwd',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '存款人查询密码',
            child: [
                {
                    fieldName: 'depositorQueryPwd',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '客户号',
            child: [
                {
                    fieldName: 'customerNum',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '账户余额',
            child: [
                {
                    fieldName: 'accountBalance',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '支付密码器',
            child: [
                {
                    fieldName: 'payPwdWare',
                    value: [
                        {
                            value: '1',
                            text: '有',
                        },
                        {
                            value: '2',
                            text: '无',
                        },
                    ],
                    style: 'select',
                }
            ],
        },
        {
            label: '邮箱',
            child: [
                {
                    fieldName: 'emil',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '邮箱密码',
            child: [
                {
                    fieldName: 'emailPwd',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            label: '更改电话',
            child: [
                {
                    fieldName: 'changePhone',
                    value: '',
                    style: 'input',
                }
            ],
        },
        {
            isRequired: true, 
            label: '对账周期',
            child: [
                {
                    fieldName: 'accountCycle',
                    value: [
                        {
                            value: '1',
                            text: '月',
                        },
                        {
                            value: '2',
                            text: '季',
                        },
                        {
                            value: '3',
                            text: '半年',
                        },
                        {
                            value: '4',
                            text: '年',
                        }
                    ],
                    style: 'select',
                }
            ],
        },
        {
            isRequired: true, 
            label: '网银验收日期',
            child: [
                {
                    fieldName: 'checkDate',
                    value: '',
                    style: 'data',
                    format: 'YYYY-MM-DD'
                }
            ],
        },
        {
            label: '台账修改时间',
            child: [
                {
                    fieldName: 'accountModifyTime',
                    value: '',
                    style: 'data',
                    format: 'YYYY-MM-DD'
                }
            ],
        },
    ],
    companyInfoAll: [{
        label: '黑名单标记',
        child: [
            {
                fieldName: 'blacklistFlag',
                value: [
                    {
                        value: '1',
                        text: '是',
                    },
                    {
                        value: '2',
                        text: '否',
                    }
                ],
                style: 'select',
            }
        ],
    }],
    companyInfo: [
        {
            title: '基本信息',
            name: 'company-base',
            child: [
                {
                    isRequired: true, 
                    label: '渠道来源',
                    child: [
                        {
                            fieldName: 'qdSource',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '资料收件日',
                    child: [
                        {
                            fieldName: 'zlsjDate',
                            value: '',
                            style: 'data',
                            format: 'YYYY-MM-DD'
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '公司名称',
                    checkName: '公司名称检验',
                    child: [
                        {
                            fieldName: 'companyName',
                            value: '',
                            style: 'checkInput',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '统一社会信用代码',
                    child: [
                        {
                            fieldName: 'uscc',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '法人姓名',
                    child: [
                        {
                            fieldName: 'legalName',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '法人身份证号',
                    child: [
                        {
                            fieldName: 'legalCardNo',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '股东一',
                    child: [
                        {
                            fieldName: 'partnerFirstName',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '股东一身份证号',
                    child: [
                        {
                            fieldName: 'partnerFirstCardNo',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '股东二',
                    child: [
                        {
                            fieldName: 'partnerSecondName',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '股东二身份证号',
                    child: [
                        {
                            fieldName: 'partnerSecondCardNo',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '股东三',
                    child: [
                        {
                            fieldName: 'partnerThirdName',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '股东三身份证号',
                    child: [
                        {
                            fieldName: 'partnerThirdCardNo',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '工商归属',
                    child: [
                        {
                            fieldName: 'icAscription',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '执照所在地',
                    child: [
                        {
                            fieldName: 'licenseAddress',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
            ]
        },
        {
            title: '工商信息',
            name: 'company-ic',
            child: [
                {
                    isRequired: true, 
                    label: '成立日期',
                    child: [
                        {
                            fieldName: 'foundDate',
                            value: '',
                            style: 'data',
                            format: 'YYYY-MM-DD'
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '注册资本',
                    child: [
                        {
                            fieldName: 'registerCapital',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '所属行业',
                    child: [
                        {
                            fieldName: 'industry',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '登记机关',
                    child: [
                        {
                            fieldName: 'registerOffice',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '营业期限',
                    child: [
                        {
                            fieldName: 'businessTerm',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '公司住所',
                    child: [
                        {
                            fieldName: 'companyAddress',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '工商状态',
                    child: [
                        {
                            fieldName: 'icStatus',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '经营范围',
                    child: [
                        {
                            fieldName: 'businessScope',
                            value: '',
                            style: 'input',
                        }
                    ],
                }
            ]
        },
        {
            title: '账户信息',
            name: 'company-account',
            child: [
                {
                    // isRequired: true, 
                    label: '档案编号',
                    child: [
                        {
                            fieldName: 'archivesId',
                            value: '',
                            disabled: true,
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '核准号',
                    child: [
                        {
                            fieldName: 'approvalNum',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '开户行全称',
                    child: [
                        {
                            fieldName: 'openingBank',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '开户行简称',
                    child: [
                        {
                            fieldName: 'openingBankJc',
                            value: '',
                            style: 'input',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '银行账号',
                    child: [
                        {
                            fieldName: 'bankAccount',
                            value: '',
                            ifNumber: true,
                            style: 'input',
                        }
                    ],
                },
                {
                    label: '账户激活日期',
                    child: [
                        {
                            fieldName: 'accountActiveDate',
                            value: '',
                            style: 'data',
                            format: 'YYYY-MM-DD'
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '银行开户日期',
                    child: [
                        {
                            fieldName: 'bankOpenDate',
                            value: '',
                            style: 'data',
                            format: 'YYYY-MM-DD'
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '公司状态',
                    child: [
                        {
                            fieldName: 'companyStatus',
                            value: [
                                {
                                    value: '1',
                                    text: '注册',
                                },
                                {
                                    value: '2',
                                    text: '开户',
                                },
                                {
                                    value: '3',
                                    text: '激活',
                                }
                            ],
                            style: 'select',
                        }
                    ],
                },
                {
                    label: '备注',
                    child: [
                        {
                            fieldName: 'accountRemark',
                            value: '',
                            style: 'textarea',
                        }
                    ],
                },
            ]
        },
        {
            title: '司法信息',
            name: 'company-judicial',
            child: [
                {
                    isRequired: true, 
                    label: '公司司法情况',
                    child: [
                        {
                            fieldName: 'companyJudicial',
                            
                            value: [
                                {
                                    value: '1',
                                    text: '有司法',
                                },
                                {
                                    value: '0',
                                    text: '无司法',
                                }
                            ],
                            style: 'select',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '工商信息对照',
                    child: [
                        {
                            fieldName: 'icContrast',
                            
                            value: [
                                {
                                    value: '1',
                                    text: '一致',
                                },
                                {
                                    value: '0',
                                    text: '不一致',
                                }
                            ],
                            style: 'select',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '法人司法情况',
                    child: [
                        {
                            fieldName: 'legalJudicial',
                            
                            value: [
                                {
                                    value: '1',
                                    text: '有司法',
                                },
                                {
                                    value: '0',
                                    text: '无司法',
                                }
                            ],
                            style: 'select',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '股东司法情况',
                    child: [
                        {
                            fieldName: 'partnerFirstJudicial',
                            
                            value: [
                                {
                                    value: '1',
                                    text: '有司法',
                                },
                                {
                                    value: '0',
                                    text: '无司法',
                                }
                            ],
                            style: 'select',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '司法结果',
                    child: [
                        {
                            fieldName: 'judicialResult',
                            
                            value: [
                                {
                                    value: '1',
                                    text: '通过',
                                },
                                {
                                    value: '2',
                                    text: '拒绝',
                                }
                            ],
                            style: 'select',
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '司法验收日期',
                    child: [
                        {
                            fieldName: 'judicialCheckDate',
                            
                            value: '',
                            style: 'data',
                            format: 'YYYY-MM-DD'
                        }
                    ],
                },
                {
                    isRequired: true, 
                    label: '司法反馈',
                    child: [
                        {
                            fieldName: 'judicialFeedback',
                            
                            value: '',
                            style: 'textarea',
                        }
                    ],
                },
            ]
        },
    ],
};
export default showJson;