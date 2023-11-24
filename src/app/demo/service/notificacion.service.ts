import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion} from 'src/app/demo/api/Notificacion';

@Injectable()
export class NotificacionService {

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Notificacion[]>{
    return this.http.get<Notificacion[]>('http://127.0.0.1:8000/api/getnotificacion');
}
getCategoriass(): Observable<Notificacion[]>{
  return this.http.get<Notificacion[]>('http://127.0.0.1:8000/api/getnotificacioncont');
}
update(notificacion: Notificacion):Observable<any> {
  return this.http.put('http://127.0.0.1:8000/api/putnotificacion',notificacion);
}

}
