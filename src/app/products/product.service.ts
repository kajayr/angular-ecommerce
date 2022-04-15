import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IProducts } from './products';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
public API_URL: string = "assets/products.json";
  constructor( private http:HttpClient) { }
  getProducts():Observable<IProducts[]>{
   return this.http.get<IProducts[]>(this.API_URL).pipe(
     tap(data => console.log("All Data " + JSON.stringify(data))),
     catchError(this.handleError)
   )
  }
  private handleError(err: HttpErrorResponse){
     let errorMessage = "";

     if(err.error instanceof ErrorEvent){
       errorMessage = "An error occurred: " + err.error.message;
     } else{
       errorMessage = "Server return code: " + err.status + ", error message is: " + err.message;
     }
     console.log(err.message);
     return throwError(() => new Error(errorMessage));
  }

}
