const companyJudicialShow = [
    {
        child: [
            {
                label: '公司名称',
                child: [
                    {
                        fieldName: 'companyName',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '统一社会信用代码',
                child: [
                    {
                        fieldName: 'uscc',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                isRequired: true, label: '公司司法情况',
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
                        style: 'select'
                    }
                ],
            },
            {
                isRequired: true, label: '工商信息对照',
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
        ]
    },
    {
        child: [
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
                label: '法人身份证号',
                child: [
                    {
                        fieldName: 'legalCardNo',
                        disabled: true,
                        value: '',
                        style: 'input',
                    }
                ],
            },
            {
                isRequired: true, label: '法人司法情况',
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
                        style: 'select'
                    }
                ],
            },
        ]
    },
    {
        child: [
            {
                label: '股东一姓名',
                child: [
                    {
                        fieldName: 'partnerFirstName',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '股东一身份证号',
                child: [
                    {
                        fieldName: 'partnerFirstCardNo',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                isRequired: true, label: '股东一司法情况',
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
                        style: 'select'
                    }
                ],
            },
        ]
    },
    {
        child: [
            {
                label: '股东二姓名',
                child: [
                    {
                        fieldName: 'partnerSecondName',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '股东二身份证号',
                child: [
                    {
                        fieldName: 'partnerSecondCardNo',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                isRequired: true, label: '股东二司法情况',
                child: [
                    {
                        fieldName: 'partnerSecondJudicial',
                        
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
                        style: 'select'
                    }
                ],
            },
        ]
    },
    {
        child: [
            {
                label: '股东三姓名',
                child: [
                    {
                        fieldName: 'partnerThirdName',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                label: '股东三身份证号',
                child: [
                    {
                        fieldName: 'partnerThirdCardNo',
                        value: '',
                        disabled: true,
                        style: 'input',
                    }
                ],
            },
            {
                isRequired: true, label: '股东三司法情况',
                child: [
                    {
                        fieldName: 'partnerThirdJudicial',
                        
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
                        style: 'select'
                    }
                ],
            },
        ]
    },
    {
        child: [
            {
                isRequired: true, label: '司法反馈',
                child: [
                    {
                        fieldName: 'judicialFeedback',
                        value: '',
                        style: 'textarea',
                    }
                ],
            }
        ]
    }
];

export default companyJudicialShow;