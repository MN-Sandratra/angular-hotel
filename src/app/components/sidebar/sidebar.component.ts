import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  Id_Menu: string;
  title: string;
  icon: string;
  sousMenu: any;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    Id_Menu: 'stock',
    title: 'Gestion de stock',
    icon: 'icon-components',
    sousMenu: [
      {
        //boucle @donné sousMenu ato anatin'ity izy rehefa eo @sous menu
        path: '',
        title: 'Stock sous menu 1',
      },
      {
        path: '',
        title: 'Stock sous menu 2',
      },
      {
        path: '',
        title: 'Stock sous menu 3',
      },
      {
        path: '',
        title: 'Stock sous menu 4',
      },
      {
        path: '',
        title: 'Stock sous menu 5',
      },
    ],
    class: '',
  },
  {
    Id_Menu: 'logistique',
    title: 'Logistique',
    icon: 'icon-paper',
    sousMenu: [
      {
        path: '/admin/category',
        title: 'Categorie',
      },
      {
        path: '/admin/room',
        title: 'Chambre',
      },
      {
        //boucle @donné sousMenu ato anatin'ity izy rehefa eo @sous menu
        path: '/admin/client',
        title: 'Client',
      },
      {
        path: '/admin/reservation',
        title: 'Reservation',
      },
    ],
    class: '',
  },
  {
    Id_Menu: 'rh',
    title: 'RH',
    icon: 'icon-badge',
    sousMenu: [
      {
        //boucle @donné sousMenu ato anatin'ity izy rehefa eo @sous menu
        path: '',
        title: 'RH sous menu 1',
      },
      {
        path: '',
        title: 'RH sous menu 2',
      },
      {
        path: '',
        title: 'RH sous menu 3',
      },
    ],
    class: '',
  },
  {
    Id_Menu: 'comptable',
    title: 'Comptable',
    icon: 'icon-money-coins',
    sousMenu: [
      {
        //boucle @donné sousMenu ato anatin'ity izy rehefa eo @sous menu
        path: '/admin/compte',
        title: 'Compte',
      },
      {
        path: '/admin/mouvement',
        title: 'Mouvement',
      },
    ],
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems!: any[];
  constructor() {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
