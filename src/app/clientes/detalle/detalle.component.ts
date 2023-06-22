import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalServiceService } from './modal-service.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  modelSelected:'';
  progress: number=0;

  private fotoSelected: File;

  constructor(private cliServ: ClienteService,
    private actRoute: ActivatedRoute,
    public sModal: ModalServiceService) { }

  ngOnInit(): void {
  }

  pictureSelected(event){
    this.fotoSelected= event.target.files[0];
    console.log("foto selectded", this.fotoSelected);
    console.log("foto model", this.modelSelected);

    if(this.fotoSelected.type.indexOf('image')<0){

      this.clearData();
      Swal.fire({
        icon: 'error',
        title: `Error al seleccionar imagen`,
        text: `Archivo debe ser de tipo imagen`,
        footer: '<a href="">ir al inicio</a>',
      });


    }

  }

  upload(){
    if(this.fotoSelected!=null){
      this.cliServ.uploadFile(this.fotoSelected, this.cliente.id).subscribe(
        event => {

          if(event.type === HttpEventType.UploadProgress){
            this.progress = Math.round(event.loaded / event.total)*100;
          }else if(event.type === HttpEventType.Response){
            let response:any = event.body
            this.cliente = response.perfil as Cliente

            Swal.fire({
              icon: 'success',
              title: `cliente ${this.cliente.foto} se ha actualizado`,
              showConfirmButton: false,
              timer: 3500
            })
          }



        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: `Error al enviar foto`,
        text: `Foto no existe`,
        footer: '<a href="">ir al inicio</a>',
      });
    }
  }

  closeModal(){
    this.sModal.closeModal();
    this.clearData();
  }

  clearData(){
    this.fotoSelected=null;
      this.modelSelected=null;
      this.progress =0;

  }





}
