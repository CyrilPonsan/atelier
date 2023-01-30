import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CoreRoutingModule } from './core-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { SharedModule } from '../shared/shared.module';
import { TicketsModule } from '../tickets/tickets.module';
import { httpInterceptorProviders } from './interceptors';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [LoginPageComponent, HeaderComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    SharedModule,
    TicketsModule,
  ],
  exports: [HeaderComponent],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
