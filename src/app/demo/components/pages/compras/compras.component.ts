import { Component } from '@angular/core';
import { Venta } from 'src/app/demo/api/venta';
import { VentaService } from 'src/app/demo/service/venta.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CompraService } from 'src/app/demo/service/compra.service';

@Component({
    templateUrl: './compras.component.html',
    providers: [MessageService],
    styles: [`
    .custom-input:disabled {
    opacity: 1; /* Cambia la opacidad para indicar que está deshabilitado */
    cursor: normal; /* Cambia el cursor para indicar que no se puede interactuar */
}
            `],
})
export class ComprasComponent {

    compras: any;
    compra:any;
    detalleCompra:any
    loading: boolean = true;
    FacturaView:boolean = false;
    viewReport:boolean = false;
    optionRadioButton:string =  'Activos';
    deleteProductDialog:boolean = false;
    dates:any = {
        fechaInicio: "" ,
        fechaFinal: ""
    };

    constructor(private compraService: CompraService, private messageService: MessageService) { }

    ngOnInit() {
        this.getVentas();
 }

 getVentas(){
    this.compraService.GetAllCompra().subscribe(response => {
        this.loading = false;
        this.compras = response;
        console.log(response);
    });
 }
 getVentasInactivas(){
    this.compraService.GetAllInactivas().subscribe(response => {
        this.loading = false;
        this.compras = response;
        console.log(response);
    });
 }

 onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

viewDetail(compra:any){
this.FacturaView = true;
this.compra = compra;
this.detalleCompra = Object.values(this.compra.detalleCompra);
console.log(this.detalleCompra);
}

Deactivate():void{
    let estado = this.compra.estado == 'A' ? 'Inactivo' : 'Activo';
    this.compra.estado = this.compra.estado == 'A' ? 'I' : 'A';
            this.compraService.changeState(this.compra).subscribe({
                next: (json) => {
                    this.compras = this.compras.filter((val:any) => val.id !== this.compra.id);
                    console.log(json);
                    this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `El Proveedor ahora esta ${estado}`, life: 3000});
                    },
                    error: (err) => {
                      if (err.status == 409){
                        this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000});
                        console.log(err);
                      }
                    }
  }
  )}

hideView(){
    this.FacturaView = false;
    this.compra = [];
}

generarReporte(){
    const fecha1 = new Date(Date.parse(this.dates.fechaInicio));
    const fecha2 = new Date(Date.parse(this.dates.fechaFinal));
    if(fecha1 > fecha2){
        this.messageService.add({severity: 'error', summary: 'Resultado', detail: 'La fecha inicial no puede ser mayor a la final', life: 3000});
    }
    else{
        console.log(this.dates);
    this.compraService.Report(this.dates).subscribe(json =>{
        const blob = new Blob([json], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    })
    }
}

viewReporte(){
    this.viewReport = true;
}
hideDialog(){
    this.viewReport = false;
}
showDeleteDialog(compra:any){
    this.compra = compra;
    console.log(this.compra);
    this.deleteProductDialog = true;
}
}
