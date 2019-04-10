import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(public httpService: HttpService,
              private modalService: NzModalService,
              private fb: FormBuilder,
              private router: Router,
               ) { }
  // enterParams = {
  //   userName: '',
  //   password: '',
  // };
  result;
  roleParams = {
    roleName: '',
    permissionId: '',
  };
  selectPermissions = [];
  listen = '';
  a = false;
  isShowRole = false;
  isVisible = false;
  isOkLoading = false;
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
  getSleep(): void {
      const newDate = new Date().getTime();
      this.preCTime = this.timeNow;
      console.log((newDate - this.preCTime) > this.delayTime);
      console.log(newDate);
      console.log(this.preCTime); // 你可以写成获取当前时间戳
      if ((newDate - this.preCTime) > this.delayTime) {
          // return;
          this.a = true;
          this.listen = this.roleParams.roleName;
          this.timeNow = new Date().getTime();
      } else {
        this.getSleep();
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
    console.log(data);
    this.router.navigate(['page'], { queryParams: { userName: this.validateForm.value.name } });
    // this.isShowRole = true;
    if (this.validateForm.status === 'VALID') {
      // this.enter();
      this.httpService.enterIn(data).subscribe((r: any) => {
        console.log(data, r);
        localStorage.setItem('token', JSON.stringify(r.token));
          // this.router.navigate(['page']);
        this.permission();
        this.isShowRole = true;
      }, err => {this.err(err); });
    }
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.isShowRole = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isShowRole = false;

  }
  // enter() {
  //   this.httpService.enterIn(this.enterParams).subscribe((r: any) => {
  //     console.log(this.enterParams, r);
  //     localStorage.setItem('token', JSON.stringify(r.token));
  //       // this.router.navigate(['pages/plane-list'], { queryParams: { orderId: data } });
  //     this.permission();
  //   }, err => this.err(err));
  // }
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
  serchRoleName() {
      // const params = this.roleParams.roleName;
      this.httpService.getRole(this.listen).subscribe((r: any) => {
      }, err => this.err(err));
  }
}
