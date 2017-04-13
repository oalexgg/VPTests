import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
	public _DB: any;
   	private success: boolean = true;
   	public version: any;
   	private item: any;
   	public jsonUp: any;

  constructor(public http: Http) {
  	this.initialiseDB();
  }

  initialiseDB()
   {
      this._DB = new PouchDB('VPC');
   }

   getVersion() {
   	this._DB.get('version')
	   	.then((doc) => {
	   		this.version =  doc;
	   		console.log(this.version);
	   	})
	   	.catch((err) => {
	   		this.version =  0;
	   	});
   }

   setVersion(version) {
   		this.version = version;
   }



}
