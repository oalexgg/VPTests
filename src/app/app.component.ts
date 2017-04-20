import { Component, ViewChild  } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from 'ng2-translate';

import { GalleryPage } from '../pages/gallery/gallery';
import { TranslatePage } from '../pages/translate/translate';
import { MetreAJourPage } from "../pages/metre-a-jour/metre-a-jour";
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  galleryPage: any = GalleryPage;
  translatePage: any = TranslatePage;
  majPage: any = MetreAJourPage;


  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
     public statusBar: StatusBar,
      public splashScreen: SplashScreen,
       public translate: TranslateService) {
    this.initializeApp();
  }

  initializeApp() {
     this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByName('app_colour');
      this.splashScreen.hide();

    });
  }

  openPage(p) {
       this.nav.push(p);
  }
}
