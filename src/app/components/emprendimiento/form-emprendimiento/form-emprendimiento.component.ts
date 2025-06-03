import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmprendimientoService } from '../../../app-core/servicios/emprendimiento.service';
import { Categoria } from '../../../app-core/interfaces/categoria-emprendimiento';
import { AuthService } from '../../../auth/auth.service';
import { SharedDataService } from '../../../app-core/servicios/shared-data.service';
@Component({
  selector: 'app-form-emprendimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-emprendimiento.component.html',
  styleUrls: ['./form-emprendimiento.component.scss']
})


export class FormEmprendimientoComponent implements OnInit {
  @Input() modoEdicion: boolean = false;
  @Input() idEmprendimiento: string = '';

  emprendimientoForm!: FormGroup;
  categorias: Categoria[] = [];
  selectedOption: string = '';
  usuario: any[] = [];
  identificacion: any[] = [];
  ids: any[] = [];
  idUser: string = '';
  username: string = '';
  role: string = '';
  roles: string[] = [];
  fechaActual: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SharedDataService: SharedDataService,
    private emprendimientoService: EmprendimientoService,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerUsuario();
    this.obternerCategoriaEmprendimiento();
    if (this.modoEdicion) {
      this.cargarDatosEmprendimiento();
    }
  }

  inicializarFormulario(): void {
    this.emprendimientoForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: [''],
      id_cat: ['', Validators.required],
      id_usuario: [{ value: this.idUser, disabled: true }],
      descripcion: ['', Validators.required],
      estado: ['A', Validators.required],
      fechaInscripcion: [{ value: new Date().toISOString().substring(0, 10), disabled: true }],
    });
  }

  limpiarCampos(): void {
    if (this.modoEdicion) {
      this.cargarDatosEmprendimiento();
    } else {
      this.emprendimientoForm.reset({
        nombre: '',
        marca: '',
        categoria: '',
        descripcion: ''
      });
    }
  }

  registrar() {
    if (this.emprendimientoForm.valid) {
      const id_cat = parseInt(this.emprendimientoForm.value.id_cat);
      this.emprendimientoForm.patchValue({ id_cat });

      const datos = {
        ...this.emprendimientoForm.value,
        id_usuario: this.idUser
      };

      if (this.modoEdicion) {
        // Lógica para editar
        this.emprendimientoService.actualizarEmprendimiento(datos).subscribe(
          res => {
            alert('Emprendimiento actualizado');
            this.cargarDatosEmprendimiento();
          },
          error => {
            switch (error.error.code) {
              case 400:
                alert(error.error.message + ' Respuesta: ' + JSON.stringify(error.error.data));
                break;

              case 404:
                alert('Emprendimiento no encontrado. Por favor, verifique si hay algun emprendimiento registrado con la identificacion del usuario.');
                break;
              
              case 500:
                alert('Error interno del servidor. Por favor, inténtelo más tarde.');
                break;

              default:
                alert('Ocurrió un error inesperado. Por favor, inténtelo más tarde.');
                break;
            }
          }
        );
      } else {
        this.emprendimientoService.registrarEmprendimiento(datos).subscribe(
          res => {
            alert('Emprendimiento registrado exitosamente');
            this.limpiarCampos();
          },
          error => {
            // console.error('Error al registrar el emprendimiento:', error);

            switch (error.error.code) {
              case 400:
                alert(error.error.message + ' Respuesta: ' + JSON.stringify(error.error.data));
                break;

              case 500:
                alert('Error interno del servidor. Por favor, inténtelo más tarde.');
                break;

              default:
                alert('Ocurrió un error inesperado. Por favor, inténtelo más tarde.');
                break;
            }
          }
        );
      }
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }

  cancelar(): void {
    // console.log('Registro cancelado');
    if (this.modoEdicion) {
      this.cargarDatosEmprendimiento();
    } else {
      this.limpiarCampos();
    }
  }

  obternerCategoriaEmprendimiento() {
    this.emprendimientoService.obtenerCategoriaEmprendimiento().subscribe(data => {
      this.categorias = data.data;
      // console.log('Categorías obtenidas:', this.categorias);
    });
  }

  cargarDatosEmprendimiento() {
    this.emprendimientoService.obtenerPorId(this.idUser).subscribe(
      res => {
        // console.log('Datos del emprendimiento:', res);
        this.emprendimientoForm.patchValue({
          nombre: res.data.nombre,
          marca: res.data.marca,
          id_cat: res.data.id_cat,
          descripcion: res.data.descripcion
        });
      },
      error => {
        alert(error.error.message + ' Respuesta: ' + JSON.stringify(error.error.data));
      }
    );
  }

  existeEmprendimiento(): boolean {
    let existe = false;
    this.emprendimientoService.obtenerPorId(this.idUser).subscribe(
      res => {
        existe = true; // Si existe, asigna true
      },
      error => {
        existe = false; // Si no existe, asigna false
      }
    );
    return existe; // Retorna el valor de existencia
  }

  obtenerUsuario() {
    this.SharedDataService.usuario$.subscribe(usuario => this.usuario = usuario);
    this.SharedDataService.idUser$.subscribe(id => this.idUser = id ?? '');
    this.SharedDataService.username$.subscribe(name => this.username = name ?? '');
    this.SharedDataService.role$.subscribe(role => this.role = role ?? '');
    this.SharedDataService.roles$.subscribe(roles => this.roles = roles);
    // console.log('ID de usuario:', this.idUser);
    // console.log('Nombre de usuario:', this.username);
    // console.log('Rol de usuario:', this.role);
    // console.log('Roles de usuario:', this.roles);
  }

}
