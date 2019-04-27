import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { DetailinComponent } from './detailin/detailin.component';
// import { PageRoutingModule } from './page-routing.module';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less'],
  providers: [HttpService],
})
export class PageComponent implements OnInit {
  userName = '';
  isshow = false;
  isrole = false;
  roleParams = {
    roleName: '',
    permissionId: '',
};
selectPermissions = [];
  constructor(private router: Router,
              public httpService: HttpService,
              private route: ActivatedRoute,
            ) { }

  ngOnInit() {
    this.getUserName();
  // console.log('========route', PageRoutingModule);
    // this.route.queryParams.subscribe((params) => this.userName = params.userName);
  }
  getUserName() {
    this.userName = localStorage.getItem('userName');
    if (this.userName) {
        this.userName = JSON.parse(this.userName);
        console.log('userName', this.userName);
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
  loginOut() {
    this.router.navigate(['login']);
    this.httpService.logout({userName: this.userName}).subscribe((r: any) => {
      console.log(r);
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }, err => this.err(err) );
  }
  waring() {
    this.isshow = true;
  }
  addRole() {
    this.isrole = true;
  }
  newwaring() {}
  // 角色相关的东西
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
