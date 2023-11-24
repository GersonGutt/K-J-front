import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponent } from './products.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
	imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
		InputTextModule,
        FormsModule,
        InputTextareaModule,
        DropdownModule,
        FileUploadModule
      ],
      declarations: [
        ProductsComponent
      ],
      exports: [
        ProductsComponent
      ]
})
export class ProductsModule { }
