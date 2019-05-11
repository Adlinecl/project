import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    sale = {
        goodsName: '',
        companyName: '',
        price: '',
        number: '',
        totalPrice: '',
        discount: '',
        confirmPrice: '',
        // returnNum: '',
        returnPrice: '',
        createDate: '',
        customerName: '',
        customerPhone: '',
        staffName: '',
        staffPhone: '',
        status: '',
        orderId: '',
        returnNum: '',
        goodsId: '',
    };
    constructor(private modalService: NzModalService,
                public httpService: HttpService,
                private fb: FormBuilder, ) { }

    ngOnInit() {
        this.surveyForm = this.fb.group({
            name: [null, [Validators.required]],
        });
        this.getLis();
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
            returnNum: data.returnNum,
            goodsId: data.goodsId,
        };
    }
    handleCancel() {
        this.isVisible = false;
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
