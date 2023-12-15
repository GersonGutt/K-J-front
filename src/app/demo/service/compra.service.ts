import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  Create(compra: any):Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/compra', compra);
  }

  GetAllCompra():Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/comprasAll');
  }

  GetAllInactivas():Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/comprasAllInactivas');
  }

  Report(fechas:any): Observable<Blob> { // Cambia el tipo a Blob
    return this.http.post('http://127.0.0.1:8000/api/reportAllCompras', fechas, { responseType: 'blob' }); // Configura el responseType como 'blob'
  }
  Deactivate(compra:any): Observable<any> { // Cambia el tipo a Blob
    return this.http.post('http://127.0.0.1:8000/api/compra/deactivate', compra);
  }
  changeState(compra:any): Observable<any>{
    return this.http.put<any>('http://127.0.0.1:8000/api/compra/changeState', compra);
}
}
