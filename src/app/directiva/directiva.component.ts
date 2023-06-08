import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent implements OnInit {
  listaCurso: string[]= ['ts', 'jv', 'spring', 'ag']

  habilitar: boolean = true;

  constructor() { }

  ngOnInit(): void {

  }



}
