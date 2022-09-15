import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      objet: [null],
      destinataireOrProvenance: [null, [Validators.required, Validators.minLength(3)]],
      motCle: [null, [Validators.required, Validators.minLength(10)]],
      dateDebut: [null, [Validators.required]],
      typeEvent: [null, [Validators.required]],
      dateFin: [null, [Validators.required]],
      montantMin: [null],
      montantMax: [null],
    });
  }

  search(form: any) {
    console.log(form);
  }

}
