import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { AdditionalPageComponent } from './pages/additional-page/additional-page.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', component: IndexPageComponent},
    {path: 'additional/:alias_id', component: AdditionalPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
