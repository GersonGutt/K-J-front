import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/demo/api/producto';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { detalleProducto } from 'src/app/demo/api/detalleProducto';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/api/Categoria';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService, CategoriaService],
    styles: [`
    .topbar-badge {
        position: absolute;
        top: 3px;
        left: 40px;
        background-color: red;
        color: white;
        padding: 5px;
        border-radius: 50%;
}
    `]
})
export class CrudComponent implements OnInit {

    detalleModal: detalleProducto ={
        id: 0,
        reservado: 0,
        estado: 0,
        cantidad: 0,
        show: false,
        proveedor: {
            nombre: '',
            empresa: '',
            telefono: '',
            direccion: '',
            descuento: 0,
            estado: 0
        }
    }

    categorias!: Categoria[];
    categoria: Categoria ={
        id: 0,
        nombre : ''
    };

    detalle: detalleProducto[] = [];

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteDetailDialog: boolean = false;

    products: Producto[] = [];

    public product: Producto = {
        id: 0,
        nombre: '',
        cantidad: 0,
        precioUnitario: 0,
        precioTotal: 0,
        categoria_id: 0,
        show: false,
        estado: '',
        imagen: '',
        descripcion: '',
        categoria: {
        id: 0,
        nombre: ''
        }
     };

    selectedProducts: Producto[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService,  private categoriaService: CategoriaService) { }

    ngOnInit() {
        this.productService.getProductos().then(data => this.products = data);
        this.getDetalle();
    }

    getDetalle():void{
        this.productService.getDetalle().subscribe(response => {
            this.detalle = response;
            console.log(response);
        });
    }

    addnewsdetails():void{

    }

    openNew() {
        this.unsetProduct();
        this.submitted = false;
        this.productDialog = true;
    }

    openNewDetail(producto: Producto) {
       this.detalleModal.producto = producto;
       this.detalleModal = { ...this.detalleModal, show: true };
       this.detalleModal.show = true;
        console.log(this.detalleModal);
    }

    viewDetalle(detalle:any){
        console.log(detalle);
    }

    editProduct(product: Producto) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Producto) {
        this.deleteProductDialog = true;
        this.product = product;
        console.log (this.product);
    }

    deleteDetail(detalle: detalleProducto) {
        this.deleteDetailDialog = true;
        this.detalleModal = detalle;
        console.log (this.detalleModal);
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        console.log(this.product);
        this.productService.Delete(this.product).subscribe({
            next: (json) =>{
                this.products = this.products.filter(val => val.id !== json.data.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto Eliminado', life: 3000 });
                console.log(json);
            },


            error: (err) => {
              console.log(err);
              this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error}`, life: 3000});
              console.log('code status: '+err.status);
              console.log(err);
            }
          })

        this.unsetProduct();
    }

    confirmDeleteDetail() {
        this.deleteDetailDialog = false;
        this.productService.DeleteDetail(this.detalleModal).subscribe({
            next: (json) =>{
                const index = this.products.findIndex((producto) => producto.id === json.producto_id);
                this.products[index].cantidad = json.producto.cantidad;
                this.products[index].estado = json.producto.estado;
                this.products[index].detalle_producto = this.products[index].detalle_producto!.filter(val => val.id !== json.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto Eliminado', life: 3000 });
                console.log(json);
            },


            error: (err) => {
              console.log(err);
              this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error}`, life: 3000});
              console.log('code status: '+err.status);
              console.log(err);
            }
          })

        this.unsetProduct();
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    sendProduct(producto:Producto):void{
        this.product = producto;
        this.product.action = 'update';
        this.product.show = true;
      }

      sendNewProduct():void{
        this.unsetProduct();
        this.product.action = 'create';
        this.product.show = true;
      }

      actualizarProductos(nuevoProducto: Producto) {
        if(nuevoProducto.action == 'update'){
            const index = this.products.findIndex((producto) => producto.id === nuevoProducto.id);
          if (index !== -1) {
                this.products[index] = nuevoProducto;
                  }
        }else{
            this.products.unshift(nuevoProducto);
        }
            }

            actualizarDetalles(detail: any) {
                    const index = this.products.findIndex((producto) => producto.id === detail[0].producto_id);
                  if (index !== -1) {
                        this.products[index].detalle_producto = this.products[index].detalle_producto!.concat(detail);
                        this.products[index].cantidad = this.products[index].cantidad + detail.length;
                        this.products[index].estado = 'S';
                        if(this.products[index].cantidad <=5){
                            this.products[index].estado = 'L';
                        }
                        if(this.products[index].cantidad == 0){
                            this.products[index].estado = 'O';
                        }
                        console.log(this.products);
                          }
                }
   /* saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto Actualizado', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto Agregado', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.unsetProduct()
        }
    } */

  /*  findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    } */

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    unsetProduct():void{
        this.product = {
            id: 0,
            nombre: '',
            cantidad: 0,
            precioUnitario: 0,
            precioTotal: 0,
            categoria_id: 0,
            estado: '',
            descripcion: '',
            categoria:{
                id: 0,
                nombre: ''
            }
    }
}

getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      response => {
      this.categorias = response as Categoria[];
      }
      )

    }

}
