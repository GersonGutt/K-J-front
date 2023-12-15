import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { ComprasProviderRoutingModule } from './comprasprovider-routing.module';
import { ComprasProviderComponent } from './comprasprovider.component';


@NgModule({
    imports: [
        CommonModule,
		FormsModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
        DialogModule,
        MultiSelectModule,
        ToastModule,
        ConfirmDialogModule,
        TableModule,
        TreeTableModule,
        DialogModule,
        ComprasProviderRoutingModule,

    ],
    declarations: [ComprasProviderComponent]
})
export class ComprasProviderModule { }
