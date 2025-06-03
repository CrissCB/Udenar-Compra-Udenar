import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../app-core/servicios/producto.service';
import { EmprendimientoService } from '../../../app-core/servicios/emprendimiento.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {  FormProductoComponent} from '../form-producto/form-producto.component';
import { SharedDataService } from '../../../app-core/servicios/shared-data.service';

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
  idEmprendimiento: number | null = null; 
  id_usuario: string = '';
  nombreEmprendimiento = 'Mi Emprendimiento';
  productoSeleccionado: any = null;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private emprendimientoService: EmprendimientoService,
    private router: Router,
    private SharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    //Datos para probar la vista
    this.productos = [];
    this.obtenerUsuario();
    this.cargarEmprendimiento();
    this.cargarCategorias();
    // Inicializar el formulario
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

  eliminarProducto(producto: any): void {
    this.productoService.eliminarProducto(producto.id).subscribe(
      res => {
        this.cargarProductos();
      },
      error => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }

  cancelarEdicion() {
    this.productoSeleccionado = null;
  }

  guardarEdicion(productoActualizado: any) {
    this.cargarProductos();
    this.productoSeleccionado = null;
  }

  cargarProductos(): void {
    if (this.idEmprendimiento) {
      this.productoService.getProductoById(this.idEmprendimiento).subscribe(
        res => {
          this.productos = res.data || [];

          this.cargarNombreProducto(); // Cargar nombres de productos
        },
        error => {
          console.error('Error al cargar productos:', error);
        }
      );
    }
  }

  cargarCategorias(): void {
    this.emprendimientoService.obtenerCategoriaProducto().subscribe(data => {
      this.categorias = data.data || [];
    });
  }

  cargarEmprendimiento(): void {
    this.emprendimientoService.obtenerPorId(this.id_usuario).subscribe(data => {
      this.idEmprendimiento = data.data.id;
      this.nombreEmprendimiento = data.data.nombre;
      this.cargarProductos();
    });
  }

  obtenerUsuario() {
    this.SharedDataService.idUser$.subscribe(id => this.id_usuario = id ?? '');
  }

  cargarNombreProducto(){
    for (const producto of this.productos) {
      this.emprendimientoService.obtenerCategoriaProductoPorId(producto.id_cat).subscribe(
        res => {
          producto.categoria = res.data.nombre;
        },
        error => {
          console.error('Error al cargar nombre del producto:', error);
        }
      );
    }
  }
}