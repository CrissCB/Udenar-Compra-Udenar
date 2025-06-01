import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeriaService {
  private apiUrl = 'http://localhost:8000/api/feria';

  constructor(private http: HttpClient) {}

  crearFeria(data: any): Observable<any> {
    const token = localStorage.getItem('token'); // Obtener token almacenado

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
