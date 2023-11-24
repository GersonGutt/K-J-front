import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificacionesComponent } from './notificaciones.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: NotificacionesComponent }
	])],
	exports: [RouterModule]
})
export class PerfilRoutingModule { }