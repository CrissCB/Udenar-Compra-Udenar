import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import config from '../../app-core/configuracion/config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeriaService extends ServiceBase {
  private apiUrl = 'http://localhost:8000/api/feria';

  constructor(protected override http: HttpClient) { 
    super(http);
    this.ApiUrl = [config.ApiUrl,].join('/'); 
  }

  crearFeria(data: any): Observable<any> {
    return this.http.post(`${this.ApiUrl}/feria`, data);
  }

  actualizarFeria(id: string, data: any): Observable<any> {
    return this.http.put(`${this.ApiUrl}/feria/${id}`, data);
  }

  getFerias(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/feria`);
  }

  getFeriaById(id: string): Observable<any> {
    return this.http.get(`${this.ApiUrl}/feria/${id}`);
  }
}
