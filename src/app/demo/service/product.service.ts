import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { Producto } from '../api/producto';
import { Observable } from 'rxjs';
import { detalleProducto } from '../api/detalleProducto';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }
    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
    getProvidersWithProducts(): Observable<any[]> {
        return this.http.get<any[]>('http://127.0.0.1:8000/api/getproviders')
    }

    getDetalle(): Observable<detalleProducto[]> {
        return this.http.get<detalleProducto[]>('http://127.0.0.1:8000/api/getdetalleproducto')
    }

    getProductos() {
        return this.http.get<any>('http://127.0.0.1:8000/api/getproducts')
            .toPromise()
            .then(res => res as [])
            .then(data => data);
    }

    getProductosWithDetail() {
        return this.http.get<any>('http://127.0.0.1:8000/api/getproductsDetails')
            .toPromise()
            .then(res => res as [])
            .then(data => data);
    }

    CreateOrUpdate(producto: Producto):Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/createorupdateproducts', producto);
      }

      CreateNewDetail(detalle: detalleProducto):Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/saveDetail', detalle);
      }

      Delete(producto:Producto):Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/deactivate', producto);
      }

      DeleteDetail(detalle: detalleProducto):Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/deletedetail/', detalle);
      }
}
