import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProviderTableComponent } from './providertable.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProviderTableComponent }
	])],
	exports: [RouterModule]
})
export class ProviderTableRoutingModule { }
