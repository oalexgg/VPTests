import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GalleryModal } from '../../image-viewer/gallery-modal/gallery-modal';
import {TranslateService} from 'ng2-translate';


import { GalleryService } from '../../services/gallery-service';

/*
  Generated class for the Gallery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage implements OnInit {

  allImages: Array<any>;
  url: any;  
  loaded: boolean;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
     public storage: Storage,
      public galleryService: GalleryService,
       public modalCtrl: ModalController,
        public translate: TranslateService) {}

  ionViewDidLoad() { 
    this.allImages = [];
    if(this.allImages !== null) {
     setTimeout(() => {
        for (var i of this.galleryService.getAllImages()) {
          if(i != null){
            this.allImages.push(i.src);
          }
        }
     }
     , 300);
     }
     this.loaded = true;
    }

    ngOnInit() {
      
    }

  showImages(i) {
    var photos = [];
    for (var j of this.allImages) {
      photos.push({'url': j});
    }
   let modal = this.modalCtrl.create(GalleryModal, {
      photos: photos,
      initialSlide: i
    });
   modal.onDidDismiss((images) => {
     this.ionViewDidLoad();
   });
    modal.present();
  }

}
