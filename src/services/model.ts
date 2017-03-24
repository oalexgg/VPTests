import {Injectable} from '@angular/core';


@Injectable()
export class Parcours {

  constructor(
    public id: number,
    public title: string,
    public image: string[],
    public icone: string,
    public description_parcours: string,
    public videos?: Array<string>) { }
}

export class PI {
  constructor(
    public parcours: Parcours,
    public runningFor: number,
    public timeRemaining: number,
    public workoutTimeRemaining: number) { }
}

