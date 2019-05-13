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
            ordPws: [null, [Validators.required]],
            newPws: [null, [Validators.required]],
            pws: [null, [this.confirmValidator]],
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
    }
    err = function catchError(err) {
        console.log('err', err);
        if (err) {
            // this.enterParams = {
            //   userName: '',
            //   password: '',
            // };
            this.modalService.error({
                nzTitle: err.error.message ? err.error.message : '请重新登录！',
            });
            this.router.navigate(['login']);
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
            // localStorage.removeItem('userName');
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
    submitForm() {
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
                    this.modalService.error({
                        nzTitle: 'success',
                    });
                }
            }, err => this.err(err));
        }
        // this.isVisible = true;
    }
    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
          return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
          return { confirm: true, error: true };
        }
        return {};
    }
    handleCancel() {
        this.isVisible = false;
        this.validateForm.reset();
    }
}
