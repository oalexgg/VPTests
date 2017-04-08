import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { SocialSharing } from '@ionic-native/social-sharing';


import { MyApp } from './app.component';
import { PointsInteretMainPage } from '../pages/points-interet-main/points-interet-main';
import { ParcoursMainPage } from '../pages/parcours-main/parcours-main';
import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';
import { GalleryPage } from '../pages/gallery/gallery';
import { TranslatePage } from '../pages/translate/translate';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { ParcourService } from "../services/parcours-service";
import { GalleryService } from "../services/gallery-service";
import { ParcourMomentService } from "../services/parcours-moment-service";
import { PiService } from "../services/pi-service";
import { PointsInteretPage } from '../pages/points-interet/points-interet';
import { DetailPiPage } from '../pages/detail-pi/detail-pi';
import { ParcourPage } from '../pages/parcour/parcour';
import { GalleryModal } from '../image-viewer/gallery-modal/gallery-modal';
import { ZoomableImage } from '../image-viewer/zoomable-image/zoomable-image';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NguiMapModule} from '@ngui/map';


@NgModule({
  declarations: [
    MyApp,
    PointsInteretMainPage,
    ParcoursMainPage,
    HomePage,
    TabsPage,
    PointsInteretPage,
    DetailPiPage,
    ParcourPage,
    CameraPage,
    GalleryPage,
    GalleryModal,
    ZoomableImage,
    TranslatePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JsonpModule,
    HttpModule,
    BrowserModule,
    CommonModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es'}),
    IonicStorageModule.forRoot({
        name: '__images',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PointsInteretMainPage,
    ParcoursMainPage,
    HomePage,
    TabsPage,
    PointsInteretPage,
    DetailPiPage, 
    ParcourPage,
    CameraPage,
    GalleryPage,
    GalleryModal,
    TranslatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParcourService,
    PiService,
    ParcourMomentService,
    GalleryService,
    SocialSharing
    ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets', '.json');
}