import { ElementRef } from '@angular/core';
import { ViewController, NavParams, Slides, Content, Platform } from 'ionic-angular';
import { Photo } from '../interfaces/photo-interface';
export declare class GalleryModal {
    private viewCtrl;
    private element;
    private platform;
    slider: Slides;
    content: Content;
    photos: Photo[];
    private sliderDisabled;
    private initialSlide;
    private currentSlide;
    private sliderLoaded;
    private closeIcon;
    private parentSubject;
    constructor(viewCtrl: ViewController, params: NavParams, element: ElementRef, platform: Platform);
    dismiss(): void;
    private resize(event);
    private orientationChange(event);
    private ionViewDidEnter();
    private disableScroll(event);
    private enableScroll(event);
}
