import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/demo/api/Categoria';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriaService {

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>('http://127.0.0.1:8000/api/getcategoria');
}

// getById(id:number): Observable<Categoria>{
//   return this.http.get<Categoria>();
// }
create (categoria:Categoria): Observable<any>{
  return this.http.post('http://127.0.0.1:8000/api/savecategoria',categoria);
}
update(categoria: Categoria):Observable<any> {
  return this.http.put('http://127.0.0.1:8000/api/updatecategoria',categoria);
}
delete(categoria: Categoria): Observable<any>{
return this.http.post('http://127.0.0.1:8000/api/categoriadelete',categoria);
}
}
