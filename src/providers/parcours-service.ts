import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {TranslateService} from 'ng2-translate';
import {Parcours} from './model';

import { Database } from "./database";

@Injectable()
export class ParcourService {
    Parcours: Array<Parcours> = [];
    //url: string = "http://crowdsensing.univ-lr.fr/vp/montmorillon/sites/default/files/json/20170217122045/fr_parcours.json?callback=JSONP_CALLBACK";
    lang: string = "fr";

    constructor(
      public http: Http, private _jsonp: Jsonp,
       private translate: TranslateService,
        private db: Database
     ){
    }

    getParcours(){
        if(this.translate.currentLang === "en"){
            this.lang = "en-en";
        }
        else {
            this.lang = "fr";
        }
        var item = this.db._DB.get("parcours_" + this.lang).then((data) => {
          return data;
        });
        return item;
    }

    updateParcours(Parcour: Parcours){
    	/*
        for (var i = 0; i < this.Parcours.length; i++) {
            if (this.Parcours[i].name === Parcour.name) {
                this.Parcours[i] = Parcour;
            }
        }
        return Parcour;
        */
    }

    addParcours(Parcour: Parcours){
    	/*
        if (Parcour.name) {
            this.Parcours.push(Parcour);
            return Parcour;
        }
        */
    }

    deleteParcours(ParcourName: string){
    	/*
        let ParcourIndex: number;
        for (var i = 0; i < this.Parcours.length; i++) {
            if (this.Parcours[i].name === ParcourName) {
                ParcourIndex = i;
            }
        }
        if (ParcourIndex >= 0) this.Parcours.splice(ParcourIndex, 1);
    */
    }

    static handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
