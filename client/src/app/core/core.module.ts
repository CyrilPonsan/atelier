import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CoreRoutingModule } from './core-routing.module';
import { HomeModule } from '../home/home.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, CoreRoutingModule, HttpClientModule, HomeModule],
})
export class CoreModule {}
