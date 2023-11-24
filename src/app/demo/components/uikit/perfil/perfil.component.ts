import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpHeaders } from '@angular/common/http';
import { Perfil } from 'src/app/demo/api/perfil';

import { PerfilService } from 'src/app/demo/service/perfil.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers:[ MessageService, ConfirmationService]
})
export class PerfilComponent implements OnInit {

  perfiles!: Perfil[];
  public perfil: Perfil ={
     email:'',
     password: ''

  }
  password1 : string = '';
  password2 : string = '';
  indexSelected : number = -1;
  constructor(private perfilService:PerfilService, private messageService: MessageService, private confirmationService: ConfirmationService,private http:HttpClient) {}

  ngOnInit(): void{
    this.perfilService.getUser().subscribe(
      response => {
        this.perfiles = response as Perfil[];
        console.log(response);
      }
    );
  }
  unsetProduct():void{
    this.perfil= {
        email:'',
        password: ''

  }
  }




  update():void {

    if(this.perfil.email == '' && this.perfil.password == '' && this.password1 == '' && this.password2 == '') {
      this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Llene todo los campos', life: 3000 });

    }else{

      const perfil = this.perfil;
   if(this.password1 == this.password2){
    const requestData = {
      email: perfil.email,
     password:this.password1,
      newPassword: perfil.password
      // Agrega otros campos si es necesario
    };


    this.http.put('http://127.0.0.1:8000/api/user/update',requestData).subscribe({

      next: (json) =>{
        // Object.assign(this.perfiles[this.indexSelected],json.data);

      this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json}`, life: 3000});
      },
      error: (err) => {
        if(err.status === 'fails'){
          this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000});
        }else{
          this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000});
          console.log('code status: '+err.status);
          console.log(err.message);
        }

      }
    })
   }else{
    this.messageService.add({severity: 'error', summary: 'Resultado', detail: 'Contraseñas no Coninciden', life: 3000});
   }
    }



  this.unsetProduct();
  }
}
