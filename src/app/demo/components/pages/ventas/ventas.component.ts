import { Component } from '@angular/core';
import { Venta } from 'src/app/demo/api/venta';
import { VentaService } from 'src/app/demo/service/venta.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './ventas.component.html',
    providers: [MessageService],
    styles: [`
    .custom-input:disabled {
    opacity: 1; /* Cambia la opacidad para indicar que está deshabilitado */
    cursor: normal; /* Cambia el cursor para indicar que no se puede interactuar */
}
            `],
})
export class VentasComponent {

    Ventas: any;
    Venta:any;
    detalleVenta:any
    loading: boolean = true;
    FacturaView:boolean = false;
    viewReport:boolean = false;
    optionRadioButton:string =  'Activos';
    deleteProductDialog:boolean = false;
    dates:any = {
        fechaInicio: "" ,
        fechaFinal: ""
    };

    constructor(private ventaService: VentaService, private messageService: MessageService) { }

    ngOnInit() {
        this.getVentas();
 }

 getVentas(){
    this.ventaService.GetAllVentas().subscribe(response => {
        this.loading = false;
        this.Ventas = response;
        console.log(response);
    });
 }
 getVentasInactivas(){
    this.ventaService.GetAllInactivas().subscribe(response => {
        this.loading = false;
        this.Ventas = response;
        console.log(response);
    });
 }

 onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

viewDetail(venta:any){
this.FacturaView = true;
this.Venta = venta;
this.detalleVenta = Object.values(this.Venta.detalleVenta);
console.log(this.detalleVenta);
}

Deactivate():void{
    let estado = this.Venta.estado == 'A' ? 'Inactivo' : 'Activo';
    this.Venta.estado = this.Venta.estado == 'A' ? 'I' : 'A';
            this.ventaService.changeState(this.Venta).subscribe({
                next: (json) => {
                    this.Ventas = this.Ventas.filter((val:any) => val.id !== this.Venta.id);
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
    this.Venta = [];
}

showFactura(){
    this.ventaService.Factura(this.Venta).subscribe(json =>{
        const blob = new Blob([json], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    })
}

generarReporte(){
    const fecha1 = new Date(Date.parse(this.dates.fechaInicio));
    const fecha2 = new Date(Date.parse(this.dates.fechaFinal));
    if(fecha1 > fecha2){
        this.messageService.add({severity: 'error', summary: 'Resultado', detail: 'La fecha inicial no puede ser mayor a la final', life: 3000});
    }
    else{
        console.log(this.dates);
    this.ventaService.Report(this.dates).subscribe(json =>{
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
showDeleteDialog(venta:any){
    this.Venta = venta;
    console.log(this.Venta);
    this.deleteProductDialog = true;
}
}
