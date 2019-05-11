import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { UserSocketService } from './use-socket.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [UserSocketService],
})
export class AppComponent {
  title = 'project';
  constructor(private usService: UserSocketService,
              private notification: NzNotificationService,
    ) { }
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
      // this.usService.messages.subscribe(msg => {
      // this.notification.blank(
      // 'Title',
      // msg,
      // { nzDuration: 4000 },
      // );
      // console.log('Response from websocket: ' + msg, msg.data);
      // });
    }
}
