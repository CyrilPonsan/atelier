import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modal!: any;
  @Output() modalLeftClick = new EventEmitter<void>();
  @Output() modalRightClick = new EventEmitter<void>();
  leftLabel!: string;
  rightLabel!: string;

  ngOnInit(): void {
    if (this.modal.leftButton) {
      this.leftLabel = this.modal.leftBtn;
    }
    this.rightLabel = this.modal.rightBtn;
  }

  leftBtnHandler(): void {
    this.modalLeftClick.emit();
  }

  rightBtnHandler(): void {
    this.modalRightClick.emit();
  }
}
