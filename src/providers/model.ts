import {Injectable} from '@angular/core';


@Injectable()
export class Parcours {

  constructor(
    public id: number,
    public title: string,
    public image: Array<string>,
    public icone: string,
    public pi: Array<PI>,
    public description_parcours: string) { }
}

export class PI {
  constructor(
    public id: number,
    public title: string,
    public longitude_latitude: string[],
    public description: string,
    public adresse: string,
    public horaire: string,
    public tarif: string,
    public telephone: string,
    public site_internet: string,
    public email: string,
    public anecdote: string,
    public image: string[],
    public image_collection: string[]) { }
}

export class ParcoursMoment {

  constructor(
    public id: number,
    public title: string,
    public image: Array<string>,
    public icone: string) { }
}