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
  constructor(private router: Router,
              public httpService: HttpService,
              private route: ActivatedRoute,
            ) { }

  ngOnInit() {
  // console.log('========route', PageRoutingModule);
    this.route.queryParams.subscribe((params) => this.userName = params.userName);
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
    this.httpService.logout({userName: this.userName}).subscribe((r: any) => {
      console.log(r);
      this.router.navigate(['login']);
    }, err => this.err(err) );
  }
}
