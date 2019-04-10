import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NzModalService } from 'ng-zorro-antd';
import { DetailinComponent } from '../detailin/detailin.component';
import { WebSocketService } from '../../web-socket.service';
import { UserSocketService } from '../../use-socket.service';

@Component({
  selector: 'app-repertory',
  templateUrl: './repertory.component.html',
  styleUrls: ['./repertory.component.less'],
  providers: [
    HttpService,
    WebSocketService,
    UserSocketService,
    // 放service的地方 这样页面就不需要引入provider了
]
})
export class RepertoryComponent implements OnInit {
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
            name: '库存管理',
        },
        {
            index: 1,
            name: '入库列表',
        },
        {
            index: 2,
            name: '出库列表',
        },
        // {
        //     index: 2,
        //     name: '销售',
        // },
    ];
    searchList: {
      name: '',
    };
    selectGoods = [
      {label: '中式'},
      {label: '欧式'},
    ];
    goods;
  constructor(private modalService: NzModalService,
              private wsService: WebSocketService,
              private usService: UserSocketService) { }

  ngOnInit() {
    // this.wsService.createObservableSocket('ws://localhost:5200')
    //     .subscribe(
    //         data => console.log(data),
    //         err => console.log(err),
    //         () => console.log('流已经结束')
    //     );
    this.usService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg);
    });
  }
    // tslint:disable-next-line:member-ordering
    private message = {
      author: 'tutorialedge',
      message: 'this is a test message'
    };
    sendMessageToserver() {
      // this.wsService.sendMessage('Hello from client');
      console.log('new message from client to websocket: ', this.message);
      this.usService.messages.next(this.message);
      this.message.message = '';
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
  toDetail(): void {
    const modal = this.modalService.create({
      nzTitle: '商品详情',
      nzContent: DetailinComponent,
      nzWidth: '1300px',
      nzComponentParams: {
      },
      nzFooter: null,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    setTimeout(() => {
      const instance = modal.getContentComponent();
    }, 2000);
 }
}
