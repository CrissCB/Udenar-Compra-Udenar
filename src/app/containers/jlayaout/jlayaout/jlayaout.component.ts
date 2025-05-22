import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEmprendimientoComponent } from '../../../components/emprendimiento/form-emprendimiento/form-emprendimiento.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-jlayaout',
  standalone: true,
  templateUrl: './jlayaout.component.html',
  styleUrls: ['./jlayaout.component.scss'],
  imports: [CommonModule, FormEmprendimientoComponent]


})

export class JlayaoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log('JlayaoutComponent initialized');
    // Initialization logic can go here
  }
  logoPath = 'assets/images/logo.png';
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
      subitems: ['Participar', 'Editar', 'Convocatorias']
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

  selectSubItem(subitem: string, section: string, event: Event) {
    event.preventDefault();
    this.selectedOption = `${section}-${subitem}`.toLowerCase();
  }

  selectedOption: string = '';

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
}