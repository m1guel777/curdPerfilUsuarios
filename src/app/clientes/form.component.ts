import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router , ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {ClienteResult} from './clienteResult';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public  clientes: Cliente={
    id: 0,
    nombre: '',
    descripcion: '',
    activo: true,
    fecha_registro: '',
    fecha_modificacion: ''
  }
  public titulo: string ='crear cliente';
  clienteResult: any;


  constructor(private clienteServ: ClienteService ,
    private router: Router,
    private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }
  public create(): void{
    this.clienteServ.createCliente(this.clientes)
    .subscribe(arg => {
      this.clienteResult = arg;
      console.log("mensaje crear", this.clienteResult)
      this.router.navigate(['/clientes']);

      Swal.fire({
        icon: 'success',
        title: `se ha creado el cliente ${this.clienteResult.perfil.nombre} correctamente`,
        showConfirmButton: false,
        timer: 3500
      })

      // if(this.clienteResult.error){
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Error al crear usuario',
      //     text: `${this.clienteResult.mensaje}`,
      //     footer: '<a href="">ir al inicio</a>'
      //   })
      // }else{
      //   Swal.fire({
      //     icon: 'success',
      //     title: `se ha creado el cliente ${this.clientes.nombre} correctamente`,
      //     showConfirmButton: false,
      //     timer: 3500
      //   })
      // }


    })
  }

  cargarCliente() : void{
    this.actRouter.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteServ.getClienteByid(id).subscribe(cliente => this.clientes = cliente)
      }
    })
  }

  updateCliente(): void {
    this.clienteServ.updateCliente(this.clientes)
    .subscribe( cliente =>{
      this.router.navigate(['/clientes'])
      Swal.fire({
        icon: 'success',
        title: `cliente ${this.clientes.nombre} se ha actualizado`,
        showConfirmButton: false,
        timer: 3500
      })
    })
  }

}
