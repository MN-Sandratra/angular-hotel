import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/models/reservation';
import { ClientService } from 'src/app/services/client.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { RoomService } from 'src/app/services/room.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  @Input() room: any;
  currentReservation:Reservation=new Reservation();
  @ViewChild("resForm") form:NgForm | undefined;
  constructor(private apiReservation:ReservationService,private toastr:ToastrService,private apiClient:ClientService,private apiRoom:RoomService,public logcli:AuthService) { }

  ngOnInit(): void {
  }

  createImgPath = (image:any) => { 
    return environment.baseUrl+"/"+image;
  }
  validation(){
    let res=true;
    if(this.currentReservation.dateDebut<this.currentReservation.dateReservation || this.currentReservation.dateDebut>this.currentReservation.dateFin)
      res=false;
    return res;
  }
  reset(){
    this.form?.resetForm();
  }
  addReservation=()=>{
   if(!this.validation() || this.form?.invalid){
      this.toastr.error("Remplisser le champs correctement","Erreur")  
    }else{
    let reservationToAdd={
    "clientId": this.logcli.loggedUser.id,
    "roomId": this.room.id,
    "dateReservation":this.currentReservation.dateReservation,
    "dateDebut":this.currentReservation.dateDebut,
    "dateFin": this.currentReservation.dateFin,
    "nbrPerson": this.currentReservation.nbrPerson,
  }
    this.apiReservation.createReservation(reservationToAdd).subscribe(
      data=>{
        this.toastr.success(""+data,"Succes");
      },err=>{
        console.error(err);
      }
    )
  }
  }

}
