import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router , ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public  clientes: Cliente = new Cliente();
  public titulo: string ='crear cliente';

  constructor(private clienteServ: ClienteService ,
    private router: Router,
    private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();


  }
  public create(): void{
    console.log("clicked ")
    console.log("cliente", this.clientes)

    this.clienteServ.createCliente(this.clientes)
    .subscribe(arg => {
    this.router.navigate(['/clientes']);

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
        position: 'top-end',
        icon: 'success',
        title: `cliente ${this.clientes.nombre} se ha actualizado`,
        showConfirmButton: false,
        timer: 3500
      })
    })
  }

}
