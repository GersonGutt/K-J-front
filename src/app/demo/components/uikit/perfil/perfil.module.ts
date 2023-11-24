import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
@NgModule({
	imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
		    InputTextModule,
        FormsModule,
PerfilRoutingModule,
PasswordModule,
CheckboxModule,
ToastModule,
        InputTextareaModule,
        DropdownModule,
        FileUploadModule
      ],
      declarations: [
        PerfilComponent,
      ],
      exports: [
        PerfilComponent
      ]
})
export class PerfilModule{ }
