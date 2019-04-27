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
    title;
    judge = 0;
    pageIndex = 1;
    currentTabIndex = 0;
    pageSize = 10;
    state;
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
    tabChange(event, currentTabIndex) {
        this.pageIndex = 1;
        // this.currentTabIndex = event.index;
        if (event.index === 0 || currentTabIndex === 0) {
            this.state = 'toDesign';
            this.mapOfCheckedId = {};
            this.judge = 0;
        } else if (event.index === 1 || currentTabIndex === 1) {
            this.state = 'alreadyDesign';
            this.mapOfCheckedId = {};
            this.judge = 1;
        } else if (event.index === 2 || currentTabIndex === 2) {
            this.state = 'toApprove';
            this.mapOfCheckedId = {};
            this.judge = 2;
        } else if (event.index === 3 || currentTabIndex === 3) {
            this.state = 'toDistribute';
            this.mapOfCheckedId = {};
            this.judge = 3;
        } else if (event.index === 4 || currentTabIndex === 4) {
            this.state = 'toSample';
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
    search() {}
    clear() {}
    delete() {}
    // editPerson() {
    //     this.isVisible = true;
    // }
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
    // 树形选择
    onChange($event: string[]): void {
        console.log($event);
    }
    confirm() {}
    reset() {}
    editPerson(index) {
        switch (index) {
            case 0 :
            this.title = '编辑商品资料';
            this.isVisible = true;
            console.log(0);
            break;
            case 1 :
            this.title = '编辑客户资料';
            this.isVisible = true;
            console.log(1);
            break;
            case 2:
            this.title = '编辑供应商资料';
            this.isVisible = true;
            console.log(2);
            break;
            case 3:
            this.title = '编辑员工资料';
            this.isVisible = true;
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
