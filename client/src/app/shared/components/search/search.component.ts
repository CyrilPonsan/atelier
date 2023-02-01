import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounce, debounceTime, map, Subject } from 'rxjs';
import { RegexService } from '../../services/regex.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  searchTerm$ = new Subject<string>();
  @Output() submitEvent = new EventEmitter<any>();

  constructor(private regex: RegexService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    /*
    this.searchForm = this.formBuilder.group({
      valueToSearch: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexNumber)],
      ],
    }); */
    this.searchTerm$
      .pipe(
        debounceTime(1000),
        map((term: string) => this.submitSearch(term))
      )
      .subscribe();
  }

  searchHandler(term: string): void {
    this.searchTerm$.next(term);
  }

  submitSearch(term: string): void {
    this.submitEvent.emit(term);
  }
}
