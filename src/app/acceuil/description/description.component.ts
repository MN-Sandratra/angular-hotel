import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() inverse:boolean =false;
  @Input() descri:any | undefined;


  constructor() { }

  ngOnInit(): void {
  }

}
