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
    sortValue: string | null = null;
    sortKey: string | null = null;
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
    constructor(private modalService: NzModalService,
                public httpService: HttpService,
                private fb: FormBuilder, ) { }

    ngOnInit() {
        // this.surveyForm = this.fb.group({
        //     name: [null, [Validators.required]],
        // });
    }
    tabChange() {}
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
        this.sortKey = sort.key;
        this.sortValue = sort.value;
        this.searchData();
    }
    searchData(reset: boolean = false): void {
        if (reset) {
          this.pageIndex = 1;
        }
        // this.loading = true;
        // this.randomUserService
        //   .getUsers(this.pageIndex, this.pageSize, this.sortKey!, this.sortValue!, this.searchGenderList)
        //   .subscribe((data: any) => {
        //     this.loading = false;
        //     this.total = 200;
        //     this.listOfData = data.results;
        //   });
      }
      search( ) {}
      clear() {}
      details() {
        this.isVisible = true;
        this.title = '查看详情';
      }
      onChange(event) {

      }
      handleCancel() {
        this.isVisible = false;
        // this.surveyForm.reset();
    }
    dateFormat(dateVal: Date | string, isEnd?: boolean) {
        const timeZone = new Date().getTimezoneOffset() / (-60);
        let newTimeZone = '';
        if (Math.abs(timeZone) < 10) {
          if (timeZone < 0) {
            newTimeZone = '-0' + Math.abs(timeZone);
          } else {
            newTimeZone = '+0' + Math.abs(timeZone);
          }
        }
        if (isEnd) {
          return dateVal ? moment(dateVal).format('YYYY-MM-DD') + 'T23:59:59.999' + newTimeZone + '00' : '';
        } else {
          return dateVal ? moment(dateVal).format('YYYY-MM-DD') + 'T00:00:00.000' + newTimeZone + '00' : '';
        }
      }
}
