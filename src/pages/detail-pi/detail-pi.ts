import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PI } from "../../providers/model";
import { PiService } from "../../providers/pi-service";
import {CallNumber} from '@ionic-native/call-number';

import {TranslateService} from 'ng2-translate';

/*
  Generated class for the DetailParcours page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-pi',
  templateUrl: 'detail-pi.html'
})
export class DetailPiPage {
	pointsInteret: Array<any>;
  pointInteret: PI;
  adresse: string;
  horaire: string;
  id: any;
  loaded: boolean = false;
  imagesColection: Array<any>;
  imageSrc: Array<any>;
  myTracks: any[];
  musicActive: boolean = false;
  videoActive: boolean = false;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public piService: PiService,
       public translateService: TranslateService,
        private callNumber: CallNumber) {
        	this.id = navParams.get("piId");
          this.pointsInteret = [];
          this.imagesColection = [];
          this.imageSrc = [];
              this.piService.getPis()
                  .then(
                      pis=> {
                        this.pointsInteret = Object.keys(pis).map(k => { return pis[k] });
                        this
                          .pointsInteret[0]
                          .forEach((i) => {
                            if(this.id === i.id) {
                              this.pointInteret = i;
                            }
                          });
                        this.translateService
                          .get('ADRESSE')
                          .subscribe((data) => {
                            this.adresse = "<div class='info'> "+data+":"+this.pointInteret["adresse"]+"</div>";
                          });
                        if(this.pointInteret["horaire"]!= null)
                        {
                          this.translateService
                            .get('HORAIRES')
                            .subscribe((data) => {
                              this.horaire = "<div class='info'> "+data+":"+this.pointInteret["horaire"]+"</div>";
                            });
                        }

                        this.imagesColection
                          .push(this.pointInteret["image"]);
                        this.pointInteret["image_collection"]
                          .forEach((i) => {
                            this.imagesColection.push(i);
                          });
                        this.imagesColection
                          .forEach((image) => {
                            this.imageSrc.push("file:///data/data/com.ionicframework.projetvp880805/files/" + image.image);
                          });
                      },
                      (err: any) => console.error(err)
                  );
                  this.myTracks = [{
                    src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
                    artist: 'John Mayer',
                    title: 'Why Georgia',
                    art: 'img/johnmayer.jpg',
                    preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
                  },
                  {
                    src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
                    artist: 'John Mayer',
                    title: 'Who Says',
                    art: 'img/johnmayer.jpg',
                    preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
                  }];
  }

  ionViewDidLoad() {
    setTimeout(() => {
       this.loaded = true;
     }, 100);
  }

  call(phone) {
    console.log(phone);

    this.callNumber.callNumber(phone, true)
    .then(() => console.log('Launched dialer!'))
    .catch((error) => console.log(error));
  }

  playSelectedTrack() {
   // use AudioProvider to control selected track
 }

 pauseSelectedTrack() {
    // use AudioProvider to control selected track
 }

 onTrackFinished(track: any) {
   console.log('Track finished', track)
 }

 musicBtn() {
   this.musicActive = !this.musicActive;
 }

 videoBtn() {
   this.videoActive = !this.videoActive;
 }

 videoEnded() {
   this.videoActive = false;
 }

}
