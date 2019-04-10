import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {
  orderList = [];
  nowPage = 1;
  // tslint:disable-next-line:variable-name
  _total = 100;
  listOfDisplayData: any[] = [];
  mapOfCheckedId: { [ key: string ]: boolean } = {};
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  allChecked = false;
    tabs = [
        {
            index: 0,
            name: '商品资料管理',
        },
        {
            index: 1,
            name: '客户资料管理',
        },
        {
            index: 2,
            name: '供应商资料管理',
        },
    ];
    searchList: {
      name: '',
    };
    selectGoods = [
      {label: '中式'},
      {label: '欧式'},
    ];
    goods;
  constructor(private modalService: NzModalService, ) { }

  ngOnInit() {
  }
  err = function catchError(err) {
    console.log('err', err);
    if (err) {
      // this.enterParams = {
      //   userName: '',
      //   password: '',
      // };
      this.modalService.error({
        nzTitle: '操作失败',
      });
      return;
    }
  };
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item =>
        this.mapOfCheckedId[ item.id ]);
    this.isIndeterminate = this.listOfDisplayData.some(item =>
        this.mapOfCheckedId[ item.id ]) && !this.isAllDisplayDataChecked;
}
  pageChange(event) {
  }
  currentPageDataChange($event): void {
      this.listOfDisplayData = $event;
      this.refreshStatus();
  }
  checkAll(value: boolean): void {
      this.listOfDisplayData.forEach(item => this.mapOfCheckedId[ item.id ] = value);
      this.refreshStatus();
  }
//   toDetail(): void {
//     const modal = this.modalService.create({
//       nzTitle: '商品详情',
//       nzContent: DetailinComponent,
//       nzWidth: '1300px',
//       nzComponentParams: {
//       },
//       nzFooter: null,
//     });
//     modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

//     // Return a result when closed
//     modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

//     // delay until modal instance created
//     setTimeout(() => {
//       const instance = modal.getContentComponent();
//     }, 2000);
//  }

}
