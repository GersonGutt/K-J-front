import { Injectable } from '@angular/core';
import { Venta } from '../api/venta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  Create(venta: Venta):Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/venta', venta);
  }

  GetAllVentas():Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/ventasAll');
  }

  GetAllInactivas():Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/ventasInactivas');
  }

  Factura(venta: Venta): Observable<Blob> { // Cambia el tipo a Blob
    return this.http.post('http://127.0.0.1:8000/api/venta/report', venta, { responseType: 'blob' }); // Configura el responseType como 'blob'
  }

  Report(fechas:any): Observable<Blob> { // Cambia el tipo a Blob
    return this.http.post('http://127.0.0.1:8000/api/reportAll', fechas, { responseType: 'blob' }); // Configura el responseType como 'blob'
  }
  Deactivate(venta:any): Observable<any> { // Cambia el tipo a Blob
    return this.http.post('http://127.0.0.1:8000/api/venta/deactivate', venta);
  }
  changeState(venta:any): Observable<any>{
    return this.http.put<any>('http://127.0.0.1:8000/api/venta/ChangeState', venta);
}

  getStates(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/gananciasMes');
}

getLatest(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/getLatest');
}


}
