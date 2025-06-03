import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import config from '../../app-core/configuracion/config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends ServiceBase {

  constructor(protected override http: HttpClient) { 
    super(http);
    this.ApiUrl = [config.ApiUrl,].join('/'); 
  }

  crearProducto(producto: any):  Observable<any> {
    return this.http.post(`${this.ApiUrl}/producto`, producto);
  }

  getProductos():  Observable<any> {
    return this.http.get(`${this.ApiUrl}/producto`);
  }

  getProductoId(id: number):  Observable<any> {
    return this.http.get(`${this.ApiUrl}/producto/${id}`);
  }

  getProductoById(id: number):  Observable<any> {
    return this.http.get(`${this.ApiUrl}/producto/emprendimiento/${id}`);
  }

  actualizarProducto(id: number, data: any):  Observable<any> {
    return this.http.put(`${this.ApiUrl}/producto/${id}`, data);
  }

  eliminarProducto(id: number):  Observable<any> {
  return this.http.delete(`${this.ApiUrl}/producto/${id}`);
}

}


