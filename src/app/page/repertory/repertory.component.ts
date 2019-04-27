import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
// import { DetailinComponent } from '../detailin/detailin.component';
import { WebSocketService } from '../../web-socket.service';
import { UserSocketService } from '../../use-socket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    mapOfCheckedId: { [key: string]: boolean } = {};
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
        { label: '中式' },
        { label: '欧式' },
    ];
    isVisible = false;
    pageIndex = 1;
    currentTabIndex = 0;
    pageSize = 10;
    surveyForm: FormGroup;
    state;
    goods;
    message = '1111111ceshi';
    title;
    constructor(private modalService: NzModalService,
                private wsService: WebSocketService,
                private usService: UserSocketService,
                private notification: NzNotificationService,
                private fb: FormBuilder,
    ) { }

    ngOnInit() {
        // 第一种写法
        // this.wsService.createObservableSocket('ws://192.168.0.108:8081/websocket')
        //     .subscribe(
        //         data => console.log(data),
        //         err => console.log(err),
        //         () => console.log('流已经结束')
        //     );
        this.surveyForm = this.fb.group({
            name: [null, [Validators.required]],
        });
        this.usService.messages.subscribe(msg => {
            this.notification.blank(
                'Title',
                msg,
                { nzDuration: 4000 },
            );
            console.log('Response from websocket: ' + msg, msg.data);

        });
    }
    sendMessageToserver() {
        // this.wsService.sendMessage('Hello from client');
        this.usService.messages.next(this.message);
    }
    tabChange(event, currentTabIndex) {
        this.pageIndex = 1;
        // this.currentTabIndex = event.index;
        if (event.index === 0 || currentTabIndex === 0) {
            this.state = 'toDesign';
            this.mapOfCheckedId = {};
        } else if (event.index === 1 || currentTabIndex === 1) {
            this.state = 'alreadyDesign';
            this.mapOfCheckedId = {};
        } else if (event.index === 2 || currentTabIndex === 2) {
            this.state = 'toApprove';
            this.mapOfCheckedId = {};
        }
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
    getSurveyInfo(id) {
        // this.httpService.findAddress(id).subscribe( (r: any) => {
        //     this.pointItem = r.data;
        //     this.surveyForm.get('id').setValue(r.data[0].id);
        //     this.surveyForm.get('name').setValue(r.data[0].name);
        //     this.surveyForm.get('lng').setValue(r.data[0].lng);
        //     this.surveyForm.get('lat').setValue(r.data[0].lat);
        //     this.surveyForm.get('remark').setValue(r.data[0].remark);
        //     this.orderNum = r.data.orderNum;
        // });
    }
    submitForm() {
        // this.postPoints.data = [];
        // // tslint:disable-next-line: forin
        // for (const i in this.surveyForm.controls) {
        //   this.surveyForm.controls[i].markAsDirty();
        //   this.surveyForm.controls[i].updateValueAndValidity();
        // }
        // const data = this.surveyForm.value;
        // if (this.surveyForm.status === 'VALID') {
        //     // this.pointItem[0].dissatisfaction = this.surveyForm.get('dissatisfaction').value;
        //     this.pointItem[0].name = this.surveyForm.get('name').value;
        //     this.pointItem[0].lng = this.surveyForm.get('lng').value;
        //     this.pointItem[0].lat = this.surveyForm.get('lat').value;
        //     this.pointItem[0].remark = this.surveyForm.get('remark').value;
        //     const postData = {
        //         data: this.pointItem,
        //     };
        //     console.log(postData);
        //     this.httpService.updateAddress(postData).subscribe((r: any) => {
        //         this.isVisible = false;
        //         if (r.code === 200) {
        //         this.modalService.success({ nzTitle: '保存成功！' });
        //         // this.getTitleList();
        //         } else {
        //         this.modalService.error({ nzTitle: '保存失败！' });
        //         }
        //     });
        // }
    }
    handleCancel() {
        this.isVisible = false;
        this.surveyForm.reset();
    }
    exportForm() { }
    search() { }
    clear() { }
    in(index) {
        if (index === 0) {
            this.isVisible = true;
            this.title = '入库信息';

        }
    }
    out(index) {
        if (index === 0) {
            this.isVisible = true;
            this.title = '出库信息';
        }
    }
}
