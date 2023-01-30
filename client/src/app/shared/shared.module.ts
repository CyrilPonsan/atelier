import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputIsValidDirective } from './directives/input-is-valid.directive';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [InputIsValidDirective, ModalComponent, ButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    InputIsValidDirective,
    ModalComponent,
    ButtonComponent,
  ],
})
export class SharedModule {}
