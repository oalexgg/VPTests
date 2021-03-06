import { Component, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { ViewController, NavParams, Slides, Content, Platform, NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Photo } from '../interfaces/photo-interface';
import { Subject }    from 'rxjs/Subject';
import {TranslateService} from 'ng2-translate';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';

import { GalleryService } from '../../providers/gallery-service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'gallery-modal',
  templateUrl: 'gallery-modal.html',
   providers: [File]
})
export class GalleryModal {
  @ViewChild('slider') slider: Slides;
  @ViewChild('content') content: Content;

  public photos: Photo[];
  private sliderDisabled: boolean = false;
  private initialSlide: number = 0;
  private currentSlide: number = 0;
  private sliderLoaded: boolean = false;
  private closeIcon: string = 'close-circle';
  private parentSubject: Subject<any> = new Subject();
  private cancelText: string;
  private acceptText: string;
  private deleteText: string;
  constructor(
   private viewCtrl: ViewController,
    public params: NavParams,
     private element: ElementRef,
      private platform: Platform,
        public galleryService: GalleryService,
         public navCtrl: NavController,
          private socialSharing: SocialSharing,
           private file: File,
            private translate: TranslateService,
             private alertCtrl: AlertController) {
    this.photos = params.get('photos') || [];
    this.closeIcon = params.get('closeIcon') || 'close-circle';
    this.initialSlide = params.get('initialSlide') || 0;
     this.translate.get('SUPPRIMER').subscribe((traduction) => {
       this.acceptText = traduction;
     });
     this.translate.get('MAJAFL4').subscribe((traduction) => {
       this.cancelText = traduction;
     });
     this.translate.get('TEMPLATE_SUP').subscribe((traduction) => {
       this.deleteText = traduction;
     });
  }

  /**
   * Closes the modal (when user click on CLOSE)
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }

  private resize(event) {
    this.slider.update();

    let width = this.element['nativeElement'].offsetWidth;
    let height = this.element['nativeElement'].offsetHeight;

    this.parentSubject.next({
      width: width,
      height: height,
    });
  }

  private orientationChange(event) {
    // TODO: See if you can remove timeout
    window.setTimeout(() => {
      this.resize(event);
    }, 150);
  }

  /**
   * When the modal has entered into view
   */
  private ionViewDidEnter() {
    this.resize(false);
    this.sliderLoaded = true;
  }

  /**
   * Disables the scroll through the slider
   *
   * @param  {Event} event
   */
  private disableScroll(event) {
    if (!this.sliderDisabled) {
      this.currentSlide = this.slider.getActiveIndex();
      this.sliderDisabled = true;
    }
  }

  /**
   * Enables the scroll through the slider
   *
   * @param  {Event} event
   */
  private enableScroll(event) {
    if (this.sliderDisabled) {
      this.slider.slideTo(this.currentSlide, 0, false);
      this.sliderDisabled = false;
    }
  }

  private share() {
    this.socialSharing.share("Photo prise par l'application Visite Patrimoine Montmorillon", null, this.photos[this.slider.getActiveIndex()].url, null);
  }

  private delete() {
    let confirm = this.alertCtrl.create({
      title: this.cancelText,
      message: this.deleteText,
      buttons: [
        {
          text: this.cancelText,
          handler: () => {
          }
        },
        {
          text: this.acceptText,
          handler: () => {
            this.galleryService.deleteImage(this.slider.getActiveIndex());
            var photo = this.photos[this.slider.getActiveIndex()].url.split('/');
            this.file.removeFile(this.file.externalCacheDirectory,photo[photo.length-1]).then(() => {
              console.log("File deleted");
            });
            this.dismiss();
          }
        }
      ]
    });
    confirm.present()
  }
}