import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmprendimientoService } from '../../../app-core/servicios/emprendimiento.service';
import { Categoria } from '../../../app-core/interfaces/categoria-emprendimiento';
import { AuthService } from '../../../auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { SharedDataService } from '../../../app-core/servicios/shared-data.service';
@Component({
  selector: 'app-form-emprendimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-emprendimiento.component.html',
  styleUrls: ['./form-emprendimiento.component.scss']
})

export class FormEmprendimientoComponent implements OnInit {
  emprendimientoForm!: FormGroup;
  categorias: Categoria[] = [];
  modoEdicion = false;
  idEmprendimiento: string = '';
  selectedOption: string = '';
  usuario: any[] = [];
  identificacion: any[] = [];
  ids: any[] = [];
  idUser: string = '';
  username: string = '';
  role: string = '';
  roles: string[] = [];



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SharedDataService: SharedDataService,

    private emprendimientoService: EmprendimientoService,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.emprendimientoForm = this.fb.group({
      nombre: [''],
      marca: [''],
      id_cat: [''],
      id_usuario: [{ value: this.idUser, disabled: true }],
      descripcion: ['']
    });

    this.obtenerUsuario();
    this.obternerCategoriaEmprendimiento();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.modoEdicion = true;
        // this.idEmprendimiento = +params['id'];
        this.cargarDatos(this.idEmprendimiento);
      }
    });
  }

  limpiarCampos(): void {
    this.emprendimientoForm.reset({
      nombre: '',
      marca: '',
      categoria: '',
      idUsuario: '',
      fechaInscripcion: new Date().toISOString().substring(0, 10),
      descripcion: ''
    });
  }

  cargarDatos(nombre: string) {
    this.emprendimientoService.obtenerPorNombre(nombre).subscribe(data => {
      this.emprendimientoForm.patchValue(data);
    });
  }

  registrar(): void {
    if (this.emprendimientoForm.valid) {
      const datos = {
        ...this.emprendimientoForm.getRawValue()
      };
      console.log('Datos a enviar:', datos);
      // Aquí podrías enviarlos a un servicio
    }
  }

  cancelar(): void {
    console.log('Registro cancelado');
  }

  obternerCategoriaEmprendimiento() {
    this.emprendimientoService.obtenerCategoriaEmprendimiento().subscribe(data => {
      this.categorias = data;
      console.log('Categorías obtenidas:', this.categorias);
    });
  }

  // obtenerUsuario() {
  //   this.emprendimientoService.obtenerUsuarioKey().subscribe(data => {
  //     this.usuario = data;

  //     const token = this.AuthService.getToken();
  //     if (token) {
  //       const decodedToken: any = jwtDecode(token);
  //       const sub = decodedToken.sub;
  //       this.emprendimientoService.obtenerUsuarioKeyPorId(sub).subscribe(data => {
  //         this.idUser = data.identificacion;
  //         this.username = data.username;
  //         this.role = data.role;

  //         if (decodedToken.realm_access?.roles) {
  //           const technicalRoles = ['offline_access', 'uma_authorization', 'default-roles-laravel-realm'];
  //           this.roles = decodedToken.realm_access.roles.filter((role: string) =>
  //             !technicalRoles.includes(role)
  //           );
  //           this.role = this.roles[0] || 'sin-rol';
  //         }

  //         this.emprendimientoService.obtenerUsuarioKeyPorId(sub).subscribe(data => {
  //           console.log('Datos del usuario:', data);
  //           this.idUser = data.identificacion;
  //           this.username = data.username || decodedToken.preferred_username;
  //         });


  //         if (this.idUser !== null) {
  //           // console.log('ID de usuario logueado:', this.idUser);
  //           // console.log('Nombre de usuario logueado:', this.username);
  //           // console.log('Rol de usuario logueado:', this.role);
  //           // console.log('ID de usuario logueado:', this.roles);
  //         } else {
  //           this.idUser = '0';
  //           console.error('No se encontró el usuario logueado en la lista de usuarios');
  //         }
  //       });




  //     }
  //   });
  // }



  // obtenerUsuario() {
  //   const token = this.AuthService.getToken();
  //   if (!token) return;

  //   const decodedToken: any = jwtDecode(token);
  //   const sub = decodedToken.sub;

  //   // Procesar roles del token
  //   if (decodedToken.realm_access?.roles) {
  //     const technicalRoles = ['offline_access', 'uma_authorization', 'default-roles-laravel-realm'];
  //     this.roles = decodedToken.realm_access.roles.filter((role: string) =>
  //       !technicalRoles.includes(role)
  //     );
  //     this.role = this.roles[0] || 'sin-rol';
  //   }

  //   // Obtener datos adicionales del servicio (una sola llamada)
  //   this.emprendimientoService.obtenerUsuarioKeyPorId(sub).subscribe({
  //     next: (data) => {
  //       this.idUser = data.identificacion;
  //       this.username = data.username || decodedToken.preferred_username;

  //       // Compartir datos actualizados
  //       this.compartirDatos();

  //       console.log('Datos completos:', {
  //         id: sub,
  //         identificacion: this.idUser,
  //         username: this.username,
  //         role: this.role,
  //         roles: this.roles
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Error al obtener datos:', err);
  //     }
  //   });
  // }

  obtenerUsuario() {
       this.SharedDataService.usuario$.subscribe(usuario => this.usuario = usuario);
    this.SharedDataService.idUser$.subscribe(id => this.idUser = id ?? '');
    this.SharedDataService.username$.subscribe(name => this.username = name ?? '');
    this.SharedDataService.role$.subscribe(role => this.role = role ?? '');
    this.SharedDataService.roles$.subscribe(roles => this.roles = roles);
    console.log('ID de usuario:', this.idUser);
    console.log('Nombre de usuario:', this.username);
    console.log('Rol de usuario:', this.role);
    console.log('Roles de usuario:', this.roles);
  }



}
