import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Database } from './database';
import { Update, isUpToDate } from './model';
/*
  Generated class for the VPApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VPApi {

  private url = 'http://crowdsensing.univ-lr.fr/vp/parthenay/api/';
  constructor(private http: Http, private db: Database) {

  }

  isUpToDate(): Promise<isUpToDate>{
    //valider si l'appli est mis à jour
    var item = this.db.getVersion().then((versionN) => {
      //this.db.setVersion(versionN);
      return this.http
              .post(this.url+"isuptodate", "{\"version\":" + versionN + "}")
              .toPromise()
              .then(response => response.json() as isUpToDate)
              .catch(this.handleError);
            });
    return item;
   }

  getUpdate(): Promise<Update>{
    //obtenir le json via le http.post
    var item = this.db.getVersion().then((versionN) => {
      this.db.setVersion(versionN);
      return this.http
              .post(this.url+"update", "{\"version\":" + versionN + "}")
              .toPromise()
              .then(response => response.json() as Update)
              .catch(this.handleError);
          });
    return item;
  }

  doUpdate() {
    //metre les données dans une variable json
    this.getUpdate().then(response => {
      for (var name in response.json) {
        for (var key of response.json[name]) {
          let lang = name;
          this.http.get(key).subscribe(result => {
            var jsonAct = result.json();
            for (var value in jsonAct) {
              jsonAct._id = value + "_" + lang;
            }
            this.db.insertDoc(jsonAct).then((res) => {
            });
          });
        }
      }
    });
  }

  getDoc() {
    this.db.getDoc().then(data => {
     // console.log(data);
    });

    //this.db.getVersion();
  }

  /*
   isUpToDate: function() {
      var item = DBHandler.getVersion().then(function(versionN) {
        $rootScope.version = versionN;
        return $http.post("http://crowdsensing.univ-lr.fr/vp/montmorillon/api/" + "isuptodate/", "{\"version\":" + versionN + "}").then(function(data) {
          return data.data === "0";
        });
      });
      return item;
    },
    getUpdate: function() {

      return $http.post("http://crowdsensing.univ-lr.fr/vp/montmorillon/api/" + "update", "{\"version\":" + $rootScope.version + "}").then(function(data) {
        $rootScope.jsonUp = data.data;
        $rootScope.version = $rootScope.jsonUp.version;
        return (parseInt($rootScope.jsonUp.size) / 1000000.0);
      });
    },
    doUpdate: function() {

      angular.forEach($rootScope.jsonUp.json, function(value, name){
        angular.forEach($rootScope.jsonUp.json[name], function(value, key) {
          $http.get(value).then(function(data) {
            var jsonAct = data.data;
            for (var key in jsonAct) {
              jsonAct._id = key + "_" + name;
            }
            DBHandler.insertDoc(jsonAct).then(function() {

            });
          })
        })
      })
    },

    updateVersion: function(){
      DBHandler.insertDoc({
        _id: "version",
        version: $rootScope.version
      });
    }

  */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
