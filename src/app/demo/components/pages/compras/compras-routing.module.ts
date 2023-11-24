import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComprasComponent } from './compras.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ComprasComponent }
    ])],
    exports: [RouterModule]
})
export class ComprasRoutingModule { }
