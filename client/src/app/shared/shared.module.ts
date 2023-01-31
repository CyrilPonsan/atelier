import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputIsValidDirective } from './directives/input-is-valid.directive';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { RegexService } from './services/regex.service';
import { PaginationService } from './services/pagination.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BtnPagesComponent } from './components/btn-pages/btn-pages.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    InputIsValidDirective,
    ModalComponent,
    ButtonComponent,
    PaginationComponent,
    BtnPagesComponent,
    SearchComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    InputIsValidDirective,
    ModalComponent,
    ButtonComponent,
    PaginationComponent,
    BtnPagesComponent,
    SearchComponent,
  ],
  providers: [RegexService, PaginationService],
})
export class SharedModule {}
