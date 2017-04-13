import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './database';
/*
  Generated class for the VPApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VPApi {

  constructor(public http: Http, private db: Database) {

  }

  isUpToDate() {
    //valider si l'appli a installée la dernière version 
    
  }

  getUpdate() {
    //obtenir le json via le http.post
  	
  }

  doUpdate() {
    //metre les données dans une variable json

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

}
