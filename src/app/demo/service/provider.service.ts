import { Proveedor } from 'src/app/demo/api/Proveedor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../api/producto';

@Injectable()
export class ProviderService {

    constructor(private http: HttpClient) { }
    getProvidersWithProducts(): Observable<any[]>{
        return this.http.get<any[]>('http://127.0.0.1:8000/api/getproviders');
    }

    getProviders(): Observable<any[]>{
        return this.http.get<any[]>('http://127.0.0.1:8000/api/getproveedores');
    }

    getProvidersByProductoId(producto: Producto): Observable<Proveedor[]>{
        return this.http.post<Proveedor[]>('http://127.0.0.1:8000/api/getProductsById', producto);
    }

    getProductos() {
        return this.http.get<any>('http://127.0.0.1:8000/api/getproducts')
            .toPromise()
            .then(res => res as Proveedor)
            .then(data => data);
    }

    saveProvider(proveedor: Proveedor): Observable<any>{
        return this.http.post<any>('http://127.0.0.1:8000/api/saveprovider', proveedor)
    }

    editProvider(proveedor: Proveedor): Observable<any>{
        return this.http.put<any>('http://127.0.0.1:8000/api/provider/update', proveedor)
    }

    changeState(proveedor: Proveedor): Observable<any>{
        return this.http.put<any>('http://127.0.0.1:8000/api/ChangeState', proveedor)
    }
    getUnabledProviders(): Observable<any[]>{
        return this.http.get<any[]>('http://127.0.0.1:8000/api/getproviders/unabled');
    }
}
