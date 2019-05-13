import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
// import { DetailinComponent } from '../detailin/detailin.component';
import { WebSocketService } from '../../web-socket.service';
import { UserSocketService } from '../../use-socket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EType } from '../../enum-data';
import * as momentNs from 'moment';
const moment = momentNs;

@Component({
    selector: 'app-repertory',
    templateUrl: './repertory.component.html',
    styleUrls: ['./repertory.component.less'],
    providers: [
        HttpService,
        WebSocketService,
        UserSocketService,
    ]
})
export class RepertoryComponent implements OnInit {
    EType = EType;
    // EOrderStatus[data.orderType]
    orderList = [];
    nowPage = 1;
    // tslint:disable-next-line:variable-name
    _total = 100;
    listOfDisplayData: any[] = [];
    mapOfCheckedId: { [key: string]: boolean } = {};
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    allChecked = false;
    tabs = [
        {
            index: 0,
            name: '库存管理',
        },
        {
            index: 1,
            name: '出入库列表',
        },
    ];
    searchList: {
        name: '',
    };
    selectType = [
    ];
    selectCompany = [];
    isVisible = false;
    pageIndex = 1;
    currentTabIndex = 0;
    pageSize = 10;
    surveyForm: FormGroup;
    state;
    goods;
    title;
    isedit = false;
    numbers;
    time;
    perprice;
    totalprice;
    isactivity = false;
    isadd = false;
    selectstatus;
    minNumber;
    selectTypeList = [
        { label: '进货', value: 'REPLENISH' },
        { label: '退货', value: 'RETURN' },
        { label: '销售', value: 'SALES' },
    ];
    type = this.selectTypeList[0].value;
    // selectinList = [
    //     { label: '进货' },
    //     { label: '退货' },
    // ];
    // selectoutList = [
    //     { label: '售出' },
    //     { label: '返厂' },
    // ];
    select;
    isinselect = false;
    isoutselect = false;
    name;
    size;
    companyId;
    typeId;
    price;
    companyName;
    key;
    list = [];
    id;
    salesPrice;
    // tslint:disable-next-line:variable-name
    customer_name;
    // tslint:disable-next-line:variable-name
    customer_phone;
    activity;
    number;
    activityList = [];
    inOutList = [];
    searchModule = {
        name: '',
        goodType: '',
        company: '',
        fromDate: '',
        toDate: '',
        type: '',
    };
    staffName;
    showTime = moment().format('YYYY-MM-DD');
    inprice;
    confirmPrice;
    constructor(
        private modalService: NzModalService,
        private wsService: WebSocketService,
        private usService: UserSocketService,
        private notification: NzNotificationService,
        private fb: FormBuilder,
        public httpService: HttpService,
    ) { }

