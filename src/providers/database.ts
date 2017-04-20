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
    public data: any;
		public isMaj: boolean;

  constructor(public http: Http) {
  	this.initialiseDB();
  }

  initialiseDB()
   {
      this._DB = new PouchDB('VPC');
   }

   getVersion() {
   	var item = this._DB.get("version").then((doc) => {
                return doc.version;
            }).catch(function(err) {
                return 0;
            });
            return item;
   }

   setVersion(version) {
   		this.version = version;
   }

	 getV() {
		 return this.version;
	 }

   insertDoc(doc) {
              return this._DB.get(doc._id).then((origDoc) => {
                doc._rev = origDoc._rev;
                return this._DB.put(doc);
              }).catch((err) => {
                if (err.status === 409) {
                  return this.insertDoc(doc);
                } else { // new doc
                  return this._DB.put(doc);
                }
              });
    }
    getDoc() {
      if (this.data) {
    return Promise.resolve(this.data);
  }

  return new Promise(resolve => {

    this._DB.allDocs({

      include_docs: true

    }).then((result) => {

       console.log(result);
      this.data = [];

      let docs = result.rows.map((row) => {
        this.data.push(row.doc);
        //console.log(row);
      });

      resolve(this.data);

      this._DB.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        this.handleChange(change);
      });

    }).catch((error) => {

      console.log(error);

    });

  });
 }
 handleChange(change){

  }

	_isMaj(){
		return this.isMaj;
	}

	setIsMaj(isMaj) {
		this.isMaj = isMaj;
	}

updateVersion(version){
      this.insertDoc({
        _id: "version",
        version: version
      });
    }

}
