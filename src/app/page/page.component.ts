import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { NzModalRef, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { DetailinComponent } from './detailin/detailin.component';
import { UserSocketService } from '../use-socket.service';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// import { PageRoutingModule } from './page-routing.module';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.less'],
    providers: [HttpService, UserSocketService],
})
export class PageComponent implements OnInit {
    token = '';
    // isshow = false;
    isrole = false;
    staffId = '';
    roleParams = {
        roleName: '',
        permissionId: '',
    };
    isshow = false;
    isword = false;
    isVisible = false;
    selectPermissions = [];
    isConfirmLoading = false;
    validateForm: FormGroup;
    ordPws;
    newPws;
    pws;
    name;
    isJudgepemission = true;
    isbutton = true;
    userPermission = [];
    userRole = [];
    userList = [];
    constructor(
        private router: Router,
        public httpService: HttpService,
        private modalService: NzModalService,
        private route: ActivatedRoute,
        private usService: UserSocketService,
        private notification: NzNotificationService,
        private fb: FormBuilder,
    ) {
        this.usService.messages.subscribe(msg => {
            this.notification.blank(
                '通知',
                msg,
                { nzDuration: 4000 },
            );
            // console.log('Response from websocket: ' + msg, msg.data);

        });
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            ordPws: ['', [Validators.required]],
            newPws: ['', [Validators.required]],
            pws: ['', [this.confirmValidator]],
        });
        this.getUserName();
        // console.log('========route', PageRoutingModule);
        // this.route.queryParams.subscribe((params) => this.userName = params.userName);
    }
    getUserName() {
        this.name = localStorage.getItem('name');
        if (this.name) {
            this.name = JSON.parse(this.name);
            console.log('name', this.name);
        }
        this.token = localStorage.getItem('token');
        if (this.token) {
            this.token = JSON.parse(this.token);
            console.log('token', this.token);
        }
        this.staffId = localStorage.getItem('staffId');
        if (this.staffId) {
            this.staffId = JSON.parse(this.staffId);
            if (this.name === 'admin') {
                this.isJudgepemission = false;
                // this.isbutton = true;
                return;
            } else {
                this.isJudgepemission = true;
                console.log('staffId', this.staffId);
                // this.getUserById(this.staffId);
            }
        }
    }
    err = function catchError(err) {
        console.log('err', err);
        if (err) {
            this.modalService.error({
                nzTitle: err.error.message ? err.error.message : '请重新登录！',
            });
            // this.router.navigate(['login']);
            return;
        }
    };
    using() {
        this.isshow = !this.isshow;
        this.isword = false;
    }
    changePassword() {
        // this.isword = true;
        this.isVisible = true;
        this.isshow = false;
        // this.isshow = false;
    }
    confirm() {
        this.httpService.updatePws(
            {
                ordPws: this.ordPws,
                newPws: this.newPws,
                pws: this.pws,
            }
        ).subscribe((r: any) => {
            console.log(r);
            if (r === 'success') {
                this.isword = false;
                this.isshow = false;
                this.modalService.error({
                    nzTitle: 'success',
                });
            }
        }, err => this.err(err));
    }
    cancel() {
        this.isword = false;
        this.isshow = false;
    }
    loginOut() {
        this.router.navigate(['login']);
        this.httpService.logout({}).subscribe((r: any) => {
            console.log(r);
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('staffId');
            this.router.navigate(['login']);
        }, err => this.err(err));
    }
    waring() {
        this.isshow = true;
    }
    addRole() {
        this.isrole = true;
    }
    newwaring() { }
    submitForm($event: any, value: any) {
        console.log(value);
        $event.preventDefault();
        // tslint:disable-next-line: forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        const data = this.validateForm.value;
        if (this.validateForm.status === 'VALID') {
            this.httpService.updatePws(
                data
            ).subscribe((r: any) => {
                console.log(r);
                if (r === 'success') {
                    this.isVisible = false;
                    // this.isword = false;
                    // this.isshow = false;
                    this.modalService.success({
                        nzTitle: 'success',
                    });
                    this.validateForm.reset();
                }
            }, err => this.err(err));
        }
        // this.isVisible = true;
    }
    validateConfirmPassword(): void {
        setTimeout(() => this.validateForm.controls.pws.updateValueAndValidity());
    }
    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls.newPws.value) {
            return { newPws: true, error: true };
        }
        return {};
    }
    resetForm(e: MouseEvent): void {
        this.isVisible = false;
        e.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
            this.validateForm.controls[key].updateValueAndValidity();
        }
    }
    handleCancel(e: MouseEvent) {
        this.validateForm.reset();
        this.isVisible = false;
    }
}
