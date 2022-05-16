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
        path: '/supplier',
        title: 'Fournisseur',
      },
      {
        path: '/article',
        title: 'Article',
      },
      {
        path: '/articleCat',
        title: 'Catégorie article',
      },
     
      
      {
        path: '/orderLine',
        title: 'Ligne de commande',
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
        //boucle @donné sousMenu ato anatin'ity izy rehefa eo @sous menu
        path: '/client',
        title: 'Client',
      },
      {
        path: '/room',
        title: 'Chambre',
      },
      {
        path: '/category',
        title: 'Categorie',
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
        path: '',
        title: 'Comptable sous menu 1',
      },
      {
        path: '',
        title: 'Comptable sous menu 2',
      },
      {
        path: '',
        title: 'Comptable sous menu 3',
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
  menuItems: any[];
  constructor() {
    this.menuItems = [];
  }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
