import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ClientService } from '../services/client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string | null = null;
  loggedUser! : any;
  apiUrl = environment.baseUrl;

  constructor(private router: Router, private apiClient: ClientService, private toatr:ToastrService) {}
  login(email:string, password:string): void {
    let allUser = [];
    this.apiClient.getAllClient().subscribe(
      data => {
        allUser = data;
        this.loggedUser = allUser.find(
          (          x: {email: string; motDePasse: string; }) => ((x.email === email)) && (x.motDePasse === password)
        );
        if (this.loggedUser !== undefined) {
          this.isLoggedIn = true;
        this.toatr.success("Connexion Reussi","Sucess")
      }
        // this.router.navigate(['/admin']);
      },
      err => {
        console.log(err)
        this.toatr.info("Aucun compte correspondant","info")
      }
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedUser = {};
    this.router.navigate(['/acceuil']);
  }
}
