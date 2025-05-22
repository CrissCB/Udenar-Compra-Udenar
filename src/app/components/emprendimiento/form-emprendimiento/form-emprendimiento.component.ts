import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmprendimientoService } from '../../../app-core/servicios/emprendimiento.service';
import { Categoria } from '../../../app-core/interfaces/categoria-emprendimiento';
import { AuthService } from '../../../auth/auth.service';
import { jwtDecode } from 'jwt-decode';
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
  // identificacion: string = '';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private emprendimientoService: EmprendimientoService,
    private AuthService: AuthService
    // private emprendimientoService: EmprendimientoService
  ) { }

  ngOnInit(): void {
    this.emprendimientoForm = this.fb.group({
      nombre: [''],
      marca: [''],
      id_cat: [''],
      id_usuario: [{ value: this.idUser, disabled: true }],
      // fechaInscripcion: [{ value: new Date().toISOString().substring(0, 10), disabled: true }],
      descripcion: ['']


    });

    this.obternerUsuario();
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


  obternerUsuario() {
    this.emprendimientoService.obtenerUsuarioKey().subscribe(data => {
      this.usuario = data;
      this.identificacion = this.usuario.map(u => u.identificacion);
      this.ids = this.usuario.map(u => u.id);

      const token = this.AuthService.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const sub = decodedToken.sub;
        const usuarioLogueado = this.usuario.find(u => u.id === sub);

        if (usuarioLogueado) {
          this.idUser = usuarioLogueado.identificacion;
          console.log('ID de usuario logueado:', this.idUser);
          console.log('Usuario logueado:', usuarioLogueado);
        } else {
          this.idUser = '0';
          console.error('No se encontró el usuario logueado en la lista de usuarios');
        }
      }
    });
  }


}
