import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Database } from "./database";

import {TranslateService} from 'ng2-translate';
import {PI} from './model';

@Injectable()
export class PiService {
    Pis: Array<PI> = [];
    //url: string = "http://crowdsensing.univ-lr.fr/vp/montmorillon/sites/default/files/json/20170217122045/fr_Pis.json?callback=JSONP_CALLBACK";
    lang: string = "fr";

    constructor(
      public http: Http, private _jsonp: Jsonp,
       public translate: TranslateService,
        private db: Database
      ) {
    }

    getPis(){
        if(this.translate.currentLang === "en"){
            this.lang = "en-en";
        }
        else {
            this.lang = "fr";
        }

        var item = this.db._DB.get("lespis_" + this.lang).then((data) => {
          return data;
        });
        return item;
    }

    updatePis(Pi: PI){
    	/*
        for (var i = 0; i < this.Pis.length; i++) {
            if (this.Pis[i].name === Pi.name) {
                this.Pis[i] = Pi;
            }
        }
        return Pi;
        */
    }

    addPis(Pi: PI){
    	/*
        if (Pi.name) {
            this.Pis.push(Pi);
            return Pi;
        }
        */
    }

    deletePis(PiName: string){
    	/*
        let PiIndex: number;
        for (var i = 0; i < this.Pis.length; i++) {
            if (this.Pis[i].name === PiName) {
                PiIndex = i;
            }
        }
        if (PiIndex >= 0) this.Pis.splice(PiIndex, 1);
    */
    }

    static handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
