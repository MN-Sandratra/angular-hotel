import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-showpic',
  templateUrl: './showpic.component.html',
  styleUrls: ['./showpic.component.scss']
})
export class ShowpicComponent implements OnInit {

  @Input() images!:String;
  constructor() { }

  public createImgPath = () => { 
    return environment.baseUrl+"/"+this.images;
  }
  ngOnInit(): void {
  }

}
