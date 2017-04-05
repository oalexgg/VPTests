import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { GalleryPage } from '../gallery/gallery';
import { Storage } from '@ionic/storage';


/*
  Generated class for the Camera page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
  providers: [Camera, File]
})
export class CameraPage implements OnInit{

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
    private camera: Camera,
     private platform: Platform,
      private file: File,
       public storage: Storage) {  }

  ngOnInit() {
        var options = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };
    var txt;
    this.storage.get('src').then((value) => {
      txt = value;
    });
    this.camera.getPicture(options).then( (imageData) => {
      if(this.platform.is('ios')){ 
          // imageData est la variable qui contient le chemin de notre image vers le dossier temporaire du téléphone, il faut donc déplacer l'image dans le répertoire de l'appli pour qu'elle soit sauvegardée lorsque l'on relance l'application.                                     
          var currentName = imageData.replace(/^.*[\\\/]/, '');
          var d = new Date(),n = d.getTime(),newFileName = n + ".jpg";                                  
          document.addEventListener('deviceready', () => {
          // Success.nativeURL contient le chemin vers le répertoire de l'appli où sont stockées les photos.
          this.file.moveFile(this.file.tempDirectory, currentName, this.file.dataDirectory, newFileName).then((success) => {
          //allImages.push({'src': success.nativeURL});  
          this.storage.set('src', success.nativeURL + ',');
          this.file.writeExistingFile(this.file.dataDirectory, "VPM_Picture.txt",  success.nativeURL + ','); }); 
        });
     }
     else if(this.platform.is('android')){
          //allImages.push({'src': imageData});
          document.addEventListener('deviceready', () => {
          this.file.writeExistingFile(this.file.dataDirectory, "VPM_Picture.txt",  imageData + ',');
          this.storage.set('src', txt + ',' + imageData);
      });
     }
     //console.log($rootScope.allImages);
     //$state.go('tab.gallery', {});
     this.navCtrl.setRoot(GalleryPage);
    });

  }


  ionViewDidLoad() {
    
 }

}
