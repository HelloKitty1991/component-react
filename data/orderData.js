import { get } from 'lodash';

const orderData = {
    id: 909998,
    business_status: { key: 'VALID', verbose: '已生效' },
    terminals: { K1: 1 },
    attr: { key: 'RENEW', verbose: '续约单' },
    protocol: {
        id: 34988,
        name: '东风风神武汉鑫东亚专营店',
        policy_types: [
            {
                id: 14,
                name: 'PICC_吉利版',
                key: 'PICC_JILI',
                photo:
                    'http://file.ot.hello.com/api/file/ae86b7376525491880877ab898fb8388/'
            },
            {
                id: 13,
                name: 'PICC_北京现代版',
                key: 'PICC_BEIJING',
                photo:
                    'http://file.ot.hello.com/api/file/e3ab22e67c79a200585859e2fd293da2/'
            },
            {
                id: 10,
                name: 'PICC_春风促销版',
                key: 'PICC_CFCX',
                photo:
                    'http://file.hello.com/api/file/b2bc7e2536b6776920f09dafa0d98cd8/'
            },
            {
                id: 8,
                name: 'PICC_通用版本',
                key: 'PICC_2018_9',
                photo:
                    'http://file.hello.com/api/file/5a98c751472dcc5b2969bd2d79136224/'
            },
            {
                id: 5,
                name: 'PICC_丰田金融版本',
                key: 'PICC_2018_6',
                photo:
                    'http://file.hello.com/api/file/058552eeaf9cb62957747006609e66e5/'
            }
        ]
    },
    product_name: '凯励程-标准版',
    org_group: {
        id: 8112,
        store: { name: '东风风神武汉鑫东亚专营店', id: 34988 },
        dev_org: { name: '湖北地区', id: 100110 },
        opt_org: { name: '湖北地区', id: 100110 },
        lending_channel: { name: '东风汽车财务有限公司', id: 200023 }
    },
    employee_group: {
        id: 66056,
        creator: {
            name: '东风风神武汉鑫东亚专营店',
            phone: '18717104910',
            id: 10043252
        },
        sales_consultant: { name: '梅诚', phone: '13294129574', id: 10129838 },
        opt_director: null,
        area_opt_holder: { name: '陈星', phone: '18244271850', id: 10035360 },
        opt_manager: { name: '袁宝敏', phone: '15872402406', id: 10042166 },
        sale_assistant: { name: '王芳', phone: '18071539001', id: 10043670 },
        dev_manager: { name: '孟娜', id: 10037121 },
        maintain_manager: { name: '孟娜', id: 10037121 }
    },
    purchaser_group: {
        id: 909998,
        vehicle_owner: {
            name: '雷小志',
            phone: '13871119629',
            gender: { key: 'MALE', verbose: '男' },
            id_number: '420111198101065639',
            id_type: { key: 'ID', verbose: '身份证' },
            category: { key: 'INDIVIDUAL', verbose: '个人' },
            qq: null,
            wechat: null,
            email: null,
            address: {
                region: {
                    city_name: '市辖区',
                    name: '东城区',
                    province_name: '北京市',
                    id: 110101
                },
                addr: null
            },
            company_address: {
                region: {
                    city_name: '市辖区',
                    name: '东城区',
                    province_name: '北京市',
                    id: 110101
                },
                addr: null
            },
            contact: [
                {
                    relation: { key: 'COLLEAGUE', verbose: '同事' },
                    phone: '18562525252',
                    name: '给对方'
                }
            ]
        },
        property_owner: {
            name: '雷小志',
            phone: '13871119629',
            gender: { key: 'MALE', verbose: '男' },
            id_number: '420111198101065639',
            id_type: { key: 'ID', verbose: '身份证' },
            category: { key: 'INDIVIDUAL', verbose: '个人' },
            qq: null,
            wechat: null,
            email: null,
            address: {
                region: {
                    city_name: '市辖区',
                    name: '东城区',
                    province_name: '北京市',
                    id: 110101
                },
                addr: null
            },
            company_address: {
                region: {
                    city_name: '市辖区',
                    name: '东城区',
                    province_name: '北京市',
                    id: 110101
                },
                addr: null
            },
            contact: [
                {
                    relation: { key: 'COLLEAGUE', verbose: '同事' },
                    phone: '18562525252',
                    name: '给对方'
                }
            ]
        },
        vehicle: {
            id: 10876152,
            plate_color: { key: 'BLACK', verbose: '黑色' },
            vehicle_type: {
                price: 12.99,
                serial__name: 'AX7',
                verbose: '东风风神 AX7 2019款 1.6T 自动AI领航型',
                serial__brand__id: 45,
                serial__manufacturer__name: '东风风神',
                serial__steal_level: 0,
                serial__id: 275,
                new_energy_vehicles: false,
                serial__brand__type: 'AUTO',
                serial__brand__name: '东风风神',
                model: '2019款 1.6T 自动AI领航型',
                id: 129724
            },
            plate_number: '闽B25885',
            vin: 'LGJE5FE09JM692835',
            engine_number: '5875013',
            factory_brand: '风神牌DFM6460D5B2',
            color: '白',
            purchase_date: '2019-01-09',
            price: 12.79,
            first_reg_date: '2019-01-09',
            invoice_miss: false,
            warning_phone: null,
            has_theft_insurance: null,
            is_active: true,
            has_syn_to_app: false,
            mileage: null,
            builtin_device: null
        },
        vehicle_person: {
            owner_ship: 'OWN',
            visible_in_app: true,
            has_send_message: true,
            notice_time: '2019-01-10T08:32:01+08:00',
            is_second_hand: false,
            lending_period: '24',
            lending_amount: 8.0,
            paid_in_full: false
        }
    },
    items: [
        {
            id: 918365,
            product: {
                name: '标准版',
                brand: { key: 'hello', verbose: '凯励程' },
                id: 2
            },
            amount: 0.0,
            service_start: '2019-05-17',
            service_period: 12,
            service_end: '2020-05-16',
            hello: {
                id: 918365,
                is_finance: false,
                amount_insured: 14.0,
                amount_finance: null,
                beneficiary: '我我我我我我我'
            }
        },
        {
            id: 918366,
            product: {
                name: '标准版',
                brand: { key: 'hello', verbose: '凯励程' },
                id: 2
            },
            amount: 0.0,
            service_start: '2019-05-17',
            service_period: 12,
            service_end: '2020-05-16',
            hello: null
        }
    ],
    hello: {
        id: 918365,
        is_finance: false,
        amount_insured: 14.0,
        amount_finance: null,
        beneficiary: '我我我我我我我'
    },
    policy_info: {
        id: 864088,
        status: { key: 'INVALID', verbose: '已作废' },
        creator_id: 10043252,
        holder_id: 10050340,
        number: 'ZAIKLC2019356477',
        amount_insured: 12.79,
        beneficiary: null,
        applicant: null,
        operator_remark: null,
        used_at: '2019-05-09T16:02:32+08:00',
        sign: 'D01A780063566682',
        sign_message:
            'ss=2019-05-17&sp=12&be=None&ap=None&na=雷小志&in=420111198101065639&ph=13871119629&vin=LGJE5FE09JM692835&pn=闽B25885&en=5875013&fb=风神牌DFM6460D5B2&pr=12.79&ai=12.790000000000&a=2000.00000000',
        print_count: 1
    },
    receipt_info: {
        id: 2185668,
        receipt_status: { key: 'RECEIVED_CONFIRMED', verbose: '已确认实收款' },
        online_pay_plat: { key: 'ALIPAY', verbose: '支付宝' },
        cash_on_hand: 2000.0,
        cash_time: '2019-01-09T08:00:00+08:00',
        receivable_time: '2019-02-09T08:00:00+08:00',
        weipay_trade_number: null,
        alipay_trade_number: '90999820190109191942113889',
        online_pay_info:
            "{'sign': 'UkOrWXcMfUVFCBoYrhdiVq8nx/BXrbtO6xfumvhPzkGrqijG/Sr9nGMbYNERKAHXJ41VxcK2JGO/M4s3cVxESiQdM6L/beUmXGRlKd6Zc+NctfneZE4olZpZCv01oJ+/AXz6j8UmGI9pCqdcZZVxIrxqbixOMWte0Og5VbtvrQM=','trade_status': 'TRADE_SUCCESS', 'seller_id': '2088911859179875', 'sign_type': 'RSA', 'gmt_create': '2019-01-09 19:19:52', 'charset': 'GBK', 'app_id': '2016041901311600', 'invoice_amount': '2000.00', 'buyer_id': '2088702520055891', 'buyer_logon_id': '180****9001', 'version': '1.0', 'out_trade_no': '90999820190109191942113889', 'total_amount': '2000.00', 'auth_app_id': '2016041901311600', 'gmt_payment': '2019-01-09 19:20:18', 'subject': '凯励程在线支付', 'point_amount': '0.00', 'trade_no': '2019010922001455890520289539', 'fund_bill_list': '[{\"amount\":\"2000.00\",\"fundChannel\":\"ALIPAYACCOUNT\"}]', 'notify_type': 'trade_status_sync', 'receipt_amount': '2000.00', 'seller_email': 'lxt@hello.com', 'notify_time': '2019-01-09 19:20:19', 'buyer_pay_amount': '2000.00', 'notify_id': '2019010900222192019055890511571028', 'body': '订单编号:909998;车主姓名:雷小志'}", //eslint-disable-line
        online_pay_success: true,
        online_pay_at: '2019-01-09T19:20:18+08:00',
        create_at: '2019-01-09T19:19:34+08:00',
        order: 909998
    },
    common_info: {
        service_period: '12个月',
        gap_amount: null,
        yanbao_amount: null,
        service_start: '2019-05-17',
        service_end: '2020-05-16',
        is_hello_standard: true
    },
    terminal_info: [
        {
            id: 11022508,
            name: '860675042595056',
            model: 'V1',
            install_location: '左仪表内（接线：左仪表内）',
            sims: [
                {
                    icc_id: '89860418231800109360',
                    phone: '1440182349360',
                    id: 11366062
                }
            ],
            install: [1026890],
            repair: [],
            dismantle: []
        }
    ],
    remark: '大哥大哥',
    photo_status: null,
    order_source: 'WEB',
    order_type: 'hello',
    total_amount: 300.0,
    payment_amount: 3000.0,
    charge_amount: null,
    charge_amount_remark: null,
    terminal_amount: 0.0,
    suggested_price: 2000.0,
    create_at: '2019-01-09T19:19:34+08:00',
    relate_order: 909998,
    holder: 10050340,
    safeguard_amount: 3000.0,
    installed_terminals: { V1: 1 }
};

