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

  registrar(data: any): Observable<any> {
    return this.http.post(`${this.ApiUrl}/emprendimiento`, data);
  }

  obtenerPorNombre(nombre: string): Observable<any> {
    return this.http.get(`${this.ApiUrl}/emprendimiento/${nombre}`);
  }

  actualizar(id: number, data: any): Observable<any> {
    return this.http.put(`${this.ApiUrl}/emprendimiento/${id}`, data);
  }

  obtenerCategoriaEmprendimiento(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/categoria_emprendimiento`);

  }

  obtenerUsuario(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/user`);
  }

  obtenerUsuarioKey(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/user_key`);
  }

}
