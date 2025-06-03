import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../../app-core/servicios/producto.service';
import { SharedDataService } from '../../../app-core/servicios/shared-data.service';
import { EmprendimientoService } from '../../../app-core/servicios/emprendimiento.service';

@Component({
  selector: 'app-publicacion-producto',
  imports: [CommonModule, FormsModule],
  templateUrl: './publicacion-producto.component.html',
  styleUrl: './publicacion-producto.component.scss'
})
export class PublicacionProductoComponent {

  // productos.component.ts
  productos: any[] = [];
  productosPrevisualizados: any[] = [];
  mostrarPrevisualizacion = false;
  id_usuario: string = '';
  idEmprendimiento: number | null = null;
  nombreEmprendimiento = 'Mi Emprendimiento';

  constructor(
    private SharedDataService: SharedDataService,
    private emprendimientoService: EmprendimientoService,
    private productoService: ProductoService,
  ) { }

  ngOnInit() {
    this.productos = [];
    this.obtenerUsuario();
    this.cargarEmprendimiento();
  }

  publicarProducto() {

  }

  cancelarPublicacionProducto() { 

  }

  cargarImagenPublicacionProducto(){

  }

  previsualizarProductos() {
    this.productosPrevisualizados = this.productos.filter(p => p.seleccionado);
    this.mostrarPrevisualizacion = this.productosPrevisualizados.length > 0;
  }

  cargarEmprendimiento(): void {
    this.emprendimientoService.obtenerPorId(this.id_usuario).subscribe(data => {
      this.idEmprendimiento = data.data.id;
      this.nombreEmprendimiento = data.data.nombre;
      this.cargarProductos();
    });
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

  obtenerUsuario() {
    this.SharedDataService.idUser$.subscribe(id => this.id_usuario = id ?? '');
  }
}




