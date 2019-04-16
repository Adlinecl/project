import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.less']
})
export class GoodsComponent implements OnInit {
    orderList = [];
    nowPage = 1;
    // tslint:disable-next-line:variable-name
    _total = 100;
    listOfDisplayData: any[] = [];
    mapOfCheckedId: { [key: string]: boolean } = {};
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    allChecked = false;
    constructor(private modalService: NzModalService,
                public httpService: HttpService, ) { }

    ngOnInit() {
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
    sales() {}
}
