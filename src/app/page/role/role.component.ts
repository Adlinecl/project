import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailinComponent } from '../detailin/detailin.component';


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
    mapOfCheckedId: { [key: string]: boolean } = {};
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
        {
            index: 3,
            name: '员工信息管理',
        },
        {
            index: 4,
            name: '活动促销',
        },
    ];
    searchList: {
        name: '',
    };
    selectGoods = [
        { label: '中式' },
        { label: '欧式' },
    ];
    selectProvider = [];
    selectName = [];
    goods;
    roleParams = {
        roleName: '',
        permissionId: '',
    };
    selectPermissions = [];
    isVisible = false;
    isConfirmLoading = false;
    surveyForm: FormGroup;
    // 树形选择
    value: string[] = ['0-0-0'];
    nodes = [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                    isLeaf: true
                }
            ]
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                    isLeaf: true
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                    isLeaf: true
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                    isLeaf: true
                }
            ]
        }
    ];
    date;
    constructor(private modalService: NzModalService,
                public httpService: HttpService,
                private fb: FormBuilder, ) { }

    ngOnInit() {
        this.surveyForm = this.fb.group({
            name: [null, [Validators.required]],
        });
        this.permission();
    }
    tabSelect(index) {
    }
    tabChange() { }
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
    search() {}
    clear() {}
    delete() {}
    // editPerson() {
    //     this.isVisible = true;
    // }
    submitForm() {

    }
    handleCancel() {
        this.isVisible = false;
    }
    // 树形选择
    onChange($event: string[]): void {
        console.log($event);
    }
    confirm() {}
    reset() {}
    editPerson(index) {
        switch (index) {
            case 0 :
            console.log(0);
            break;
            case 1 :
            console.log(1);
            break;
            case 2:
            console.log(2);
            break;
            case 3:
            console.log(3);
            break;
            default:
            break;
        }
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
    deleteItem() {}
    /// 角色相关的东西
    newRole() {
        this.httpService.createRole(this.roleParams).subscribe((r: any) => {
            console.log(r);
        }, err => this.err(err));
    }

    permission() {
        this.httpService.getPermission().subscribe((r: any) => {
            this.selectPermissions = r;
        }, err => this.err(err));
    }
    serchRoleName(name) {
        this.httpService.getRole(name).subscribe((r: any) => {
        }, err => this.err(err));
    }
}
