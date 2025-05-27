import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  private apiUrl = 'http://localhost:8000/api/producto'; 

  constructor(private http: HttpClient) { }

  crearProducto(producto: any) {
    return this.http.post(this.apiUrl, producto);
  }

  getProductos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  actualizarProducto(id: number, datos: any) {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }

  eliminarProducto(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}


