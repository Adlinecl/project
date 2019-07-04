import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailinComponent } from '../detailin/detailin.component';
import { EClickType } from '../../enum-data';


@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {
    EClickType = EClickType;
    orderList = [];
    nowPage = 1;
    // tslint:disable-next-line:variable-name
    _total = 100;
    listOfDisplayData: any[] = [];
    mapOfCheckedId: { [key: string]: boolean } = {};
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    allChecked = false;
    loading = true;
    tabs = [
        // {
        //     index: 0,
        //     name: '商品资料管理',
        // },
        // {
        //     index: 0,
        //     name: '客户资料管理',
        // },
        {
            index: 0,
            name: '供应商资料管理',
        },
        {
            index: 1,
            name: '员工信息管理',
        },
        {
            index: 2,
            name: '活动促销',
        },
        {
            index: 3,
            name: '角色管理',
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
        roleId: '',
    };
    selectPermissions = [];
    activityList = [];
    isVisible = false;
    isConfirmLoading = false;
    surveyForm: FormGroup;
    size = 'default';
    permissionId = [];
    key;
    date;
    title;
    judge = 0;
    pageIndex = 1;
    currentTabIndex = 0;
    pageSize = 10;
    userRole = {};
    state;
    isadd = false;
    isstop = false;
    id;
    status;
    company = [];
    roleList = [];
    roleId = [];
    users = [];
    text;
    phone;
    searchItems = {
        name: '',
        phone: '',
    };
    isrole = false;
    isdelete = false;
    constructor(
        private modalService: NzModalService,
        public httpService: HttpService,
        private fb: FormBuilder, ) { }

    ngOnInit() {
        this.surveyForm = this.fb.group({
            name: [null, [Validators.required]],
            discount: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            startDate: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            address: [null, [Validators.required]],
            companyName: [null, [Validators.required]],
            age: [null, [Validators.required]],
            gender: [null, [Validators.required]],
            multipleValue: [null, [Validators.required]],
            roleName: [null, [Validators.required]],
            roleId: [null, [Validators.required]],
            permissionId: [null, [Validators.required]],
        });
        // this.permission();
        this.getCompany();
        // this.getUsers();
    }
    getRole() {
        this.loading = true;
        this.httpService.getRoleList().subscribe((r: any) => {
            this.roleList = r;
            this.loading = false;
            console.log(this.roleList);
        }, err => this.err(err));
    }
    // 做成显示角色在列表里面=================
    getUserById(id, type?: string) {
        type = this.key;
        this.roleId = [];
        this.httpService.getUserById(id).subscribe((r: any) => {
            this.userRole = r;
            for (const item of r.roleName) {
                this.roleId.push(item.id);
            }
            if (type === 'person') {
                this.surveyForm.get('roleId').setValue(this.roleId);
            }
        }, err => this.err(err));
    }
    //// 做成显示权限但是没用
    getRoleById(id) {
        this.httpService.getRole(id).subscribe((r: any) => {
            // this.userRole = r;
            console.log('getRoleById', r);
        }, err => this.err(err));
    }
    getUsers() {
        this.loading = true;
        this.httpService.getUsers({}).subscribe((r: any) => {
            if (r.length > 0) {
                for (const item of r) {
                    item.islook = false;
                }
                this.users = r;
                this.loading = false;
            }
            console.log(this.users);
        }, err => this.err(err));
    }
    getActivityList() {
        this.loading = true;
        this.httpService.getactivity().subscribe((r: any) => {
            this.activityList = r;
            this.loading = false;
            console.log(this.activityList);
        }, err => this.err(err));
    }
    getCompany() {
        this.loading = true;
        this.httpService.gcompany().subscribe((r: any) => {
            this.company = r;
            this.loading = false;
            console.log(this.company);
        }, err => this.err(err));
    }
    look(data) {
        data.islook = !data.islook;
        if (data.islook) {
            this.getUserById(data.id);
        }
    }
    tabSelect(index) {
    }
    tabChange(event, currentTabIndex) {
        this.pageIndex = 1;
        if (event.index === 0 || currentTabIndex === 0) {
            this.judge = 0;
            this.getCompany();
        } else if (event.index === 1 || currentTabIndex === 1) {
            this.judge = 1;
            this.getUsers();
            this.getRole();
        } else if (event.index === 2 || currentTabIndex === 2) {
            this.judge = 2;
            this.getActivityList();

        } else if (event.index === 3 || currentTabIndex === 3) {
            this.judge = 3;
            this.getRole();
            this.permission();

        }
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
    search() {
        this.loading = true;
        this.httpService.getUsers(this.searchItems).subscribe((r: any) => {
            this.users = r;
            this.loading = false;
            if (r.length > 0) {
                for (const item of r) {
                    item.islook = false;
                }

            }
            console.log(this.users);
        }, err => this.err(err));
    }
    clear() {
        this.searchItems = {
            name: '',
            phone: '',
        };
        this.getUsers();
    }
    delete() { }
    // editPerson() {
    //     this.isVisible = true;
    // }
    submitForm(type?: string, value?: string) {
        // this.loading = true;
        value = this.key;
        let postlist = {};
        if (value === 'componey') {
            // tslint:disable-next-line: forin
            for (const i in this.surveyForm.controls) {
                this.surveyForm.controls[i].markAsDirty();
                this.surveyForm.controls[i].updateValueAndValidity();
            }
            const data = this.surveyForm.value;
            if (data.phone && data.address && data.companyName) {
                if (type === 'add') {
                    postlist = {
                        phone: data.phone,
                        address: data.address,
                        companyName: data.companyName,
                    };
                    this.httpService.postcompany(postlist).subscribe((r: any) => {
                        if (r === 'success') {
                            this.isVisible = false;
                            this.getCompany();
                            this.modalService.success({
                                nzTitle: '供应商添加成功',
                            });
                        }
                    }, err => this.err(err));
                } else {
                    postlist = {
                        phone: this.surveyForm.get('phone').value,
                        address: this.surveyForm.get('address').value,
                        companyName: this.surveyForm.get('companyName').value,
                        id: this.id,
                    };
                    console.log(postlist);
                    this.httpService.putcompany(postlist).subscribe((r: any) => {
                        if (r === 'success') {
                            this.isVisible = false;
                            this.getCompany();
                            this.modalService.success({
                                nzTitle: '供应商编辑成功',
                            });
                        }
                    }, err => this.err(err));
                }

            }
        } else if (value === 'person') {
            // tslint:disable-next-line: forin
            for (const i in this.surveyForm.controls) {
                this.surveyForm.controls[i].markAsDirty();
                this.surveyForm.controls[i].updateValueAndValidity();
            }
            const data = this.surveyForm.value;
            // this.phone = data.phone;
            if (data.phone && data.name && data.age && data.gender) {
                if (type === 'add') {
                    postlist = {
                        name: data.name,
                        phone: data.phone,
                        age: data.age,
                        gender: data.gender,
                        roleId: data.roleId,
                    };
                    this.httpService.putenterIn(postlist).subscribe((r: any) => {
                        this.isVisible = false;
                        this.modalService.success({
                            nzTitle: '添加员工成功',
                        });
                        this.getUsers();
                    }, err => this.err(err));
                } else {
                    postlist = {
                        type: 'USER',
                        id: this.id,
                        ids: this.surveyForm.get('roleId').value,
                    };
                    this.httpService.updateUserOrRole(postlist).subscribe((r: any) => {
                        this.isVisible = false;
                        this.getUsers();
                        this.modalService.success({
                            nzTitle: '编辑成功',
                        });
                    }, err => this.err(err));
                }

            }
        } else if (value === 'activity') {
            // tslint:disable-next-line: forin
            for (const i in this.surveyForm.controls) {
                this.surveyForm.controls[i].markAsDirty();
                this.surveyForm.controls[i].updateValueAndValidity();
            }
            const data = this.surveyForm.value;
            if (data.name && data.discount && data.endDate && data.startDate) {
                if (type === 'add') {
                    postlist = {
                        name: data.name,
                        discount: data.discount,
                        endDate: data.endDate,
                        startDate: data.startDate,
                    };
                    this.httpService.creatActivity(postlist).subscribe((r: any) => {
                        if (r === 'success') {
                            this.isVisible = false;
                            this.getActivityList();
                            this.modalService.success({
                                nzTitle: '添加活动成功',
                            });
                        }
                    }, err => this.err(err));
                } else {
                    postlist = {
                        id: this.id,
                        status: this.status,
                        name: this.surveyForm.get('name').value,
                        discount: this.surveyForm.get('discount').value,
                        endDate: this.surveyForm.get('endDate').value,
                        startDate: this.surveyForm.get('startDate').value,
                    };
                    console.log(postlist);
                    this.httpService.creatActivity(postlist).subscribe((r: any) => {
                        if (r === 'success') {
                            this.isVisible = false;
                            this.getActivityList();
                            this.modalService.success({
                                nzTitle: '编辑活动成功',
                            });
                        }
                    }, err => this.err(err));
                }

            }

        } else if (value === 'role') {
            // tslint:disable-next-line:forin
            for (const i in this.surveyForm.controls) {
                this.surveyForm.controls[i].markAsDirty();
                this.surveyForm.controls[i].updateValueAndValidity();
            }
            const data = this.surveyForm.value;
            if (data.roleName && data.permissionId) {
                if (type === 'add') {
                    postlist = {
                        roleName: data.roleName,
                        permissionId: data.permissionId,
                    };
                    console.log(postlist);
                    this.httpService.createRole(postlist).subscribe((r: any) => {
                        this.isVisible = false;
                        this.getRole();
                        this.modalService.success({
                            nzTitle: '添加角色成功',
                        });
                    }, err => this.err(err));
                }
            } else {
                postlist = {
                    type: 'ROLE',
                    id: this.id,
                    ids: this.surveyForm.get('permissionId').value,
                };
                this.httpService.updateUserOrRole(postlist).subscribe((r: any) => {
                    this.isVisible = false;
                    this.getRole();
                    this.modalService.success({
                        nzTitle: '编辑权限成功',
                    });
                }, err => this.err(err));
            }
        } else if (value === 'editPersonNote') {
            // tslint:disable-next-line:forin
            for (const i in this.surveyForm.controls) {
                this.surveyForm.controls[i].markAsDirty();
                this.surveyForm.controls[i].updateValueAndValidity();
            }
            const data = this.surveyForm.value;
            if (data.phone && data.name && data.age && data.gender) {
                postlist = {
                    phone: this.surveyForm.get('phone').value,
                    name: this.surveyForm.get('name').value,
                    age: this.surveyForm.get('age').value,
                    gender: this.surveyForm.get('gender').value,
                    id: this.id,
                };
                this.httpService.editUser(
                    postlist
                ).subscribe((r: any) => {
                    this.isVisible = false;
                    this.getUsers();
                    this.modalService.success({
                        nzTitle: '编辑成功',
                    });
                }, err => this.err(err));
            }
        }

    }
    handleCancel() {
        this.surveyForm.reset();
        setTimeout(() => {
            this.isVisible = false;

        });
    }
    // 树形选择
    onChange($event: string[]): void {
        console.log($event);
    }
    confirm() { }
    reset() { }
    editNote(data) {
        this.key = 'editPersonNote';
        this.judge = 1;
        this.isVisible = true;
        this.isadd = false;
        this.isrole = false;
        this.isdelete = false;
        this.id = data.id;
        this.surveyForm.get('name').setValue(data.name);
        this.surveyForm.get('phone').setValue(data.phone);
        this.surveyForm.get('age').setValue(data.age);
        this.surveyForm.get('gender').setValue(data.gender);
        // 编辑员工基本信息
        // this.httpService.deletecompany(
        //     {
        //         id: data.id,
        //     }
        // ).subscribe((r: any) => {
        //     if (r === 'success') {
        //         this.getUsers();
        //     }
        // }, err => this.err(err));
    }
    editPerson(index, data) {
        console.log(data);
        switch (index) {
            case 0:
                this.key = 'componey',
                    this.title = '编辑供应商资料';
                this.isVisible = true;
                this.isadd = false;
                this.id = data.id;
                this.surveyForm.get('companyName').setValue(data.companyName);
                this.surveyForm.get('phone').setValue(data.phone);
                this.surveyForm.get('address').setValue(data.address);
                console.log(21);
                break;
            case 1:
                this.key = 'person',
                    this.title = '编辑员工资料';
                this.getUserById(data.id);
                this.isVisible = true;
                this.isadd = false;
                this.isrole = true;
                this.isdelete = true;
                this.id = data.id;
                this.surveyForm.get('name').setValue(data.name);
                this.surveyForm.get('phone').setValue(data.phone);
                this.surveyForm.get('age').setValue(data.age);
                this.surveyForm.get('gender').setValue(data.gender);
                console.log(32);
                break;
            case 2:
                this.key = 'activity',
                    this.title = '编辑活动';
                this.isVisible = true;
                this.isadd = false;
                this.id = data.id;
                this.status = data.status;
                this.surveyForm.get('name').setValue(data.name);
                this.surveyForm.get('discount').setValue(data.discount);
                this.surveyForm.get('endDate').setValue(data.endDate);
                this.surveyForm.get('startDate').setValue(data.startDate);
                break;
            case 3:
                const perId = [];
                this.key = 'role',
                    this.title = '编辑权限';
                this.isVisible = true;
                this.isadd = false;
                this.id = data.id;
                for (const item of data.permissions) {
                    perId.push(item.id);
                }
                this.surveyForm.get('permissionId').setValue(perId);
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
    stopclick(data) {
        this.loading = true;
        this.httpService.stopActivity(data).subscribe((r: any) => {
            if (r === 'success') {
                this.getActivityList();
            }
        }, err => this.err(err));

    }
    deleteItem(data, index) {
        // this.loading = true;
        this.modalService.confirm({
            nzTitle: '确定删除',
            // nzContent: '<b style="color: red;">Some descriptions</b>',
            nzOkText: '是',
            nzOkType: 'danger',
            nzOnOk: () => {
                if (index === 0) {
                    this.httpService.deletecompany(
                        {
                            id: data.id,
                            companyName: data.companyName,
                            phone: data.phone,
                            address: data.address,
                        }
                    ).subscribe((r: any) => {
                        if (r === 'success') {
                            this.getCompany();
                            this.modalService.success({
                                nzTitle: '删除成功',
                            });
                        }
                    }, err => this.err(err));
                } else if (index === 1) {
                    this.httpService.deleteUser(
                        {
                            id: data.id,
                        }
                    ).subscribe((r: any) => {
                        if (r === 'success') {
                            this.getUsers();
                            this.modalService.success({
                                nzTitle: '删除成功',
                            });
                        }
                    }, err => this.err(err));
                } else if (index === 2) {
                    this.httpService.stopActivity(
                        {
                            status: 'delete',
                            id: data.id,
                        }
                    ).subscribe((r: any) => {
                        if (r === 'success') {
                            this.getActivityList();
                            this.modalService.success({
                                nzTitle: '删除成功',
                            });
                        }
                    }, err => this.err(err));
                } else if (index === 3) {
                    this.httpService.deleteRole(
                        data.id
                    ).subscribe((r: any) => {
                        this.getRole();
                        this.modalService.success({
                            nzTitle: '删除成功',
                        });
                    }, err => this.err(err));
                }
            },
            nzCancelText: '否',
            nzOnCancel: () => console.log('Cancel')
        });
    }
    setNew(index) {
        switch (index) {
            case 0:
                this.key = 'componey',
                    this.title = '新增供应商';
                this.isVisible = true;
                this.isadd = true;
                this.surveyForm.reset();
                console.log(2);
                break;
            case 1:
                this.key = 'person',
                    this.title = '新增员工';
                this.isVisible = true;
                this.isadd = true;
                this.isrole = false;
                this.isdelete = true;
                this.surveyForm.reset();
                console.log(3);
                break;
            case 2:
                this.key = 'activity',
                    this.title = '创建活动';
                this.isVisible = true;
                this.isadd = true;
                this.surveyForm.reset();
                console.log(3);
                break;
            case 3:
                this.key = 'role',
                    this.title = '创建角色';
                this.isVisible = true;
                this.isadd = true;
                this.surveyForm.reset();
                console.log(3);
                break;
            default:
                break;
        }
    }
    /// 角色相关的东西
    newRole(roleList) {
        this.httpService.createRole(roleList).subscribe((r: any) => {
            console.log(r);
        }, err => this.err(err));
    }

    permission() {
        this.httpService.getPermission().subscribe((r: any) => {
            this.selectPermissions = r;
        }, err => this.err(err));
    }
}
