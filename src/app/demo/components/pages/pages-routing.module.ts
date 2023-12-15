import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'comprasprovider', loadChildren: () => import('./comprasprovider/comprasprovider.module').then(m => m.ComprasProviderModule) },
        { path: 'ventas', loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule) },
        { path: 'compras', loadChildren: () => import('./compras/compras.module').then(m => m.ComprasModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
