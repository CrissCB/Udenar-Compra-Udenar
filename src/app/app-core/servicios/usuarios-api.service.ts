import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceBase } from './service-base';
import { HttpClient } from '@angular/common/http';
import config from '../../app-core/configuracion/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceBase {

  constructor(protected override http: HttpClient) {
    super(http);
    this.ApiUrl = [config.ApiUrl,].join('/');
  }

  indexUsuarios(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/user`);
  }

  storeUsuarios(data: any): Observable<any> {
    return this.http.post(`${this.ApiUrl}/user`, data);
  }

  showUsuarios(id: string): Observable<any> {
    return this.http.get(`${this.ApiUrl}/user/${id}`);
  }

  destroyUsuarios(id: string): Observable<any> {
    return this.http.delete(`${this.ApiUrl}/user/${id}`);
  }

  updateUsuarios(id: string, data: any): Observable<any> {
    return this.http.put(`${this.ApiUrl}/user/${id}`, data);
  }

  updatePartialUsuarios(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.ApiUrl}/user/${id}`, data);
  }

  obtenerUsuarioKey(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/user_key`);
  }

  obtenerUsuarioKeyPorId(id: string): Observable<any> {
    return this.http.get(`${this.ApiUrl}/user_key/${id}`);
  }
}
