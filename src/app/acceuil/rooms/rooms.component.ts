import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  @Input() room: any;
  constructor() { }

  ngOnInit(): void {
  }
  
  createImgPath = (image:any) => { 
    return environment.baseUrl+"/"+image;
  }

}
