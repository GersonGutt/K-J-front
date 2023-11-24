import { Component,OnInit } from '@angular/core';
import { Notificacion } from 'src/app/demo/api/Notificacion';
import { ChangeDetectorRef } from '@angular/core';
import { NotificacionService } from 'src/app/demo/service/notificacion.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  providers:[ MessageService, ConfirmationService]
})
export class NotificacionesComponent implements OnInit {


  constructor(private notificacionService: NotificacionService, private messageService: MessageService, private confirmationService: ConfirmationService,private cdr: ChangeDetectorRef) {
    this.selectedRowIndex = -1;
  }


  notificaciones!: Notificacion[];
  public notificacion: Notificacion = {
    id :0,
   notificacion: '',
   is_readed: 0

 };
 selectedNotificacions!: Notificacion[] | null;
 indexSelected : number = -1;
 selectedRowIndex: number;

  ngOnInit(): void{
    this.notificacionService.getCategorias().subscribe(
      response => {
        this.notificaciones = response as Notificacion[]
        console.log(response);
      }
    );
  }
  editCategoria(notificacion: Notificacion) {
    this.notificacion = { ...notificacion};
    
    this.indexSelected = this.notificaciones.indexOf(notificacion);
    console.log(this.indexSelected);
    this.updateCat();

  }

  updateCat():void {
    this.notificacion.is_readed = 1;
    console.log(this.notificacion.is_readed);
   const categoria = this.notificacion;
  
    this.notificacionService.update(categoria).subscribe({
      next: (json) =>{
        Object.assign(this.notificaciones[this.indexSelected],json.data);
    
     
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000});
        console.log('code status: '+err.status);
        console.log(err.message);
      }
    
  })
  
  }
 
}
