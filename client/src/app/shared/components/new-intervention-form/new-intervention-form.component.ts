import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from '../../services/regex.service';

@Component({
  selector: 'app-new-intervention-form',
  templateUrl: './new-intervention-form.component.html',
  styleUrls: ['./new-intervention-form.component.scss'],
})
export class NewInterventionFormComponent implements OnInit {
  interventionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private regex: RegexService) {}

  ngOnInit(): void {
    this.interventionForm = this.formBuilder.group({
      description: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      reponse: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
    });
  }
}
