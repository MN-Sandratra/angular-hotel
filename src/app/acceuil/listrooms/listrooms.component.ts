import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-listrooms',
  templateUrl: './listrooms.component.html',
  styleUrls: ['./listrooms.component.scss']
})
export class ListroomsComponent implements OnInit {

  rooms:any[]=[];
  showRooms:any[]=[];
  currentId:any;
  constructor(private roomApi:RoomService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllRoom();
    this.initData();
  }
  getCurrentId=()=>{
    return Promise.resolve(
      this.showSelectedId()
    )
  }

  showSelectedId(){
      this.currentId=this.route.snapshot.paramMap.get('id');
      console.log(this.currentId);
  }

  getUsableRoom=()=>{
    return Promise.resolve(this.getAllRoom())
  }

  initData=async()=>{
    try {
      await this.getCurrentId();
      await this.getUsableRoom();
    } catch (error) {
      console.log(error);
    }
  }
  getAllRoom(){
    this.roomApi.getAllRoom().subscribe(
      data=>{
        this.rooms=data;
        this.showRooms=this.rooms.filter(x=>x.categoryId==this.currentId)
        console.log(this.showRooms);
      },err=>{
        console.log(err);
      }
    )
  }

}
