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
var Parcours = (function () {
    function Parcours(id, title, image, icone, pi, description_parcours) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.icone = icone;
        this.pi = pi;
        this.description_parcours = description_parcours;
    }
    return Parcours;
}());
Parcours = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Number, String, Array, String, Array, String])
], Parcours);
export { Parcours };
var PI = (function () {
    function PI(id, title, longitude_latitude, description, adresse, horaire, tarif, telephone, site_internet, email, anecdote, image, image_collection) {
        this.id = id;
        this.title = title;
        this.longitude_latitude = longitude_latitude;
        this.description = description;
        this.adresse = adresse;
        this.horaire = horaire;
        this.tarif = tarif;
        this.telephone = telephone;
        this.site_internet = site_internet;
        this.email = email;
        this.anecdote = anecdote;
        this.image = image;
        this.image_collection = image_collection;
    }
    return PI;
}());
export { PI };
//# sourceMappingURL=model.js.map