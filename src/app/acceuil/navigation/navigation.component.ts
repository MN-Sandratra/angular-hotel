import { Component, HostListener, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent implements OnInit {
  falist=faList;
  constructor() { }

  ngOnInit(): void {
  }
  @HostListener('window:scroll',['$event'])
  onwindowScroll(){
    let element=document.querySelector('.navbar') as HTMLElement;
    if(window.pageYOffset>element.clientHeight){
      element.classList.add('nav-black')
    }else{
      element.classList.remove('nav-black')
    }
  }

}
