import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../app-core/servicios/producto.service';
import { EmprendimientoService } from '../../../app-core/servicios/emprendimiento.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {  FormProductoComponent} from '../form-producto/form-producto.component';
@Component({
  selector: 'app-catalogo',
  styleUrls: ['./catalogo.component.scss'],
  templateUrl: './catalogo.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormProductoComponent],
})
export class CatalogoComponent implements OnInit {

  productos: any[] = [];
  categorias: any[] = [];
  productoForm!: FormGroup;
  modoEdicion: boolean = false;
  idProductoEditar: number | null = null;
  idEmprendimiento = 1; // Asigna este valor dinámicamente si es necesario
  nombreEmprendimiento = 'Mi Emprendimiento';
  productoSeleccionado: any = null;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private emprendimientoService: EmprendimientoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //Datos para probar la vista
    this.productos = [
      {
        id: 1,
        nombre: 'Camisa Deportiva',
        detalle: 'Camisa de tela transpirable para deporte',
        precio: 45000,
        stock: 20,
        fecha_elaboracion: '2025-05-01',
        fecha_vencimiento: '2026-05-01',
        talla: 'M',
        codigo_qr: 'ABC123XYZ',
        id_cat: 2
      },

    ];

    // Inicializar el formulario
    this.productoForm = this.fb.group({
      id_emprendimiento: [this.idEmprendimiento],
      nombre: ['', Validators.required],
      detalle: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      fecha_elaboracion: [''],
      fecha_vencimiento: [''],
      talla: [''],
      codigo_qr: [''],
      id_cat: ['', Validators.required]
    });
    this.cargarProductos();
    this.cargarCategorias();
    this.productoForm = this.fb.group({
      id_emprendimiento: [this.idEmprendimiento],
      nombre: ['', Validators.required],
      detalle: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      fecha_elaboracion: ['', Validators.required],
      fecha_vencimiento: ['', Validators.required],
      talla: [''],
      codigo_qr: [''],
      id_cat: ['', Validators.required]
    });
  }


  seleccionarProducto(producto: any) {
    this.productoSeleccionado = { ...producto }; // Clon para no modificar directamente
  }

  cancelarEdicion() {
    this.productoSeleccionado = null;
  }


  guardarEdicion(productoActualizado: any) {
    // Lógica para actualizar el producto (API o local)
    // Ejemplo:
    const index = this.productos.findIndex(p => p.id === productoActualizado.id);
    if (index !== -1) {
      this.productos[index] = { ...productoActualizado };
    }

    this.productoSeleccionado = null;
  }


  cargarProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      console.log('Productos obtenidos desde el backend:', data);
      this.productos = data as any[];
    });
  }

  cargarCategorias(): void {
    this.emprendimientoService.obtenerCategoriaProducto().subscribe(data => {
      this.categorias = data;
    });
  }

  registrar(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const datos = {
      ...this.productoForm.value,
      id_emprendimiento: this.idEmprendimiento
    };

    if (this.modoEdicion && this.idProductoEditar) {
      // Actualizar producto
      this.productoService.actualizarProducto(this.idProductoEditar, datos).subscribe({
        next: () => {
          alert('Producto actualizado exitosamente');
          this.modoEdicion = false;
          this.idProductoEditar = null;
          this.cargarProductos();
          this.productoForm.reset();
        },
        error: () => {
          alert('Error al actualizar producto');
        }
      });
    }
  }


  eliminarProducto(producto: any): void {
  
  }


  limpiarCampos(): void {
    this.productoForm.reset();
  }

  cancelar(): void {
    this.router.navigate(['/productos']); // Ajusta a la ruta de retorno deseada
  }

}