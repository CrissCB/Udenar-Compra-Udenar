import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmprendimientoService } from '../../../app-core/servicios/emprendimiento.service';
import { Categoria } from '../../../app-core/interfaces/categoria-emprendimiento';
import { AuthService } from '../../../auth/auth.service';
import { SharedDataService } from '../../../app-core/servicios/shared-data.service';
import { ProductoService } from '../../../app-core/servicios/producto.service';
import { CategoriaProducto } from '../../../app-core/interfaces/categoria-producto';


@Component({
  selector: 'app-publicacion',
  imports: [ReactiveFormsModule],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.scss'
})
export class PublicacionComponent implements OnInit {

  nombre_emprendimiento: string = '';
  idEmprendimiento: string = '';
  categoria: string = '';
  descripcion: string = '';
  marca: string = '';
  //Datos del usuario
  id_usuario: string = '';
  nombre_apellido_emprendedor: string='';
  redes: string = '';
 
    productos = [
    { nombre: 'Nombre Producto', precio: 0.00, comentarios: 0, likes: 0 },
    { nombre: 'Nombre Producto', precio: 0.00, comentarios: 0, likes: 0 },
    { nombre: 'Nombre Producto', precio: 0.00, comentarios: 0, likes: 0 },
    // Puedes añadir más objetos
  ];

  constructor(
    private emprendimientoService: EmprendimientoService,
    private SharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerIdEmprendimiento();
  }

  obtenerIdEmprendimiento() {
    this.emprendimientoService.obtenerPorId(this.id_usuario).subscribe(
      res => {
        this.idEmprendimiento = res.data.id;
        this.nombre_emprendimiento = res.data.nombre;
        this.marca = res.data.marca;
        this.descripcion = res.data.descripcion;
        
        this.obternerCategoriaEmprendimiento(res.data.id_cat);
      },
      error => {
        console.error('Error al obtener el emprendimiento:', error);
      }
    );
  }

  obternerCategoriaEmprendimiento(id: number) {
    this.emprendimientoService.obtenerCategoriaEmprendimientoPorId(id).subscribe(
      res => {
        this.categoria = res.data.nombre;
      },
      error => {
        console.error('Error al obtener la categoría del emprendimiento:', error);
      }
    );
  }

  obtenerUsuario() {
    // this.SharedDataService.usuario$.subscribe(usuario => this.usuario = usuario);
    this.SharedDataService.idUser$.subscribe(id => this.id_usuario = id ?? '');
    this.SharedDataService.username$.subscribe(name => this.nombre_apellido_emprendedor = name ?? '');
    // this.SharedDataService.role$.subscribe(role => this.role = role ?? '');
    // this.SharedDataService.roles$.subscribe(roles => this.roles = roles);
    // console.log('ID de usuario:', this.id_usuario);
    // console.log('Nombre de usuario:', this.nombre_apellido_emprendedor);
    // console.log('Rol de usuario:', this.role);
    // console.log('Roles de usuario:', this.roles);
  }
}

