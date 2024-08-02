import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';

const routes: Routes = [
  { path : 'registrar', component : RegistrarComponent},
  { path : 'buscar', component : BuscarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
