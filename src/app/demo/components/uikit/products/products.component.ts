import { estado } from './../../../api/estado';
import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { ProductService } from '../../../service/product.service';
import { Producto } from 'src/app/demo/api/producto';
import { FileUpload } from 'primeng/fileupload';
import { Categoria } from 'src/app/demo/api/Categoria';
import { CategoriaService } from '../../../service/categoria.service';
import { Proveedor } from 'src/app/demo/api/Proveedor';
import { ProviderService } from '../../../service/provider.service';
import { detalleProducto } from 'src/app/demo/api/detalleProducto';


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnChanges {
 disabled:boolean = true;
 submitted:boolean = false;
 categorias!: Categoria[];
 proveedores!: Proveedor[];
 proveedoresId!: Proveedor[];
 @Output() detalleAgregado = new EventEmitter<any>();
 @Output() productoAgregado = new EventEmitter<Producto>();
 @Input()
 public product: Producto = {
    id: 0,
    nombre: '',
    cantidad: 0,
    precioUnitario: 0,
    precioTotal: 0,
    categoria_id: 0,
    descripcion: '',
    estado: '',
    imagen: '',
    categoria: {
    id: 0,
    nombre: ''
    }
 };
 @Input() detalleModal: detalleProducto ={
    id: 0,
    reservado: 0,
    estado: 0,
    cantidad: 0,
    show: false
 }
 errors:any = {
    cantidad: null,
    nombre: null,
    descripcion: null,
    precioUnitario: null
}
 estados: any[] = [];
 selectedStatus:estado = {label:'Disponible', val: 'instock'};
     ngOnChanges() {
    this.getProvidersByProductoId();
    this.getCategorias();
    this.getProviders();
    let estado = this.product.estado;
    switch(estado){
        case 'S':
            this.estados = [{label: 'Disponible', val: 'instock'}];
        break;
        case 'O':
            this.estados = [{label: 'Sin existencias', val: 'outofstock'}];
        break;
        case 'L':
            this.estados =  [{label: 'Pocas existencias', val: 'lowstock'}];
        break;
                  }
                }

 constructor(private productService: ProductService, private messageService: MessageService, private CategoriaService: CategoriaService, private ProviderService:ProviderService) { }

 imagen?: File;
 imageLabel:string = 'Subir imagen';
 imageUrl?:String;

 hideProductDialog(){
     console.log("hola");
    this.product.show = false;
    this.product.action = '';
    this.submitted = false;
    this.Unsetproduct();
}

hideDetailDialog(){
  this.detalleModal.show = false;
  this.detalleModal.proveedor = {
    nombre: '',
    empresa: '',
    telefono: '',
    direccion: '',
    descuento: 0,
    estado: 0
}
}

getCategorias():void{
    this.CategoriaService.getCategorias().subscribe(response =>{
        this.categorias = response;
    });
}
getProviders(){
    this.ProviderService.getProviders().subscribe(response =>{
        this.proveedores = response;
    });
}

getProvidersByProductoId(){
    this.ProviderService.getProvidersByProductoId(this.detalleModal.producto!).subscribe(response =>{
        this.proveedoresId = response;
    });
}

seleccionarImagen(event:any){
    this.imagen = event.target.files[0];
    this.imageLabel = this.imagen!.name;
    console.log(this.imagen);
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    }

Unsetproduct():void{
    this.imagen = undefined;
    this.imageLabel = 'Subir imagen';
    this.imageUrl = undefined;
    this.errors = {
        cantidad: null,
        nombre: null,
        descripcion: null,
        precioUnitario: null
    }
}

CreateOrUpdate(){
//TODO:validar
    this.submitted = true;
    const unknownData: unknown = this.createFormData();
    const producto = unknownData as Producto;
    this.productService.CreateOrUpdate(producto).subscribe(json =>{
      //hay que hacer esto en el padre Object.assign(this.productos[this.indexSelected],json.producto);
      if(json.status == 'ok'){
      console.log(json);
      this.productoAgregado.emit(json.producto);
    this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
    this.product.show = false;
    this.Unsetproduct();
    this.imagen = undefined;
    }
    else{
      this.errors = json.errors;
      this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${json.message}`, life: 3000});
      console.log(json);
    }
  })

}

addNewDetails(){
    if(this.detalleModal.cantidad <= 0 || !this.detalleModal.proveedor){
        this.messageService.add({severity: 'error', summary: 'Resultado', detail: 'Porfavor llene todos los campos del formulario e ingrese una cantidad positiva', life: 3000});
    }
    else{
        this.productService.CreateNewDetail(this.detalleModal).subscribe({
            next: (json) =>{
              //hay que hacer esto en el padre Object.assign(this.productos[this.indexSelected],json.producto);
              console.log(json.detalle);
              this.detalleAgregado.emit(json.detalle);
            this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
            },
            error: (err) => {
              console.log(err);
              this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error}`, life: 3000});
              console.log('code status: '+err.status);
              console.log(err);
            }
          })
          this.detalleModal.show = false;
          this.detalleModal.cantidad = 0;
    }
}

createFormData(): FormData{
  let formData = new FormData();
  this.product.precioTotal = this.product.cantidad * this.product.precioUnitario;
  this.product.estado = 'S';
  if(this.product.cantidad <= 5){
    this.product.estado = 'L'
  }
  if(this.product.cantidad == 0){
    this.product.estado = 'O'
  }
  if(this.imagen == null){
    if(this.product.id == null){
    this.product.imagen == null;
    formData.append("imagen", 'null');
    }
  }else{
    if(this.product.id == 0){
        this.product.imagen = 'EmptyImage';
        console.log(this.product);
    }
  formData.append("imagen", this.imagen);
  }
  formData.append("producto", new Blob([JSON.stringify(this.product)], {type:"application/json"}))
  return formData;
  }

}
