import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor() { }

  public  modal: boolean= false;

  _isUpload: EventEmitter<any> = new EventEmitter();

  get isUpload():EventEmitter<any>{
    return this._isUpload;
  }

  showModal(){
    this.modal =true;
  }

  closeModal(){
    this.modal =false;
  }
}
