import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { EmprendimientoService } from '../../app-core/servicios/emprendimiento.service';
import { jwtDecode } from 'jwt-decode';
import { SharedDataService } from '../../app-core/servicios/shared-data.service';


@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})

export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private AuthService: AuthService,
    private router: Router,
    private emprendimientoService: EmprendimientoService,
    private userStateService: SharedDataService
  ) { }

  usuario: any[] = [];
  identificacion: any[] = [];
  ids: any[] = [];
  idUser: string = '';
  username: string = '';
  role: string = '';
  roles: string[] = [];

  ngOnInit(): void {

    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      this.http.post('http://localhost:8000/api/token-exchange', { code }).subscribe({
        next: (response: any) => {
          const token = response.access_token;
          const idToken = response.id_token;

          // Almacena los tokens de forma síncrona
          this.AuthService.setToken(token);
          this.AuthService.setIdToken(idToken);
          this.obtenerUsuario();
          // console.log('Token received:', token);
          // console.log('IdToken received:', idToken);



          this.router.navigate(['/dashboard']);

        },
        error: err => {
          console.error('Error during token exchange:', err);
          this.router.navigate(['/error']);
        }
      });
    }
  }

  obtenerUsuario() {
    this.emprendimientoService.obtenerUsuarioKey().subscribe(data => {
      this.userStateService.setUsuario(data);
      this.usuario = data;

      const token = this.AuthService.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const sub = decodedToken.sub;
        this.emprendimientoService.obtenerUsuarioKeyPorId(sub).subscribe(data => {
          this.userStateService.setIdUser(data.identificacion);
          this.userStateService.setUsername(data.username);
          this.userStateService.setRole(data.role);

          this.idUser = data.identificacion;
          this.username = data.username;
          this.role = data.role;

          if (decodedToken.realm_access?.roles) {
            const technicalRoles = ['offline_access', 'uma_authorization', 'default-roles-laravel-realm'];
            const filteredRoles = decodedToken.realm_access.roles.filter((role: string) =>
              !technicalRoles.includes(role)
            );
            this.userStateService.setRoles(filteredRoles);
            this.role = filteredRoles[0] || 'sin-rol';
            this.userStateService.setRole(this.role);
          }

          if (this.idUser !== null) {
            // Datos válidos
          } else {
            this.idUser = '0';
            console.error('No se encontró el usuario logueado en la lista de usuarios');
          }
        });
      }
    });
  }
}
