import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Message, MessageService } from 'primeng/api';

export interface usuario {
    email: string;
    password: string;
    errors: errors;
    error: {};
}

export interface errors {
    email: string | null,
    password: string | null,
    error: string | null
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
        .background {
  background-image: url('/assets/demo/images/login/fondo.png'); /* Ruta a tu imagen de fondo */
  background-size: cover; /* Ajusta la imagen al tamaño de la pantalla */

  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
    `]
})


export class LoginComponent {

    msgs: Message[] = [];
    err: Message[] = [];
    public usuario: usuario = {
        password: "",
        email: "",
        errors: {
            email: null,
            password: null,
            error: null,
        },
        error: {}
    };
    sendmail:string = '';
    dialog: boolean = false;
    valCheck: string[] = ['remember'];

    login(usuario:usuario):void{
        console.log("Usuario: ", this.usuario.email);
        console.log("Contraseña: ", this.usuario.password);
        this.http.post<usuario>("http://127.0.0.1:8000/api/login",usuario).subscribe(response => {
            if(response.errors || response.error){
                console.log(response);
                this.usuario.errors = response.errors;
                if (response.errors.error){
                    this.showErrorViaMessages();
                }
            }
            else{
                this.saveLocalStorage(response);
                this.showSuccessViaToast();
            }

        });

    }

    private saveLocalStorage(response:usuario):void {
        sessionStorage.setItem('Authorization', JSON.stringify('Bearer '+response));
        this._router.navigateByUrl('/');
    }

    public showSuccessViaToast() {
            this.service.add({ key: 'tst', severity: 'success', summary: 'Login con exito', detail: 'Iniciando sesion...' });
        }

    public showErrorViaMessages() {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error:', detail: 'Correo o Contraseña incorrecta.' });
        }
    public prueba(){
        this.http.post<any>("http://127.0.0.1:8000/api/provider", 3).subscribe(response => {
            console.log(response);
        });
    }

    openNew() {
        this.sendmail = '';
        this.dialog = true;
    }

    hideDialog() {
        this.dialog = false;
    }
    sendemail(){
        this.http.put<any>("http://127.0.0.1:8000/api/RecoveryPassword", {email: this.sendmail}).subscribe(response => {
            if(response.code == 200){
                this.err = [];
                this.err.push({ severity: 'success', summary: 'Exito:', detail: 'Se ha enviado una contraseña provicional a tu correo.' });
               }else{
                this.err = [];
                this.err.push({ severity: 'error', summary: 'Error:', detail: response.message });
            }
        });
    }
    constructor(public layoutService: LayoutService, private http:HttpClient, private _router: Router, private service: MessageService) { }
}
