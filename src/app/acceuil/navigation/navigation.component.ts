import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { Client } from 'src/app/models/client';
import { Person } from 'src/app/models/person';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  falist=faList;
  currentClient:Client=new Client();
  motdepasse!:String ;

  Mail="";
  password="";
  @ViewChild("clientForm") form:NgForm | undefined;
  @ViewChild("loginForm") lform:NgForm | undefined;
  innerWidth:any;
  constructor(private apiClient:ClientService,private toastr:ToastrService,public clientLog:AuthService) { }

  ngOnInit(): void {
    this.currentClient.person=new Person();
    this.innerWidth=window.innerWidth;
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

  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.innerWidth=window.innerWidth
    let element=document.querySelector('.navbar') as HTMLElement;
    if(this.innerWidth>=999){
      element.classList.remove('nav-black')
    }else{
      element.classList.add('nav-black')
    }
  }
  validation(){
    let res=true;
    if(this.form?.invalid)
      res=false
    console.log(this.currentClient);
    return res;
  }

  reset(){
    this.lform?.resetForm();
  }
  addClient=()=>{
    if(this.validation()){
      this.apiClient.createClient(this.currentClient).subscribe(
        data=>{
          this.toastr.success("Inscription reussit","Succes");
        },err=>{
          console.error(err);
        }
      )
    }else{
      this.toastr.error("Remplissez les champs correctement","Attention")
    }
  }
 login(){
   if(this.lform?.invalid){
     this.toastr.error("Remplissez les champs correctement","Erreur")
   }else{
   this.clientLog.login(this.Mail,this.password);
   if(this.clientLog.isLoggedIn)
    this.toastr.success("Connexion reussit","Success");
  }
 }

}
