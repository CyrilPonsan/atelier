import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputIsValidDirective } from './directives/input-is-valid.directive';

@NgModule({
  declarations: [InputIsValidDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, InputIsValidDirective],
})
export class SharedModule {}
