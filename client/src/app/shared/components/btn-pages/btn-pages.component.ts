import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-pages',
  templateUrl: './btn-pages.component.html',
})
export class BtnPagesComponent implements OnInit {
  @Input() label!: string; //  label du bouton

  constructor() {}

  ngOnInit(): void {}
}
