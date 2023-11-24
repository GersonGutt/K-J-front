import { Injectable } from '@angular/core';
import { Perfil } from '../api/perfil';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  getUser  (): Observable<Perfil[]>{
    return this.http.get<Perfil[]>('http://127.0.0.1:8000/api/getusers');
}
// update(perfil: Perfil):Observable<any> {
//   return this.http.put('http://127.0.0.1:8000/api/user/update',perfil);
// }
}