export default [
    {
        title: '产证登记人',
        content: get(
            orderData,
            'purchaser_group.property_owner.name'
        )
    },
    {
        title: '证件类型',
        content: get(
            orderData,
            'purchaser_group.property_owner.id_type.verbose'
        )
    },
    {
        title: '证件号码',
        content: get(
            orderData,
            'purchaser_group.property_owner.id_number'
        )
    },
    {
        title: '性别',
        content: get(
            orderData,
            'purchaser_group.property_owner.gender.verbose'
        )
    },
    {
        title: '车架号',
        content: get(orderData, 'purchaser_group.vehicle.vin')
    },
    {
        title: '厂牌型号',
        content: get(
            orderData,
            'purchaser_group.vehicle.factory_brand'
        )
    },
    {
        title: '发动机号',
        content: get(
            orderData,
            'purchaser_group.vehicle.engine_number'
        )
    },
    {
        title: '车牌号',
        content: get(
            orderData,
            'purchaser_group.vehicle.plate_number'
        )
    },
    {
        title: '购车开票日期',
        content: get(
            orderData,
            'purchaser_group.vehicle.purchase_date'
        ),
        format: 'YYYY-MM-DD'
    },
    {
        title: '车辆初次登记日期',
        content: get(
            orderData,
            'purchaser_group.vehicle.first_reg_date'
        ),
        format: 'YYYY-MM-DD'
    },
    {
        title: '新车购置价(万元)',
        content: get(orderData, 'purchaser_group.vehicle.price')
    },
    {
        title: '服务期限',
        content: get(orderData, 'common_info.service_period')
    },
    {
        title: '服务开始时间',
        content: get(orderData, 'common_info.service_start'),
        format: 'YYYY-MM-DD'
    },
    { title: '是否金融保全', content: '是' },
    {
        title: '保险金额/赔偿限额(万元)',
        content: get(orderData, 'hello.amount_insured')
    },
    {
        title: '凯励程盗抢保障费用(元)',
        content: get(orderData, 'hello_amount')
    },
    {
        title: '是否提供纸质保函',
        content: get(orderData, 'provide_paper') ? '是' : '否'
    },
    {
        title: '车主付款金额(元)',
        content: get(orderData, 'payment_amount')
    },
    {
        title: '第一受益人',
        content: get(orderData, 'hello.beneficiary')
    }
];
