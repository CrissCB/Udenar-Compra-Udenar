import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth.service';
import { SharedDataService } from '../../app-core/servicios/shared-data.service';
import { UsuarioService } from '../../app-core/servicios/usuarios-api.service';


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
    private usuariosservice: UsuarioService,
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
    this.usuariosservice.obtenerUsuarioKey().subscribe(data => {
      const token = this.AuthService.getToken();

      if (token) {
        const decodedToken: any = jwtDecode(token);
        const sub = decodedToken.sub;

        const usuarioLogueado = data.find((user: any) => user.id === sub);

        if (usuarioLogueado) {
          this.userStateService.setUsuario(usuarioLogueado);
          this.usuario = usuarioLogueado;

          this.usuariosservice.obtenerUsuarioKeyPorId(sub).subscribe(data => {
            this.userStateService.setIdUser(data.identificacion);
            this.userStateService.setUsername(data.username);
            this.userStateService.setRole(data.rol);

            this.idUser = data.identificacion;
            this.username = data.username;
            this.role = data.rol;

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
              this.buscarUsuario(data);
            } else {
              this.idUser = '0';
              console.error('No se encontró el usuario logueado en la lista de usuarios');
            }
          });
        } else {
          console.error('No se encontró el usuario logueado en la lista de usuarios');
        }
      }
    });
  }

  buscarUsuario(data: any) {
    this.usuariosservice.showUsuarios(data.identificacion).subscribe(
      response => {
        console.log('Usuario encontrado:', response);
      }, 
      error => {
        if (error.status === 404) {
          console.error('Usuario no encontrado, creando nuevo usuario...');
          this.crearUsuario(data);
        } else {
          console.error('Error al buscar el usuario:', error);
        }
      });
  }

  crearUsuario(data: any) {
    const dataUser = {
      nombre: data.first_name,
      apellido: data.last_name,
      identificacion: data.identificacion,
      estado: 'AC',
      email: data.email
    };

    this.usuariosservice.storeUsuarios(dataUser).subscribe(
      response => {
        console.log('Usuario creado exitosamente:', response);
      },
      error => {
        console.error('Error al crear el usuario:', error);
      }
    );
  }
}