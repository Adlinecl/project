import { Component, OnInit, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../http.service';

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
    constructor(private modalService: NzModalService,
                public httpService: HttpService, ) { }

    ngOnInit() {
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
}
