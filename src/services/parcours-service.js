var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
var ParcourService = ParcourService_1 = (function () {
    function ParcourService(http, _jsonp) {
        this.http = http;
        this._jsonp = _jsonp;
        this.Parcours = [];
        //url: string = "http://crowdsensing.univ-lr.fr/vp/montmorillon/sites/default/files/json/20170217122045/fr_parcours.json?callback=JSONP_CALLBACK";
        this.url = "data/fr_parcours.json";
    }
    ParcourService.prototype.getParcours = function () {
        return this.http.get(this.url)
            .map(function (res) { return res.json(); })
            .catch(ParcourService_1.handleError);
    };
    ParcourService.prototype.updateParcours = function (Parcour) {
        /*
        for (var i = 0; i < this.Parcours.length; i++) {
            if (this.Parcours[i].name === Parcour.name) {
                this.Parcours[i] = Parcour;
            }
        }
        return Parcour;
        */
    };
    ParcourService.prototype.addParcours = function (Parcour) {
        /*
        if (Parcour.name) {
            this.Parcours.push(Parcour);
            return Parcour;
        }
        */
    };
    ParcourService.prototype.deleteParcours = function (ParcourName) {
        /*
        let ParcourIndex: number;
        for (var i = 0; i < this.Parcours.length; i++) {
            if (this.Parcours[i].name === ParcourName) {
                ParcourIndex = i;
            }
        }
        if (ParcourIndex >= 0) this.Parcours.splice(ParcourIndex, 1);
    */
    };
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
    ParcourService.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    return ParcourService;
}());
ParcourService = ParcourService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Jsonp])
], ParcourService);
export { ParcourService };
var ParcourService_1;
//# sourceMappingURL=parcours-service.js.map