    ngOnInit() {
        // 第一种写法
        // this.wsService.createObservableSocket('ws://192.168.0.108:8081/websocket')
        //     .subscribe(
        //         data => console.log(data),
        //         err => console.log(err),
        //         () => console.log('流已经结束')
        //     );
        // this.showTime = new Date();
        this.surveyForm = this.fb.group({
            name: [null, [Validators.required]],
            selectstatus: [null, [Validators.required]],
        });
        // this.usService.messages.subscribe(msg => {
        //     this.notification.blank(
        //         'Title',
        //         msg,
        //         { nzDuration: 4000 },
        //     );
        //     console.log('Response from websocket: ' + msg, msg.data);

        // });
        this.getGoodsType();
        this.getCompany();
        this.getActivityList();
        this.getList();
        this.getUserName();
    }
    // sendMessageToserver() {
    //     // this.wsService.sendMessage('Hello from client');
    //     this.usService.messages.next(this.message);
    // }
    getUserName() {
        this.staffName = localStorage.getItem('name');
        if (this.staffName) {
            this.staffName = JSON.parse(this.staffName);
            console.log('staffName', this.staffName);
        }
    }
    getActivityList() {
        this.httpService.getactivitytype().subscribe((r: any) => {
            this.activityList = r;
            console.log(this.activityList);
        }, err => this.err(err));
    }
    getList() {
        this.httpService.findGoods({}).subscribe((r: any) => {
            this.list = r;
        }, err => this.err(err));
    }
    getInOutList() {
        this.httpService.findTradingInfo(
            {
                type: this.type,
            }
        ).subscribe((r: any) => {
            this.inOutList = r;
            console.log('====>777777', r);
        }, err => this.err(err));
    }
    changeType() {
        this.getInOutList();
    }
    tabChange(event, currentTabIndex) {
        this.searchModule = {
            name: '',
            goodType: '',
            company: '',
            fromDate: '',
            toDate: '',
            type: '',
        };
        this.pageIndex = 1;
        // this.currentTabIndex = event.index;
        if (event.index === 0 || currentTabIndex === 0) {
            this.getList();

        } else if (event.index === 1 || currentTabIndex === 1) {
            this.getInOutList();

        }
    }
    err = function catchError(err) {
        console.log('err', err);
        if (err) {
            // this.enterParams = {
            //   userName: '',
            //   password: '',
            // };
            this.modalService.error({
                nzTitle: err.error.message ? err.error.message : '操作失败',
            });
            return;
        }
    };
    getGoodsType() {
        this.httpService.getGoodsType().subscribe((r: any) => {
            this.selectType = r;
            console.log('====>getGoodsType', r);
        }, err => this.err(err));
    }
    getCompany() {
        this.httpService.getCompany().subscribe((r: any) => {
            this.selectCompany = r;
            console.log('====>getCompany', r);
        }, err => this.err(err));
    }
    refreshStatus(): void {
        this.isAllDisplayDataChecked = this.listOfDisplayData.every(item =>
            this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.listOfDisplayData.some(item =>
            this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    }
    pageChange(event) {
    }
    currentPageDataChange($event): void {
        this.listOfDisplayData = $event;
        this.refreshStatus();
    }
    checkAll(value: boolean): void {
        this.listOfDisplayData.forEach(item => this.mapOfCheckedId[item.id] = value);
        this.refreshStatus();
    }
    change(key) {
    }
    editPerson(data) {
        this.key = 'edit';
        this.id = data.id;
        this.title = '编辑商品资料';
        this.isVisible = true;
        this.isedit = true;
        this.isadd = false;
        // this.isactivity = false;
        this.isinselect = false;
        this.isoutselect = false;
        this.perprice = '销售单价';
        this.minNumber = data.minNumber;
        this.name = data.name;
        this.size = data.size;
        this.companyId = data.company.id;
        this.typeId = data.goodType.id;
        this.price = data.price;
        console.log(0);
    }
    getSurveyInfo(id) {
    }
    submitForm() {
    }
    handleOk(key): void {
        key = this.key;
        if (key === 0) {
            this.httpService.creatGoods(
                {
                    name: this.name,
                    size: this.size,
                    companyId: this.companyId,
                    typeId: this.typeId,
                }
            ).subscribe((r: any) => {
                this.isVisible = false;
                this.key = '';
                this.getList();
                this.modalService.success({
                    nzTitle: '添加商品成功',
                });
            }, err => this.err(err));
        } else if (key === 'edit') {
            // this.name = this.name;
            // this.size = this.size;
            // this.companyId = this.companyId;
            // this.typeId = this.typeId;
            // this.price = this.price;
            this.httpService.creatGoods(
                {
                    id: this.id,
                    name: this.name,
                    size: this.size,
                    companyId: this.companyId,
                    typeId: this.typeId,
                    price: this.salesPrice,
                    minNum: Number(this.minNumber),
                }
            ).subscribe((r: any) => {
                this.isVisible = false;
                this.getList();
                this.modalService.success({
                    nzTitle: '编辑商品成功',
                });
                console.log('====>selectCoselectCompanympany', r);
            }, err => this.err(err));
        } else if (key === 'in') {
            // this.name = this.name;
            // this.size = this.size;
            // this.companyId = this.companyId;
            // this.typeId = this.typeId;
            // this.price = this.price;
            this.httpService.putgoods(
                {
                    goodsId: this.id, // 商品id
                    type: 'REPLENISH', // 出入库类型
                    number: Number(this.number), // 入库数量
                    price: Number(this.price), // 客户id
                    salesPrice: Number(this.salesPrice), // 客户id
                }
            ).subscribe((r: any) => {
                this.isVisible = false;
                this.getList();
                this.modalService.success({
                    nzTitle: '入库商品成功',
                });
                console.log('====>selectCoselectCompanympany', r);
            }, err => this.err(err));
        } else if (key === 'out') {
            this.httpService.putgoods(
                {
                    goodsId: this.id, // 商品id
                    type: 'SALES', // 出入库类型
                    number: Number(this.number), // 入库数量
                    activity_id: this.activity, // 折扣
                    customer_name: this.customer_name, // 客户id
                    customer_phone: this.customer_phone, // 客户id
                }
            ).subscribe((r: any) => {
                this.isVisible = false;
                this.getList();
                this.modalService.success({
                    nzTitle: '商品销售成功',
                });
                console.log('====>selectCoselectCompanympany', r);
            }, err => this.err(err));
        }
        // this.getList();
    }
    handleCancel() {
        this.isVisible = false;
        // this.surveyForm.reset();
    }
    search() {
        if (this.currentTabIndex === 0) {
            this.httpService.findGoods(
                this.searchModule
            ).subscribe((r: any) => {
                // this.inOutList = r;
                this.list = r;
                console.log('====>777777', r);
            }, err => this.err(err));
        } else if (this.currentTabIndex === 1) {
            this.searchModule.fromDate = this.dateFormat(this.searchModule.fromDate);
            this.searchModule.toDate = this.dateFormat(this.searchModule.toDate, true);
            this.searchModule.type = this.type;
            console.log('====>777777', this.searchModule);

            this.httpService.findTradingInfo(
                this.searchModule
            ).subscribe((r: any) => {
                // this.inOutList = r;
                this.inOutList = r;
            }, err => this.err(err));
        }
    }
    clear() {
        if (this.currentTabIndex === 0) {
            this.searchModule = {
                name: '',
                goodType: null,
                company: null,
                fromDate: '',
                toDate: '',
                type: '',
            };
            this.getList();
        } else if (this.currentTabIndex === 1) {
            this.searchModule = {
                name: '',
                goodType: null,
                company: null,
                fromDate: '',
                toDate: '',
                type: this.type,
            };
            this.getInOutList();
        }
    }
    in(index, data) {
        this.key = 'in';
        if (index === 0) {
            this.isVisible = true;
            this.id = data.id;
            this.title = '入库信息';
            this.isedit = false;
            this.isadd = false;
            this.isinselect = true;
            this.isoutselect = false;
            this.select = '入库分类';
            this.selectstatus = '进货';
            this.numbers = '进货数量';
            this.time = '进货日期';
            this.perprice = '销售单价';
            this.totalprice = '进货总价';
            this.name = data.name;
            this.size = data.size;
            this.companyName = data.company.companyName;
            this.type = data.goodType.type;
            this.salesPrice = data.price;
        }
    }
    out(index, data) {
        this.key = 'out';
        if (index === 0) {
            this.isVisible = true;
            this.title = '出库信息';
            this.isedit = false;
            this.isadd = false;
            this.isinselect = false;
            this.isoutselect = true;
            this.select = '出库分类';
            this.selectstatus = '销售';
            this.numbers = '销售数量';
            this.time = '销售日期';
            this.perprice = '销售单价';
            this.totalprice = '销售总价';
            this.id = data.id;
            this.name = data.name;
            this.size = data.size;
            this.companyName = data.company.companyName;
            this.type = data.goodType.type;
            this.price = data.price;
        }
    }
    setNew(index) {
        switch (index) {
            case 0:
                this.key = 0;
                this.title = '新增商品';
                this.isVisible = true;
                this.isadd = true;
                this.isedit = false;
                // this.isactivity = false;
                this.isinselect = false;
                this.isoutselect = false;
                console.log(0);
                break;
            default:
                break;
        }
    }
    dateFormat(dateVal: Date | string, isEnd?: boolean) {
        if (isEnd) {
            return dateVal ? moment(dateVal).format('YYYY-MM-DD') + ' 23:59:59' : '';
        } else {
            return dateVal ? moment(dateVal).format('YYYY-MM-DD') + ' 00:00:00' : '';
        }
    }
    onChange(event) { }
    addMoney(num, sales?: number) {
        return (this.price * num).toFixed(2);
    }
    changeSaleNum(num) {
        this.inprice = this.addMoney(num);
        this.confirmPrice = this.inprice;
    }
    changeSaleDiscount(event) {
        console.log(event);
        let discount;
        if (event) {
            discount = this.activityList.filter(item => item.id === event).map((key) => {
                return Number(key.discount * 0.1).toFixed(2);
            });
            // tslint:disable-next-line:no-unused-expression));
            console.log(discount, this.inprice);
            this.confirmPrice = this.addMoney(discount, this.inprice);
        } else if (!event) {
            this.confirmPrice = this.inprice;
        }
    }
    exportForm() {
        let result;
        this.searchModule.fromDate = this.dateFormat(this.searchModule.fromDate);
        this.searchModule.toDate = this.dateFormat(this.searchModule.toDate, true);
        this.searchModule.type = this.type;

        this.httpService.submit(
            this.searchModule
        ).subscribe((r: any) => {
            result = r;
        }, err => this.err(err));
        if (result) {
            this.httpService.downlown(
                result
            ).subscribe((r: any) => {
                console.log('==========>>>>>download', r);
            }, err => this.err(err));
        }
    }
}
