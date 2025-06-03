
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class ServiceBase {
  ApiUrl: string = '';
  

  constructor(
    protected http: HttpClient
  ) {
  }

  protected validate() {
    if (!this.ApiUrl) {
      throw 'Debe configurar la variable ApiUrl antes el servicio';
    }
    
  }

  public getApiUrl() {
    return this.ApiUrl;
  }

  

  getAll(): Observable<any> {
    return this.http.get(this.ApiUrl) ;
  }

  getOne(id: any): Observable<any> {
    return this.http.get([this.ApiUrl, id].join('/')) ;
  }

  put(id: any, model: any): Observable<any> {
    return this.http.put([this.ApiUrl, id].join('/'), model) ;
  }

  post(model: any): Observable<any> {
    return this.http.post([this.ApiUrl].join('/'), model) ;
  }

  delete(id: any): Observable<any> {
    return this.http.delete([this.ApiUrl, id].join('/')) ;
  }
}
