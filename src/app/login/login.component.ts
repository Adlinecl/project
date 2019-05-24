import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSocketService } from '../use-socket.service';

export class IA {
    userName: string;
    password: string;
}
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [HttpService],
})
// tslint:disable-next-line:component-class-suffix

export class LoginComponent implements OnInit {
    validateForm: FormGroup;
    constructor(
        public httpService: HttpService,
        private modalService: NzModalService,
        private fb: FormBuilder,
        private router: Router,
        private usService: UserSocketService,
        private notification: NzNotificationService,
    ) { }
    // enterParams = {
    //   userName: '',
    //   password: '',
    // };
    result;
    a = false;
    // tslint:disable-next-line:member-ordering
    private delayTime = 9000;
    private preCTime = 0;
    private timeNow = new Date().getTime();

    ngOnInit() {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            // remember: [true]
        });
    }
    // getSleep(): void {
    //     const newDate = new Date().getTime();
    //     this.preCTime = this.timeNow;
    //     console.log((newDate - this.preCTime) > this.delayTime);
    //     console.log(newDate);
    //     console.log(this.preCTime); // 你可以写成获取当前时间戳
    //     if ((newDate - this.preCTime) > this.delayTime) {
    //         // return;
    //         this.a = true;
    //         this.listen = this.roleParams.roleName;
    //         this.timeNow = new Date().getTime();
    //     } else {
    //       this.getSleep();
    //     }
    //   }
    err = function catchError(err) {
        console.log('err', err);
        if (err) {
            this.modalService.info({
                nzTitle: err.error.message ? err.error.message : '请重新登录！',
            });
            this.router.navigate(['login']);
            return;
        }
    };
    submitForm(): void {
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        const data = this.validateForm.value;
        // console.log(data);
        // this.router.navigate(['page'], { queryParams: { userName: this.validateForm.value.name } });
        //
        if (this.validateForm.status === 'VALID') {
            // this.enter();
            // this.router.navigate(['page']);
            this.httpService.enterIn(data).subscribe((r: any) => {
                console.log(data, r);
                localStorage.setItem('token', JSON.stringify(r.token));
                // localStorage.setItem('userName', JSON.stringify(r.userName));
                localStorage.setItem('name', JSON.stringify(r.name));
                this.router.navigate(['page']);
            }, err => { this.err(err); });
        }
    }
    // enter() {
    //   this.httpService.enterIn(this.enterParams).subscribe((r: any) => {
    //     console.log(this.enterParams, r);
    //     localStorage.setItem('token', JSON.stringify(r.token));
    //       // this.router.navigate(['pages/plane-list'], { queryParams: { orderId: data } });
    //     this.permission();
    //   }, err => this.err(err));
    // }
}
