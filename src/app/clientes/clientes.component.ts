import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {ClienteResult} from './clienteResult';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  clienteResult: ClienteResult;

  constructor(private clienteServ: ClienteService ) { }

  ngOnInit(): void {
    this.clienteServ.getPerfiles()
      .subscribe(arg => {
        this.clienteResult = arg;
        this.clientes = this.clienteResult.lstResultado;
        console.log(arg);
      });


  }

  deleteCliente(cliente: Cliente): void{

    Swal.fire({
      title: 'Are you sure?',
      text: `¿seguro desse eliminar al cliente ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServ.delete(cliente.id).subscribe
        (response => {
          this.clientes = this.clientes.filter(cli => cli!==cliente)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })

  }

  swAlert(){
    Swal.fire(
      'The Internet?',
      'That thing is still around?',
      'question'
    )  }

}
