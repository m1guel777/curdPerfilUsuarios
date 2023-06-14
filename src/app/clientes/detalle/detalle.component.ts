import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente: Cliente;

  private fotoSelected: File;

  constructor(private cliServ: ClienteService,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params =>{
      let id:number = +params.get('id');

      debugger;
      if(id){
        this.cliServ.getClienteByid(id).subscribe(cli =>{
          this.cliente= cli;
        });
      }

    })
  }

  pictureSelected(event){
    debugger;
    this.fotoSelected= event.target.files[0];
    console.log("foto selectded ", this.fotoSelected);

  }

  upload(){
    this.cliServ.uploadFile(this.fotoSelected, this.cliente.id).subscribe(
      cli => {
        this.cliente= cli;

        Swal.fire({
          icon: 'success',
          title: `cliente ${this.cliente.nombre} se ha actualizado`,
          showConfirmButton: false,
          timer: 3500
        })      }
    );
  }

}
