import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publicacion-producto',
  imports: [CommonModule, FormsModule],
  templateUrl: './publicacion-producto.component.html',
  styleUrl: './publicacion-producto.component.scss'
})
export class PublicacionProductoComponent {

  publicarProducto() { }
  cancelarPublicacionProducto() { }
  cargarImagenPublicacionProducto(){}

  // productos.component.ts

  productos = [
    {
      id: '0001',
      nombre: 'Camiseta UDENAR',
      estado: 'A',
      categoria: 'artesanias',
      precio: 25000,
      imagen: 'assets/images/logo.jpg',
      likes: 10,
      comentarios: 2,
      seleccionado: false
    },
    {
      id: '0001',
      nombre: 'Camiseta UDENAR',
      estado: 'A',
      categoria: 'artesanias',
      precio: 25000,
      imagen: 'assets/images/logo.jpg',
      likes: 10,
      comentarios: 2,
      seleccionado: false
    },
    {
      id: '0001',
      nombre: 'Camiseta UDENAR',
      estado: 'A',
      categoria: 'artesanias',
      precio: 25000,
      imagen: 'assets/images/logo.jpg',
      likes: 10,
      comentarios: 2,
      seleccionado: false
    }
  ];


  productosPrevisualizados: any[] = [];
  mostrarPrevisualizacion = false;

previsualizarProductos() {
  this.productosPrevisualizados = this.productos.filter(p => p.seleccionado);
  this.mostrarPrevisualizacion = this.productosPrevisualizados.length > 0;
}
}




