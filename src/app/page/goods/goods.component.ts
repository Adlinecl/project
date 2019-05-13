import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as momentNs from 'moment';
const moment = momentNs;

@Component({
    selector: 'app-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.less']
})
export class GoodsComponent implements OnInit {
    orderList = [];
    nowPage = 1;
    title;
    // tslint:disable-next-line:variable-name
    _total = 100;
    listOfDisplayData: any[] = [];
    mapOfCheckedId: { [key: string]: boolean } = {};
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    allChecked = false;
    isVisible = false;
    surveyForm: FormGroup;
    list = [];
    activityList = [];
    saleItem = {
        number: 0, // 入库数量
        customer_name: '', // 客户id
        customer_phone: '', // 客户id
    };
    activity;
    type;
    price;
    companyName;
    name;
    size;
    id;
    staffName;
    showTime = moment().format('YYYY-MM-DD');
    salesPrice;
    confirmPrice;
    constructor
        (
        private modalService: NzModalService,
        public httpService: HttpService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.surveyForm = this.fb.group({
            name: [null, [Validators.required]],
        });
        this.getList();
        this.getActivityList();
        this.getUserName();
    }
    getUserName() {
        this.staffName = localStorage.getItem('name');
        if (this.staffName) {
            this.staffName = JSON.parse(this.staffName);
            console.log('staffName', this.staffName);
        }
    }
    err = function catchError(err) {
        console.log('err', err);
        if (err) {
            this.modalService.error({
                nzTitle: err.error.message ? err.error.message : '操作失败',
            });
            return;
        }
    };
    getList() {
        this.httpService.findGoods({}).subscribe((r: any) => {
            this.list = r;
        }, err => this.err(err));
    }
    getActivityList() {
        this.httpService.getactivitytype().subscribe((r: any) => {
            this.activityList = r;
            console.log(this.activityList);
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
    handleCancel() {
        this.isVisible = false;
    }
    addMoney(num, sales?: number) {
        return this.salesPrice = (this.price * num).toFixed(2);
    }
    changeSaleNum(num) {
        this.addMoney(num);
        this.confirmPrice = this.salesPrice;
    }
    changeSaleDiscount(event) {
        console.log(event);
        let discount;
        if (event) {
            discount =  this.activityList.filter(item => item.id === event).map((key) => {
                return Number(key.discount * 0.1).toFixed(2);
            });
            // tslint:disable-next-line:no-unused-expression));
            console.log(discount, this.salesPrice);
            this.confirmPrice = this.addMoney(discount, this.salesPrice);
        } else if (!event) {
            this.confirmPrice = this.salesPrice;
        }
    }
    handleOk() {
        this.isVisible = false;
        this.httpService.putgoods(
            {
                goodsId: this.id, // 商品id
                type: 'SALES', // 出入库类型
                number: Number(this.saleItem.number), // 入库数量
                activity_id: this.activity, // 折扣
                customer_name: this.saleItem.customer_name, // 客户id
                customer_phone: this.saleItem.customer_phone, // 客户id
            }
        ).subscribe((r: any) => {
            this.isVisible = false;
            this.modalService.success({
                nzTitle: '出售商品成功',
            });
            console.log('====>selectCoselectCompanympany', r);
        }, err => this.err(err));
    }
    sales(data) {
        this.isVisible = true;
        this.id = data.id;
        this.title = '商品销售';
        this.name = data.name;
        this.size = data.size;
        this.companyName = data.company.companyName;
        this.type = data.goodType.type;
        this.price = data.price;
    }
}
