import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './contacto/lista/lista.component';
import { FormularioComponent } from './contacto/formulario/formulario.component';

const routes: Routes = [
  {path:"",component: ListaComponent},
  {path:"contacto/:id",component: FormularioComponent},
  {path:"nuevo",component: FormularioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
