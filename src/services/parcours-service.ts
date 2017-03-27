import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Parcours} from './model';

@Injectable()
export class ParcourService {
    Parcours: Array<Parcours> = [];
    //url: string = "http://crowdsensing.univ-lr.fr/vp/montmorillon/sites/default/files/json/20170217122045/fr_parcours.json?callback=JSONP_CALLBACK";
    url: string = "data/fr_parcours.json";

    constructor(public http: Http, private _jsonp: Jsonp) {
    }

    getParcours(){
        return this.http.get(this.url)
            .map((res: Response) => <Parcours>res.json())
            .catch(ParcourService.handleError);
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
