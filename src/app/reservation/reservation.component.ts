import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private apiReservation:ReservationService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  Reservations:Reservation[]=[];
  currentRservation!:Reservation;

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        processing:     "Traitement en cours...",
        search:         "Rechercher&nbsp;:",
        lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
        info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        infoPostFix:    "",
        loadingRecords: "Chargement en cours...",
        zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
        emptyTable:     "Aucune donnée disponible dans le tableau",
        paginate: {
            first:      "Premier",
            previous:   "Pr&eacute;c&eacute;dent",
            next:       "Suivant",
            last:       "Dernier"
        },
        aria: {
            sortAscending:  ": activer pour trier la colonne par ordre croissant",
            sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
    },
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.getAllReservation();
  }

  getAllReservation(): void{
    this.apiReservation.getAllReservation().subscribe(
      data=>{
        this.Reservations=data;
        this.dtTrigger.next();
      },error=>{
        console.log("Impossible to get people");
      }
    )
  }

  getReservationById(id:number){
    this.apiReservation.getReservationById(id).subscribe(
      data=>{
        this.currentRservation=data;
      },err=>{
        console.error("Une erreur s'est produite");
        
      }
    )
  }

}
