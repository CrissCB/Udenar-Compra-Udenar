import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../app-core/servicios/producto.service';
import { EmprendimientoService } from '../../../app-core/servicios/emprendimiento.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaProducto } from '../../../app-core/interfaces/categoria-producto';
import { SharedDataService } from '../../../app-core/servicios/shared-data.service';


@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule]
})
export class FormProductoComponent implements OnInit {

  // @Input() idEmprendimiento!: number;
  nombre_emprendimiento: string = '';
  idEmprendimiento: string = '';
  id_usuario: string = '';
  productoForm!: FormGroup;
  modoEdicion = false;
  categorias: CategoriaProducto[] = []; // Esto debería llenarse desde tu servicio

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private emprendimientoService: EmprendimientoService,
    private SharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      // id_emprendimiento: [{ value: this.id ,disabled: true }],
      nombre: ['', Validators.required],
      detalle: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      fecha_elaboracion: ['', ],
      fecha_vencimiento: ['',],
      talla: [''],
      codigo_qr: [''],
      id_cat: ['', Validators.required],
    });

    this. obtenerCategoriaProducto();
    this.obtenerIdEmprendimiento();

  }

obtenerCategoriaProducto() {
  this.emprendimientoService.obtenerCategoriaProducto().subscribe(data => {
    this.categorias = data["categoria de productos"]; // <- así accedes correctamente al arreglo
    console.log('Categorías obtenidas:', this.categorias);
  });
}

obtenerIdEmprendimiento() {
  this.SharedDataService.idUser$.subscribe(id => this.id_usuario = id ?? '');

  this.emprendimientoService.obtenerPorId(''+this.id_usuario).subscribe({
    next: (data) => {
      this.nombre_emprendimiento = data.Emprendimiento.nombre;
      console.log('ID de emprendimiento obtenido:', this.idEmprendimiento);
    },
    error: (error) => {
      console.error('Error al obtener el ID de emprendimiento:', error);
    }
  });
}



    registrar(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const producto = {
      ...this.productoForm.value,
      id_emprendimiento: this.idEmprendimiento
    };

    this.productoService.crearProducto(producto).subscribe({
      next: res => {
        alert('Producto registrado exitosamente');
        this.router.navigate(['/productos']); // O redirige según tu flujo
      },
      error: err => {
        console.error('Error al registrar producto:', err);
        alert('Error al registrar el producto');
      }
    });
  }

  limpiarCampos(): void {
    this.productoForm.reset();
  }

  cancelar(): void {
    this.router.navigate(['/productos']); // Ajusta a la ruta de retorno deseada
  }
}