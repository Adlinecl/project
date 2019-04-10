import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {PageComponent} from './page.component';
import { RepertoryComponent } from './repertory/repertory.component';
import { PageRoutingModule } from './page-routing.module';
import { HttpService } from '../http.service';
import { IconModule } from '@ant-design/icons-angular';
import { RouterModule } from '@angular/router';
import { DetailinComponent } from './detailin/detailin.component';
import { RoleComponent } from './role/role.component';
import { SalesComponent } from './sales/sales.component';
import { BillComponent } from './bill/bill.component';

@NgModule({
    declarations: [PageComponent, RepertoryComponent, DetailinComponent, RoleComponent, SalesComponent, BillComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        PageRoutingModule,
        NgZorroAntdModule,
        IconModule,
        // NgZorroAntdModule,
    ],
    providers: [
        HttpService
        // 放service的地方 这样页面就不需要引入provider了
    ],
    entryComponents: [PageComponent, RepertoryComponent, DetailinComponent],
})
export class PageModule {
}
