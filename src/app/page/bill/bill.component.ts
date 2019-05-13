import { Component, OnInit, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as momentNs from 'moment';
const moment = momentNs;

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.less']
})
export class BillComponent implements OnInit {
    orderList = [];
    listOfData = [];
    nowPage = 1;
    // tslint:disable-next-line:variable-name
    _total = 100;
    listOfDisplayData: any[] = [];
    mapOfCheckedId: { [key: string]: boolean } = {};
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    allChecked = false;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    // loading = true;
    sortName: string | null = null;
    sortValue: string | null = null;
    filterGender = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
    searchGenderList: string[] = [];
    tabs = [
        {
            index: 0,
            name: '商品',
        },
        {
            index: 1,
            name: '销售人员',
        },
    ];
    isVisible = false;
    surveyForm: FormGroup;
    title;
    startDate = '';
    endDate = '';
    currentTabIndex = 0;
    name;
    staffId;
    staffList = [];
    money;
    constructor(
        private modalService: NzModalService,
        public httpService: HttpService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        // this.surveyForm = this.fb.group({
        //     name: [null, [Validators.required]],
        // });
    }
    getUserName() {
        this.name = localStorage.getItem('name');
        if (this.name) {
            this.name = JSON.parse(this.name);
            console.log('name', this.name);
        }
    }
    tabChange(event, currentTabIndex) {
        this.startDate = '';
        this.endDate = '';
        this.pageIndex = 1;
        this.orderList = [];
        this.money = 0;
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
    addmoney(num) {
        num += num;
        return num;
    }
    search() {
        this.startDate = this.dateFormat(this.startDate);
        this.endDate = this.dateFormat(this.endDate, true);
        if (this.startDate && this.endDate) {
            if (this.currentTabIndex === 0) {
                this.httpService.getAccountInfo(
                    {
                        startDate: this.startDate,
                        endDate: this.endDate,
                    }
                ).subscribe((r: any) => {
                    this.orderList = r;
                    for (const item of r) {
                        this.money = this.addmoney(item.profits);
                    }
                    console.log('====>startDatestartDatestartDatestartDate', r);
                }, err => this.err(err));
            } else if (this.currentTabIndex === 1) {
                this.httpService.getAccountByStaff(
                    {
                        startDate: this.startDate,
                        endDate: this.endDate,
                    }
                ).subscribe((r: any) => {
                    this.orderList = r;
                    console.log('====>startDatestartDatestartDatestartDate', r);
                }, err => this.err(err));
            }
        } else {
            this.modalService.warning({
                nzTitle: '请选择时间区间',
            });
        }
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
    sort(sort: { key: string; value: string }): void {
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.searchData();
    }
    searchData(reset: boolean = false): void {
        // const filterFunc = (item: { name: string; age: number; address: string }) =>
        //     (this.listOfSearchName.length ? this.listOfSearchName.some(name =>
        //         item.name.indexOf(name) !== -1) : true);
        // const data = this.listOfData.filter(item => filterFunc(item));
        // if (this.sortName && this.sortValue) {
        //     this.listOfDisplayData = data.sort((a, b) =>
        //         this.sortValue === 'ascend'
        //             // tslint:disable-next-line:no-non-null-assertion
        //             ? a[this.sortName!] > b[this.sortName!]
        //                 ? 1
        //                 : -1
        //             // tslint:disable-next-line:no-non-null-assertion
        //             : b[this.sortName!] > a[this.sortName!]
        //                 ? 1
        //                 : -1
        //     );
        // } else {
        //     this.listOfDisplayData = data;
        // }
    }
    clear() {
        this.startDate = '';
        this.endDate = '';
        this.pageIndex = 1;
        this.orderList = [];
        this.money = 0;
    }
    details(data) {
        this.isVisible = true;
        this.title = '查看详情';
        this.httpService.getAccountInfoByStaff(
            {
                staffId: data.staffId,
                startDate: this.startDate,
                endDate: this.endDate,
            }
        ).subscribe((r: any) => {
            this.staffList = r;
            this.orderList = r;
            for (const item of r) {
                this.money = this.addmoney(item.profits);
            }
            console.log('====>startDatestartDatestartDatestartDate', r);
        }, err => this.err(err));
    }
    onChange(event) {

    }
    handleCancel() {
        this.isVisible = false;
        this.staffList = [];
        // this.surveyForm.reset();
    }
    dateFormat(dateVal: Date | string, isEnd?: boolean) {
        if (isEnd) {
            return dateVal ? moment(dateVal).format('YYYY-MM-DD') + ' 23:59:59' : '';
        } else {
            return dateVal ? moment(dateVal).format('YYYY-MM-DD') + ' 00:00:00' : '';
        }
    }
}
