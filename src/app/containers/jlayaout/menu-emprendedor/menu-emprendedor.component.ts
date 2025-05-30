
import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';
import { SharedDataService } from '../../../app-core/servicios/shared-data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu-emprendedor',
  templateUrl: './menu-emprendedor.component.html',
  styleUrl: './menu-emprendedor.component.scss',
  imports: [CommonModule,  ]

})

export class MenuEmprendedorComponent {

  @Output() optionSelected = new EventEmitter<string>();
  selectedOption = '';
  userData: any;
  currentRole: string = '';
  currentname: string = '';
  usuario: any[] = [];
  identificacion: any[] = [];
  ids: any[] = [];
  idUser: string = '';
  username: string = '';
  role: string = '';
  roles: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private SharedDataService: SharedDataService
  ) { }

  private destroy$ = new Subject<void>();
  
  isCollapsed = false;

  menu = [
    {
      title: 'EMPRENDIMIENTO',
      open: false,
      subitems: ['Registrar', 'Editar', 'Publicar']
    },
    {
      title: 'PRODUCTO',
      open: false,
      subitems: ['Registrar', 'Editar', 'Publicar']
    },
    {
      title: 'FERIAS',
      open: false,
      subitems: ['Participar']
    },

  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSection(item: any) {
    item.open = !item.open;
  }

  selectSubItem(sub: string, title: string, event: Event) {
    event.preventDefault();
    const key = `${title.toLowerCase()}-${sub.toLowerCase()}`;
    this.selectedOption = key;
    this.optionSelected.emit(key);  // Emitimos la opción seleccionada
  }

  getIcon(option: string): string {
    switch (option.toLowerCase()) {
      case 'registrar':
        return 'fas fa-plus-circle';
      case 'editar':
        return 'fas fa-edit';
      case 'publicar':
        return 'fas fa-upload';
      case 'participar':
        return 'fas fa-users';
      case 'convocatorias':
        return 'fas fa-bullhorn';
      default:
        return 'fas fa-circle';
    }
  }
}
