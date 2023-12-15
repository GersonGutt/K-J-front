import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComprasProviderComponent } from './comprasprovider.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ComprasProviderComponent }
    ])],
    exports: [RouterModule]
})
export class ComprasProviderRoutingModule { }
