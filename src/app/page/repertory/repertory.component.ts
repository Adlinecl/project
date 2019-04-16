import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
// import { DetailinComponent } from '../detailin/detailin.component';
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
    message = '1111111ceshi';
    constructor(private modalService: NzModalService,
                private wsService: WebSocketService,
                private usService: UserSocketService,
                private notification: NzNotificationService
                ) { }

    ngOnInit() {
        // 第一种写法
        // this.wsService.createObservableSocket('ws://192.168.0.108:8081/websocket')
        //     .subscribe(
        //         data => console.log(data),
        //         err => console.log(err),
        //         () => console.log('流已经结束')
        //     );
        this.usService.messages.subscribe(msg => {
            this.notification.blank(
                'Title',
                msg,
                { nzDuration: 4000},
              );
            console.log('Response from websocket: ' + msg, msg.data);

        });
    }
    sendMessageToserver() {
        // this.wsService.sendMessage('Hello from client');
        this.usService.messages.next(this.message);
    }
    tabChange() {}
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
    exportForm() {}
    search() {}
    clear() {}
    in() {}
    out() {}
}
