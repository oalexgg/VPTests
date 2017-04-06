import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { GalleryModal } from 'ionic-gallery-modal';


import { GalleryService } from '../../services/gallery-service';

/*
  Generated class for the Gallery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
  providers: [File]
})
export class GalleryPage implements OnInit {

  allImages: Array<any>;
  url: any;  
  loaded: boolean = false;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
    private file: File,
     public storage: Storage,
      public galleryService: GalleryService,
       public modalCtrl: ModalController) {}

  ionViewDidLoad() { 
  setTimeout(() => {
      for (var i of this.galleryService.getAllImages()) {
          this.allImages.push(i.src);
      }
       this.loaded = true;
     }, 500);  
  }

  ngOnInit() {
    this.allImages = [];
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
    modal.present();
  }


}
