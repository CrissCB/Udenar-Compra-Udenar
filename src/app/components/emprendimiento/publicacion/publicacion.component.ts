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
  descripcion: string = 'Emprendimiento dedicado a la creación y venta de artesanías elaboradas a mano, que rescatan tradiciones culturales y promueven el trabajo local con materiales sostenibles y diseños únicos.';
  marca: string = 'Artemania';
  //Datos del usuario
  id_usuario: string = '';
  nombre_apellido_emprendedor: string='William Perez';
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
    this.obtenerIdEmprendimiento();
  }

  obtenerIdEmprendimiento() {
    this.SharedDataService.idUser$.subscribe(id => this.id_usuario = id ?? '');

    this.emprendimientoService.obtenerPorId('' + this.id_usuario).subscribe({
      next: (data) => {
        this.nombre_emprendimiento = data.Emprendimiento.nombre;
        console.log('ID de emprendimiento obtenido:', this.idEmprendimiento);
      },
      error: (error) => {
        console.error('Error al obtener el ID de emprendimiento:', error);
      }
    });
  }
}

