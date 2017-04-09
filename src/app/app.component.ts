import { Component, ViewChild  } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from 'ng2-translate';

import { GalleryPage } from '../pages/gallery/gallery';
import { TranslatePage } from '../pages/translate/translate';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  galleryPage = GalleryPage;
  translatePage = TranslatePage;


  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
     statusBar: StatusBar,
      splashScreen: SplashScreen,
       translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByName('bordeaux');
      splashScreen.hide();

    });

  }

  openPage(p) {
       this.nav.push(p);
  }

}
