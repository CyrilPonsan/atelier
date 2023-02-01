import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from '../../services/regex.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  @Output() submitEvent = new EventEmitter<any>();

  constructor(private regex: RegexService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      valueToSearch: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexNumber)],
      ],
    });
  }

  submitHandler(): void {
    if (this.searchForm.valid) {
      this.submitEvent.emit(this.searchForm.value.valueToSearch);
    }
  }
}
