import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
// import { NgZorroAntdModule } from 'ng-zorro-antd';
import {LoginComponent} from './login.component';
import { HttpService } from '../http.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconModule } from '@ant-design/icons-angular';
// import { SwitchConfigComponent } from './switch-config/switch-config.component';
// import { SwitchConfigModule } from './switch-config/switch-config.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        IconModule,
        // NgZorroAntdModule,
        // SwitchConfigModule,
    ],
    providers: [
        HttpService,
        // 放service的地方 这样页面就不需要引入provider了
    ]
    // entryComponents: [SwitchConfigComponent],
})
export class LoginModule {
}
