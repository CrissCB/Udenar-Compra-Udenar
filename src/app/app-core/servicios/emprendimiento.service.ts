import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceBase } from './service-base';
import { HttpClient } from '@angular/common/http';
import config from '../../app-core/configuracion/config';

@Injectable({
  providedIn: 'root'
})
export class EmprendimientoService extends ServiceBase {

  constructor(protected override http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl,].join('/');
  }

  registrarEmprendimiento(data: any): Observable<any> {
    return this.http.post(`${this.ApiUrl}/emprendimiento`, data);
  }

  actualizarEmprendimiento(data: any):  Observable<any>  {
    return this.http.put(`${this.ApiUrl}/emprendimiento/${data.id_usuario}`, data); // si tienes ID
  }
  obtenerPorId(id: string): Observable<any> {
    return this.http.get(`${this.ApiUrl}/emprendimiento/${id}`);
  }

  actualizar(id: string, data: any): Observable<any> {
    return this.http.put(`${this.ApiUrl}/emprendimiento/${id}`, data);
  }

  obtenerCategoriaEmprendimiento(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/categoria_emprendimiento`);

  }

  obtenerCategoriaEmprendimientoPorId(id: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/categoria_emprendimiento/${id}`);
  }

  obtenerCategoriaProducto(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/categoria_productos`);
  }

  obtenerCategoriaProductoPorId(id: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/categoria_productos/categoria/${id}`);
  }
}
