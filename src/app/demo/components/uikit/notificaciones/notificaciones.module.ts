import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificacionesComponent } from './notificaciones.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
@NgModule({
    imports: [
        CommonModule,
        ToolbarModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
       ConfirmDialogModule,
        DialogModule,
        ToastModule,
        OverlayPanelModule,
       
    ],
    declarations: [
       NotificacionesComponent
      ],
      exports: [
        NotificacionesComponent,
      ]
})
export class notificacionesModule { }