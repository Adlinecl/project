import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as momentNs from 'moment';
const moment = momentNs;

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.less']
})
export class SalesComponent implements OnInit {
    orderList = [];
    nowPage = 1;
    // tslint:disable-next-line:variable-name
    _total = 100;
    listOfDisplayData: any[] = [];
    mapOfCheckedId: { [key: string]: boolean } = {};
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    allChecked = false;
    isVisible = false;
    surveyForm: FormGroup;
    title;
    returnPrice;
    sale = {
        goodsName: '',
        companyName: '',
        price: '',
        number: '',
        totalPrice: '',
        discount: '',
        confirmPrice: '',
        // returnNum: 0,
        returnPrice: '',
        createDate: '',
        customerName: '',
        customerPhone: '',
        staffName: '',
        staffPhone: '',
        status: '',
        orderId: '',
        returnNum: 0,
        goodsId: '',
    };
    staffName;
    showTime = moment().format('YYYY-MM-DD');
    constructor(private modalService: NzModalService,
        public httpService: HttpService,
        private fb: FormBuilder, ) { }

    ngOnInit() {
        this.surveyForm = this.fb.group({
            name: [null, [Validators.required]],
        });
        this.getLis();
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
    addMoney(num) {
        return this.returnPrice = Number(Number(this.sale.confirmPrice) / Number(this.sale.number) * Number(num)).toFixed(2);
    }
    getLis() {
        this.httpService.orderList().subscribe((r: any) => {
            this.orderList = r;
            console.log(this.orderList);
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
    returnSales(data) {
        this.isVisible = true;
        this.title = '退货信息';
        this.sale = {
            goodsName: data.goodsName,
            companyName: data.companyName,
            price: data.price,
            number: data.number,
            totalPrice: data.totalPrice,
            discount: data.discount,
            confirmPrice: data.confirmPrice,
            // returnNum: data.,
            returnPrice: data.returnPrice,
            createDate: data.createDate,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            staffName: data.staffName,
            staffPhone: data.staffPhone,
            status: data.status,
            orderId: data.id,
            // returnNum: data.returnNum,
            returnNum: 0,
            goodsId: data.goodsId,
        };
    }
    handleCancel() {
        this.isVisible = false;
    }
    inputChange(num) {
        if (this.sale.number < num) {
            this.modalService.info({
                nzTitle: '退货数量有误，请重新输入',
            });
        } else {
            this.addMoney(num);
        }
    }
    handleOk() {
        this.httpService.putgoods(
            {
                orderId: this.sale.orderId,
                returnNum: this.sale.returnNum,
                goodsId: this.sale.goodsId,
                type: 'RETURN',
            }
        ).subscribe((r: any) => {
            if (r === 'success') {
                this.isVisible = false;
                this.modalService.success({
                    nzTitle: '商品退货成功',
                });
            }
        }, err => this.err(err));
    }
}
