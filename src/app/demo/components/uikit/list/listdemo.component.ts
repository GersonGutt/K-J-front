import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import { detalleProducto } from 'src/app/demo/api/detalleProducto';
import { Product } from 'src/app/demo/api/product';
import { Producto } from 'src/app/demo/api/producto';
import { ProductService } from 'src/app/demo/service/product.service';
import { Venta } from 'src/app/demo/api/venta';
import { VentaService } from '../../../service/venta.service';

@Component({
    templateUrl: './listdemo.component.html',
    styles: [`
    .image-container {
      width: 9rem;
      height: 17rem;
    }
    .topbar-badge {
        position: absolute;
        top: 3px;
        left: 40px;
        background-color: red;
        color: white;
        padding: 5px;
        border-radius: 50%;
}
.text-rightt {
  text-align: right;
}
`],
providers: [MessageService, ConfirmationService]
})
export class ListDemoComponent implements OnInit {

    products: Producto[] = [];

    sortOptions: SelectItem[] = [];

    selectedDetail: detalleProducto[] = [];

    cart: Venta = {
        cliente: "",
        direccion: "",
        dui: "",
        fechaVenta: new Date(),
        total: 0,
        productos: []
    }

    product: Producto = {
        id: 0,
        nombre: "",
        cantidad: 0,
        precioUnitario: 0,
        precioTotal: 0,
        categoria_id: 0,
        estado: '',
        descripcion: '',
        categoria: {
            id: 0,
            nombre: ''
        }
    }

    sortOrder: number = 0;

    sortField: string = '';

    nuevaFecha:string = '';

    addProductModal: boolean = false;

    cartView: boolean = false;

    errors:any = {
        direccion: null,
        cliente: null,
        dui: null,
    }
    constructor(private productService: ProductService, private messageService: MessageService, private VentaService: VentaService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.productService.getProductosWithDetail().then(data => this.products = data).then(json => console.log(json));
        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    openNew(producto: Producto){
        this.product = producto;
        this.addProductModal = true;
    }

    hideView(){
        this.addProductModal = false;
        this.selectedDetail = [];
        this.cartView = false;
    }
    addToCart(){
        console.log(this.cart.productos.findIndex(item => item.id === this.selectedDetail[0].producto?.id));
        if(this.cart.productos.findIndex(item => item.id === this.selectedDetail[0].producto?.id) === -1){
            var producto = this.selectedDetail[0].producto!
            producto.detalle_producto = [];
            producto.detalle_producto = producto.detalle_producto!.concat(this.selectedDetail);
            producto.detalle_producto.forEach(detail => {
                detail.producto = undefined;
            });
            this.cart.productos = this.cart.productos.concat(producto);
            producto.cantidad = producto.cantidad - this.selectedDetail.length;
        }else{
            var index = this.cart.productos.findIndex(item => item.id === this.selectedDetail[0].producto?.id);
            this.selectedDetail.forEach(detail => {
                detail.producto = undefined;
            });
            this.cart.productos[index].detalle_producto = this.cart.productos[index].detalle_producto?.concat(this.selectedDetail);
            this.cart.productos[index].cantidad = this.cart.productos[index].cantidad - this.selectedDetail.length;
        }
        this.selectedDetail.forEach(detail => {
        this.product.detalle_producto = this.product.detalle_producto?.filter(val => val.id !== detail.id)
        });
        this.cart.total = this.cart.total + this.product.precioUnitario * this.selectedDetail.length;
        this.product.cantidad = this.product.cantidad - this.selectedDetail.length;
        this.product.estado = 'S';
        if(this.product.cantidad <= 5){
          this.product.estado = 'L'
        }
        if(this.product.cantidad == 0){
          this.product.estado = 'O'
        }
        this.selectedDetail = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Añadido al carrito', life: 3000 });
        this.addProductModal = false;
        console.log(this.cart);
    }

    newCartView(){
        this.cartView = true;
    }

    deleteItem(producto: Producto){
       var index = this.cart.productos.findIndex(item => item.id === producto.id);
       var i = this.products.findIndex(item => item.id == producto.id)
       producto.detalle_producto!.forEach(detail => {
        this.products[i].detalle_producto = this.products[i].detalle_producto?.concat(detail);
       });
       var cantidad = this.products[i].cantidad + producto.detalle_producto?.length!;
       this.products[i].cantidad = cantidad;
       var estado = 'S';
       if(cantidad <=5){
        estado = 'L';
       }
       if(cantidad == 0){
        estado = 'O';
       }
       this.cart.total = this.cart.total - (producto.precioUnitario * producto.detalle_producto?.length!);
       this.cart.productos[index].cantidad = this.cart.productos[index].cantidad + producto.detalle_producto?.length!;
       this.products[i].estado = estado;
       producto.detalle_producto!.forEach(detail => {
        detail.producto = producto;
       });
       this.cart.productos.splice(index,1);
    }

    viewReporte(){
        this.productService.Report().subscribe(json =>{
            const blob = new Blob([json], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        })
    }

    createVenta(){
        console.log("hola");
        this.VentaService.Create(this.cart).subscribe(json => {
            if(json.status == 'ok'){
                console.log("entre");
                console.log(json);
                this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
                this.confirmationService.confirm({
                    message: 'Venta realizada con exito, ¿deseas ver la factura?',
                    header: 'Confirmar',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.VentaService.Factura(json.data).subscribe(json =>{
                            const blob = new Blob([json], { type: 'application/pdf' });
                            const url = window.URL.createObjectURL(blob);
                            window.open(url, '_blank');
                        })
                    }
                });
                this.cartView = false
                this.cart = {
                    cliente: "",
                    direccion: "",
                    dui: "",
                    fechaVenta: new Date(),
                    total: 0,
                    productos: []
                }
                }
                  else{
                    this.errors = json.errors;
                    this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${json.message}`, life: 3000});
                    console.log(json);
                }
        });
    }
}
