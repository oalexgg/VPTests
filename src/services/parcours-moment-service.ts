import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ParcoursMoment} from './model';

@Injectable()
export class ParcourMomentService {
    Parcours: Array<ParcoursMoment> = [];
    //url: string = "http://crowdsensing.univ-lr.fr/vp/montmorillon/sites/default/files/json/20170217122045/fr_parcours.json?callback=JSONP_CALLBACK";
    url: string = "assets/fr_moment.json";

    constructor(public http: Http, private _jsonp: Jsonp) {
    }

    getParcoursMoment(){
        return this.http.get(this.url)
            .map((res: Response) => <ParcoursMoment>res.json())
            .catch(ParcourMomentService.handleError);
    }

    updateParcours(Parcour: ParcoursMoment){
    	/*
        for (var i = 0; i < this.Parcours.length; i++) {
            if (this.Parcours[i].name === Parcour.name) {
                this.Parcours[i] = Parcour;
            }
        }
        return Parcour;
        */
    }

    addParcours(Parcour: ParcoursMoment){
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
