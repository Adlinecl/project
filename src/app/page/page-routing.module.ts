import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageComponent} from './page.component';
import { RepertoryComponent } from './repertory/repertory.component';
import { DetailinComponent } from './detailin/detailin.component';
import { RoleComponent } from './role/role.component';
import { SalesComponent } from './sales/sales.component';
import { BillComponent } from './bill/bill.component';

const pageRoute: Routes = [
  {
      path: '',
      component: PageComponent,
      children: [
        {
            path: 'repertory',
            component: RepertoryComponent,
        },
          {
            path: 'detailin',
            component: DetailinComponent,
          },
          {
            path: 'role',
            component: RoleComponent,
          },
          {
            path: 'sales',
            component: SalesComponent,
          },
          {
            path: 'bill',
            component: BillComponent,
          }
      ]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(pageRoute)],
    exports: [RouterModule],
})
export class PageRoutingModule {
}
