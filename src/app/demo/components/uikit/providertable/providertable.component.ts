import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { Producto } from 'src/app/demo/api/producto';
import { ProviderService } from 'src/app/demo/service/provider.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { isEmpty, map } from 'rxjs/operators';
import { Proveedor } from 'src/app/demo/api/Proveedor';
import { productoProveedor } from 'src/app/demo/api/productoProveedor';
import { CategoriaService } from 'src/app/demo/service/categoria.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './providertable.component.html',
    providers: [MessageService, ConfirmationService, CategoriaService]
})
export class ProviderTableComponent implements OnInit {

    productos: any[] = [];

    filteredCountries: any[] = [];

    selected: any[] = [];

    selectedProducts: Array<Producto> = [];

    optionRadioButton:string =  'Activos';

    numero:number = 0;

    providers: any[] = [];

    public product: Producto = {
        id: 0,
        nombre: '',
        cantidad: 0,
        precioUnitario: 0,
        precioTotal: 0,
        categoria_id: 0,
        estado: '',
        action: '',
        descripcion: '',
        categoria: {
        id: 0,
        nombre: ''
        }
     };

    expandedRows: expandedRows = {};

    isExpanded: boolean = false;

    productDialog: boolean = false;

    provider: Proveedor = {
        nombre: '',
        telefono: '',
        direccion: '',
        empresa: '',
        descuento: 0,
        estado: 1,
    };

    errors:any = {
        descuento: null,
        direccion: null,
        nombre: null,
        telefono: null,
        empresa: null
    }
    submitted: boolean = false;
    price?: number;
    quantity: number = 0;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private productService: ProductService, private providerService: ProviderService, private messageService: MessageService, private ConfirmationService: ConfirmationService) { }

    ngOnInit() {
       this.getProviders();
       this.getProducts();
    }

    getProviders():void{
        this.providerService.getProvidersWithProducts().subscribe(response =>{
            this.providers = response;
            console.log(response);
        });
    }

    getProvidersUnabled():void{
        this.providerService.getUnabledProviders().subscribe(response =>{
            this.providers = response;
            console.log(response);
        });
    }

    getProducts():void{
        this.productService.getProductos().then(response => {
            this.productos = response;
            console.log(response);
        });
    }
    expandAll() {
        if (!this.isExpanded) {
            this.providers.forEach(product => product && product.nombre ? this.expandedRows[product.nombre] = true : '');
            console.log("if");

        } else {
            this.expandedRows = {};
            console.log("else");
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    openNew() {
        this.unsetProvider();
        this.submitted = false;
        this.productDialog = true;
        if(this.selectedProducts.length>0){
            this.selectedProducts = [];
        }
    }

    hideDialog(){
        this.submitted = true;
        this.productDialog = false;
    }

    saveProvider(){
        console.log(this.provider);
        this.provider.descuento = this.quantity;
        this.provider.productos = this.selectedProducts as productoProveedor;
        if(this.provider.editar == true){
            console.log("hola")
            this.providerService.editProvider(this.provider).subscribe(json => {
                if(json.status == 'ok'){
                    console.log("entre");
                    console.log(json);
                    this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
                    this.hideDialog();
                    this.unsetProvider()
                    this.provider.editar = false;
                    }
                      else{
                        this.errors = json.errors;
                        this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${json.message}`, life: 3000});
                        console.log(json);
                    }
            });
        }
        else{
            console.log("guardar");
            this.providerService.saveProvider(this.provider).subscribe(json => {
                if(json.status == 'ok'){
                    this.providers.unshift(json.data);
                    console.log(json);
                    this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
                    this.hideDialog();
                    this.unsetProvider()
                        }
                      else{
                        this.errors = json.errors;
                        this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${json.message}`, life: 3000});
                      }
            });
        }
    }

    editProvider(provider: any){
        this.openNew();
        if(this.selectedProducts.length>0){
            this.selectedProducts = [];
        }
        this.provider = provider;
        provider.productos.forEach((producto: Producto) => {
            this.selectedProducts.push(producto);
        });
        this.provider.editar = true;
        console.log(this.provider);
    }


    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.productos.length; i++) {
            const producto = this.productos[i];
            if (producto.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(producto);
            }
        }

        this.filteredCountries = filtered;

    }

    onChange(product: any){
        var validated = 0;
        this.productos.forEach(producto => {
            if(producto.id == product.id){
                this.selectedProducts.forEach(productoValidated => {
                    if(productoValidated.id == product.id){
                        if(productoValidated.action == 'delete'){
                            productoValidated.action = 'update';
                            console.log(this.selectedProducts);
                        }
                       validated++;
                    }
                });
                if (validated > 0){
                        console.log("producto existente");
                }
                else{
                    if(this.provider.editar){
                        product.action = 'update';
                    }
                    this.selectedProducts.push(product);
                    console.log(this.selectedProducts);
                }
            }
        });
    }

    unsetProvider():void{
        this.provider = {
            nombre: '',
            telefono: '',
            direccion: '',
            empresa: '',
            descuento: 0,
            estado: 1,
        };
        this.errors = {
            descuento: null,
            direccion: null,
            nombre: null,
            telefono: null,
            empresa: null
        }
    }

    quitarItemEdit(item: Producto):void{
        //let index = this.selectedProducts.indexOf(item);
        //this.selectedProducts.splice(index, 1);
        item.action = 'delete';
        console.log(this.selectedProducts);
      }

      quitarItem(item: Producto):void{
        let index = this.selectedProducts.indexOf(item);
        this.selectedProducts.splice(index, 1);
      }

      sendProduct(producto:Producto):void{
        this.product = producto;
        this.product.show = true;
        this.product.action = '';
      }

      ChangeState(item: Proveedor):void{
        let estado = item.estado == 1 ? 'Inactivo' : 'Activo';
        console.log(item.estado);
        this.ConfirmationService.confirm({
            message: `Seguro/a de hacer ${estado} al proveedor?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                item.estado = item.estado == 1 ? 0 : 1;
                this.providerService.changeState(item).subscribe({
                    next: (json) => {
                        this.providers = this.providers.filter((val) => val.id !== item.id);
                        console.log(json);
                        this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `El Proveedor ahora esta ${estado}`, life: 3000});
                        },
                        error: (err) => {
                          if (err.status == 409){
                            this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000});
                            console.log(err);
                          }
                        }
                });
            }

      }
      )}
}
