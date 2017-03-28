import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {PI} from './model';

@Injectable()
export class PiService {
    Pis: Array<PI> = [];
    //url: string = "http://crowdsensing.univ-lr.fr/vp/montmorillon/sites/default/files/json/20170217122045/fr_Pis.json?callback=JSONP_CALLBACK";
    url: string = "data/fr_pis.json";

    constructor(public http: Http, private _jsonp: Jsonp) {
    }

    getPis(){
        return this.http.get(this.url)
            .map((res: Response) => <PI>res.json())
            .catch(PiService.handleError);
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
/*
    getWorkouts(){
        return this.http.get(this.collectionsUrl + '/workouts' + this.params)
            .map((res:Response) => <WorkoutPlan[]>res.json())
            .catch(HomeService.handleError);
    }

    getWorkout(workoutName: string){
        return this.http.get(this.collectionsUrl + '/workouts/'+ workoutName  + this.params)
            .map((res: Response) => <WorkoutPlan>res.json())
            .catch(HomeService.handleError);
    }

    addWorkout(workout: WorkoutPlan){
        if (workout.name) {
            this.workouts.push(workout);
            return workout;
        }
    }

    updateWorkout(workout: WorkoutPlan){
        for (var i = 0; i < this.workouts.length; i++) {
            if (this.workouts[i].name === workout.name) {
                this.workouts[i] = workout;
                break;
            }
        }
    }
*/
    static handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
