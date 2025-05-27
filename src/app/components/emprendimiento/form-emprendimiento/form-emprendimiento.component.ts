import { Component, OnInit } from '@angular/core';
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
  emprendimientoForm!: FormGroup;
  categorias: Categoria[] = [];
  modoEdicion: boolean = false;
  idEmprendimiento: string = '';
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
    this.emprendimientoForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: [''],
      id_cat: ['', Validators.required],
      id_usuario: [{ value: this.idUser, disabled: true }],
      descripcion: ['', Validators.required],
      estado: ['A', Validators.required], 
      fechaInscripcion: [{ value: new Date().toISOString().substring(0, 10), disabled: true }],
    });

    this.obtenerUsuario();
    this.obternerCategoriaEmprendimiento();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.modoEdicion = true;
        this.idEmprendimiento = params['id'];
        this.cargarDatos(this.idEmprendimiento);
      }
    });
  }

  limpiarCampos(): void {
    this.emprendimientoForm.reset({
      nombre: '',
      marca: '',
      categoria: '',
      descripcion: ''
    });
  }

  cargarDatos(id: string) {
    this.emprendimientoService.obtenerPorId(id).subscribe(data => {
      this.emprendimientoForm.patchValue(data);
    });
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
        this.emprendimientoService.actualizarEmprendimiento(datos).subscribe(res => {
          alert('Emprendimiento actualizado');
        });
      } else {
        // Registrar nuevo emprendimiento
        this.emprendimientoService.registrarEmprendimiento(datos).subscribe(res => {
          alert('Emprendimiento registrado exitosamente');
          this.emprendimientoForm.reset();
        });
      }
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
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
