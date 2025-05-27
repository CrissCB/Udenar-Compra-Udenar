import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import config from '../../app-core/configuracion/config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends ServiceBase {

  constructor(protected override http: HttpClient) { 
    super(http);
    this.ApiUrl = [config.ApiUrl,].join('/');
  }

  crearProducto(producto: any) {
    return this.http.post(`${this.ApiUrl}/producto`, producto);
  }

  getProductos() {
    return this.http.get(`${this.ApiUrl}/producto`);
  }

  actualizarProducto(id: number, data: any) {
    return this.http.put(`${this.ApiUrl}/producto/${id}`, data);
  }

  eliminarProducto(id: number) {
  return this.http.delete(`${this.ApiUrl}/producto/${id}`);
}

}


