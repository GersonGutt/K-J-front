import { Component,OnInit } from '@angular/core';
import { Categoria } from 'src/app/demo/api/Categoria';
import { ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers:[ MessageService, ConfirmationService]
})
export class CategoriaComponent implements OnInit {


  catDialog: boolean = false;
  categorias!: Categoria[];
 public categoria: Categoria = {
     id :0,
    nombre: ''
  };
  soloLetras: RegExp = /^[A-Za-z]+$/;
  selectedCategorias!: Categoria[] | null;
  submitted: boolean = false;

    statuses!: any[];
    title: string = "";
    indexSelected : number = -1;

    constructor(private categoriaService: CategoriaService, private messageService: MessageService, private confirmationService: ConfirmationService,private cdr: ChangeDetectorRef) {}


  ngOnInit(): void{
  this.categoriaService.getCategorias().subscribe(
    response => {
      this.categorias = response as Categoria[];
      console.log(response);
    }
  );
}

unsetProduct():void{
  this.categoria= {
           id:0,
      nombre: ''

}
}



openNewCat() {
  this.unsetProduct();
  this.submitted = false;
  this.catDialog = true;
  this.title = "Agregar Categoria"
}

editCategoria(categoria: Categoria) {
  this.categoria = { ...categoria};
  this.catDialog = true;
  this.title = "Actualizar Categoria"
  this.indexSelected = this.categorias.indexOf(categoria);
}

deleteCategoria(categoria: Categoria) {
  this.confirmationService.confirm({
      message: 'Seguro/a eliminar esta categoria ' + categoria.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.categoriaService.delete(categoria).subscribe({
            next: () => {

              this.categorias = this.categorias.filter((val) => val.id !== categoria.id);
              this.unsetProduct();
              this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'categoria eliminada', life: 3000 });




          },
          error: (err) =>{
            this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'no se puede eliminar esta categoria', life: 3000 });
          }
        }
        );
      }
  });
}

hideDialogCat() {
  this.unsetProduct();
  this.catDialog = false;
  this.submitted = false;
}

validateInput() {
  const value = this.categoria.nombre;
  // Utiliza una expresión regular para verificar si el valor contiene números
  if (/[\d!@#$%^&*()_+{}|:"<>?~`]/.test(value)) {
    this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'No se permiten números ', life: 3000 });
  }


}


//metodo para guardar una categoria
    createCat ():void{
    this.submitted = true;
    if (this.categorias.some(c => c.nombre === this.categoria.nombre)) {
      this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'La categoría ya existe', life: 3000 });
      return;
    }

    if(this.categoria.nombre == ''){
      this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Digite una categoría', life: 3000 });
      return;
    }
    // const categoria = this.categoria;
    // console.log(categoria);
    this.categoriaService.create(this.categoria).subscribe({
      next: (json) => {
        if(json.status == "ok"){
          this.categorias.unshift(json.data);
          this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});

        }else{
          console.error('La solicitud no se completó correctamente. Código de estado:', json.status);
        }


    },
    error: (err) => {
      if (err.status == 409){
        this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000});

      }else {
        this.messageService.add({ severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000 });
      }
    console.log('code status: '+err.status);
    console.log(err.message);
    }
    });
    this.cdr.detectChanges();
    this.catDialog = false;
    this.unsetProduct();
    }

updateCat():void {
  this.submitted = true;
  if (this.categorias.some(c => c.nombre === this.categoria.nombre)) {
    this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'La categoría ya existe', life: 3000 });
    return;
  }
 const categoria = this.categoria;
  this.categoriaService.update(categoria).subscribe({

  next: (json) =>{
    Object.assign(this.categorias[this.indexSelected],json.data);

  this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
  },
  error: (err) => {
    this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000});
    console.log('code status: '+err.status);
    console.log(err.message);
  }
})
this.catDialog = false;
this.unsetProduct();
}

getEventValue($event:any):string{
return $event.target.value;
}



}
