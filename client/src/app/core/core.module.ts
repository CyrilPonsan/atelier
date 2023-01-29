import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CoreRoutingModule } from './core-routing.module';
import { HomeModule } from '../home/home.module';
import { HttpClientModule } from '@angular/common/http';
//import { httpInterceptorProviders } from './interceptors';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    HomeModule,
    SharedModule,
  ],
  providers: [
    //  httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
