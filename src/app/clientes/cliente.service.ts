import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Cliente } from './cliente';
import { ClienteResult, LstResultado } from './clienteResult';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router , ActivatedRoute} from '@angular/router';


@Injectable()
export class ClienteService{

  private  endPoint: string = 'http://localhost:8090/api/perfil/';

  constructor(private http: HttpClient, private router: Router){}

  getPerfiles(): Observable<any>{
    return this.http.get<any>(this.endPoint).pipe(

      catchError(e =>{
        this.router.navigate(['/inicio']);
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'error getting listing of clients',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        return throwError(e);
      })
    );
  }

  createCliente(clienes: Cliente): Observable<any>{

    let headers = this.headersPost  ();

    //pipe se utiliza para el catch y el catch detecta los status del back
    return this.http.post<any>(this.endPoint, clienes).pipe(
      catchError(e => {
        console.log("createCliente",e);
        Swal.fire({
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `${e.error.error}`,
          footer: '<a href="">ir al inicio</a>'
        })
        return throwError(e);
      })
    );
    }

  getClienteByid(id): Observable<any>{
    return this.http.get<any>(`${this.endPoint}${id}`).pipe(

      catchError(e =>{
        console.log("getbyid",e);
        this.router.navigate(['/clientes']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `${e.error.error}`,
          footer: '<a href="">ir al inicio</a>'
        })
        console.log(e);
      return throwError(e);
      })
    )
    ;}

  updateCliente(cliente: Cliente): Observable<any>{
    let headers = this.headersPost();

    return this.http.put<any>(`${this.endPoint}${cliente.id}`, cliente).pipe(
      catchError(e =>{
        console.log("updateCliente",e);
        this.router.navigate(['/clientes']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `${e.error.error}`,
          footer: '<a href="">ir al inicio</a>'
        })
        console.log(e);
      return throwError(e);
      })
    );
  }

    public headersPost() {
      let headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');
      headers.append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGZyZWRvLmxvcGV6IiwiaWF0IjoxNjcwNDMzMjUwLCJleHAiOjE2NzA0NjMyNTB9.uU3ztEqMwp2hxDyIl9A2vGmlSjJK0JqWvUqzh8BUI_PF-Or9rVBG70EdGSZPLHNaRVq7bxbYdRRVmw2_jemLLw')
      // headers.append('Authorization', localStorage.getItem('token') || '')
      return { headers };
    }

       delete(id: number) : Observable<any>{
      return this.http.delete<any>(`${this.endPoint}${id}`).pipe(

        catchError(e =>{
          console.log("delete",e);
          this.router.navigate(['/clientes']);
          Swal.fire({
            icon: 'error',
            title: `${e.error.mensaje}`,
            text: `${e.error.error}`,
            footer: '<a href="">ir al inicio</a>'
          })
          console.log(e);
        return throwError(e);
        })

    );}

}
