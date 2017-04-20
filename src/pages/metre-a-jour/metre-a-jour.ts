import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from "../../providers/database";
import {TranslateService} from 'ng2-translate';
import { Network } from '@ionic-native/network';
import { VPApi } from "../../providers/vp-api";
import { File } from '@ionic-native/file';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { HomePage } from "../../pages/home/home";
/*
  Generated class for the MetreAJour page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-metre-a-jour',
  templateUrl: 'metre-a-jour.html',
  providers: [Network, File, Transfer]
})
export class MetreAJourPage {
  public firstLaunch: boolean = false;
  private maj: boolean = true;
  private isConnected: boolean = true;
  private nbFichier: number;
  private progres: number;
  private sizeTab: number;
  private size: number;
  private titreF: Array<any>;
  private listSupr: Array<any>;
  private listDif: Array<any>;
  private urlF: string;
  private downloadProgress: number;
  private version: any;
  private isMaj: boolean;


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      private db: Database,
       private translate: TranslateService,
        private network: Network,
         private vpapi: VPApi,
          private file: File,
           private transfer: Transfer) {}

  ionViewDidLoad() {
    this.isMaj = this.db._isMaj();
    if(this.network.type === "none") {
      this.isConnected = false;
      this.maj = false;
    }
    console.log(this.isMaj);

    if(this.db.getV() === 0) {
      this.firstLaunch = true
    }
    this.vpapi.getUpdate().then(data => {
      this.sizeTab = data.listDiff.length;
      this.size = data.size / 1000000.0;
      this.maj = true;
      this.listSupr = data.listSuppr;
      this.listDif = data.listDiff;
      this.version = data.version;
    });

  }

  install() {
    const fileTransfer: TransferObject = this.transfer.create();
    this.nbFichier = 0;
    this.maj = false;
    this.progres = 0;
    this.vpapi.doUpdate();
    this.titreF = [];
    if(this.listSupr.length !== 0) {
      for(let i of this.listSupr) {
        this.file.removeFile(this.file.dataDirectory, i).then((response) => {
          console.log(response);
        });
      }
    }
    if(this.sizeTab !== 0) {
      for(let i of this.listDif) {
        var url = i.url;
        var target = this.file.dataDirectory + i.title;
        this.titreF.push(i.title);
        this.urlF = i.url;
        if(url == null) {
          this.sizeTab--;
        } else {
          fileTransfer.download(url, target, true)
          .then((result) => {
            this.nbFichier++;
            this.progres = (100 * this.nbFichier) / this.sizeTab;
            this.downloadProgress = 0;
            if(this.progres === 100) {
              setTimeout(() => {
                this.db.updateVersion(this.version);
                this.navCtrl.setRoot(HomePage);
              }, 1000);
            }
          }, err => {} );
          fileTransfer.onProgress((progress)=> {
            this.downloadProgress = (progress.loaded / progress.total) * 100;
          });
        }
      }
    } else {
      this.db.updateVersion(this.version);
      this.navCtrl.setRoot(HomePage);
    }
  }
  goacc() {
    this.navCtrl.pop();
  }
}
