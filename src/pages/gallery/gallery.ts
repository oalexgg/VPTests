import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, public storage: Storage) {}

  ionViewDidLoad() {
 
  }

  ngOnInit() {
  	this.allImages = [];
    this.url = [];
   
    this.storage.get('src').then((data) => {
      this.url = data;
    });
     
      setTimeout(() => {
      console.log(this.url);
      this.url = this.url.split(',');
     for (var i of this.url) {
        this.allImages.push({'src': i});
      }
     }, 8000);
  	}


}
