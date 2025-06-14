
import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';
import { SharedDataService } from '../../../app-core/servicios/shared-data.service';
import { Subject } from 'rxjs';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-menu-lider',
   imports: [CommonModule],
  templateUrl: './menu-lider.component.html',
  styleUrl: './menu-lider.component.scss'
})
export class MenuLiderComponent {

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

  ngOnInit() {
    this.obtenerUsuario();
    this.currentRole = this.role || 'sin-rol';
    this.currentname = this.username || 'invitado';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isCollapsed = false;

  menu = [
    {
      title: 'FERIAS',
      open: false,
      subitems: ['Registrar', 'Editar', 'Convocar']
    },
    {
      title: 'EMPRENDEDORES',
      open: false,
      subitems: ['solicitudes']
    },
    {
      title: 'PUBLICACIONES',
      open: false,
      subitems: ['ver']
    },
    {
      title: 'MANUAL',
      open: false,
      subitems: []
    }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSection(item: any) {
    item.open = !item.open;
  }

  // selectSubItem(subitem: string, section: string, event: Event) {
  //   event.preventDefault();
  //   this.selectedOption = `${section}-${subitem}`.toLowerCase();
  // }

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

  cerrarSesion() {
    const idToken = this.authService.getIdToken();

    if (!idToken) {
      console.error('No se encontró id_token válido');
      return;
    }

    // Verifica que sea un id_token (contiene "typ":"ID" en el payload)
    const tokenPayload = JSON.parse(atob(idToken.split('.')[1]));
    if (tokenPayload.typ !== 'ID') {
      console.error('Token no es un id_token válido:', tokenPayload);
      return;
    }

    sessionStorage.clear();

    const logoutUrl = new URL(
      `http://localhost:8081/realms/laravel-realm/protocol/openid-connect/logout`
    );

    logoutUrl.searchParams.append('client_id', 'laravel-api');
    logoutUrl.searchParams.append('post_logout_redirect_uri', 'http://localhost:4200');
    logoutUrl.searchParams.append('id_token_hint', idToken);

    console.log('URL de logout:', logoutUrl.toString());
    window.location.href = logoutUrl.toString();
  }

  obtenerUsuario() {
    this.SharedDataService.usuario$.subscribe(usuario => this.usuario = usuario);
    this.SharedDataService.idUser$.subscribe(id => this.idUser = id ?? '');
    this.SharedDataService.username$.subscribe(name => this.username = name ?? '');
    this.SharedDataService.role$.subscribe(role => this.role = role ?? '');
    this.SharedDataService.roles$.subscribe(roles => this.roles = roles);
  }

}
