import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule , Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { ClienteService } from './clientes/cliente.service';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './clientes/form.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { DetalleComponent } from './clientes/detalle/detalle.component'

registerLocaleData(localeES, 'es');

//path vacio es la pag principal y los demas se mapean al componente
const routes: Routes =[
{path:'', redirectTo: '/inicio', pathMatch:'full' },
{path:'directivas', component:DirectivaComponent },
{path:'clientes', component:ClientesComponent },
{path:'inicio', component:InicioComponent},
{path:'clientes/formulario', component:FormComponent},
{path:'clientes/formulario/:id', component:FormComponent},
//{path:'clientes/detalle/:id', component:DetalleComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    InicioComponent,
    FormComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
