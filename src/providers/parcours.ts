import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/*
  Generated class for the Parcours provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Parcours {
	

  constructor(private http: Http) {
         var obj;
         this.getJSON().subscribe(data => obj=data, error => console.log(error));
    }

    public getJSON(): Observable<any> {
         return this.http.get("/data/fr_parcours.json")
                         .map((res:any) => res.json());

     }

}
