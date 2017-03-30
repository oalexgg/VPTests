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
var PiService = PiService_1 = (function () {
    function PiService(http, _jsonp) {
        this.http = http;
        this._jsonp = _jsonp;
        this.Pis = [];
        //url: string = "http://crowdsensing.univ-lr.fr/vp/montmorillon/sites/default/files/json/20170217122045/fr_Pis.json?callback=JSONP_CALLBACK";
        this.url = "data/fr_pis.json";
    }
    PiService.prototype.getPis = function () {
        return this.http.get(this.url)
            .map(function (res) { return res.json(); })
            .catch(PiService_1.handleError);
    };
    PiService.prototype.updatePis = function (Pi) {
        /*
        for (var i = 0; i < this.Pis.length; i++) {
            if (this.Pis[i].name === Pi.name) {
                this.Pis[i] = Pi;
            }
        }
        return Pi;
        */
    };
    PiService.prototype.addPis = function (Pi) {
        /*
        if (Pi.name) {
            this.Pis.push(Pi);
            return Pi;
        }
        */
    };
    PiService.prototype.deletePis = function (PiName) {
        /*
        let PiIndex: number;
        for (var i = 0; i < this.Pis.length; i++) {
            if (this.Pis[i].name === PiName) {
                PiIndex = i;
            }
        }
        if (PiIndex >= 0) this.Pis.splice(PiIndex, 1);
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
    PiService.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    return PiService;
}());
PiService = PiService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Jsonp])
], PiService);
export { PiService };
var PiService_1;
//# sourceMappingURL=pi-service.js.map