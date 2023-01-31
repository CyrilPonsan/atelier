import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() max = new EventEmitter<number>();
  @Input() label!: string;

  constructor(public pagination: PaginationService) {}

  onClickPrevious() {
    this.previous.emit();
  }

  onClickNext() {
    this.next.emit();
  }

  onSetMax(value: any) {
    this.max.emit(+value.target.value);
  }
}
