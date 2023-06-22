import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {ClienteResult} from './clienteResult';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ModalServiceService } from './detalle/modal-service.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  clienteResult: ClienteResult;
  clienteSeleccionado:Cliente;

  constructor(private clienteServ: ClienteService,
    private sModal:ModalServiceService ) { }

  ngOnInit(): void {
    this.clienteServ.getPerfiles()
      .subscribe(arg => {
        debugger;
        this.clientes = arg;
        //let is a var of emac scrip 6
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
        (clienteResult => {
          if(clienteResult.error){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'error al eliminar al usuario',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }else{
            this.clientes = this.clientes.filter(cli => cli!==cliente)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

          }
        })
      }})

  }

  swAlert(){
    Swal.fire(
      'The Internet?',
      'That thing is still around?',
      'question'
    )  }

    showModal(cli : Cliente){
      this.clienteSeleccionado= cli;

      this.sModal.showModal();

    }
}
