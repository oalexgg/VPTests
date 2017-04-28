import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { SocialSharing } from '@ionic-native/social-sharing';
import {CallNumber} from '@ionic-native/call-number';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NguiMapModule} from '@ngui/map';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';
import { PointsInteretMainPage } from '../pages/points-interet-main/points-interet-main';
import { ParcoursMainPage } from '../pages/parcours-main/parcours-main';
import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';
import { GalleryPage } from '../pages/gallery/gallery';
import { TranslatePage } from '../pages/translate/translate';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { ParcourService } from "../providers/parcours-service";
import { GalleryService } from "../providers/gallery-service";
import { ParcourMomentService } from "../providers/parcours-moment-service";
import { PiService } from "../providers/pi-service";
import { PointsInteretPage } from '../pages/points-interet/points-interet';
import { MetreAJourPage } from '../pages/metre-a-jour/metre-a-jour'
import { DetailPiPage } from '../pages/detail-pi/detail-pi';
import { ParcourPage } from '../pages/parcour/parcour';
import { GalleryModal } from '../image-viewer/gallery-modal/gallery-modal';
import { ZoomableImage } from '../image-viewer/zoomable-image/zoomable-image';
import { Database } from '../providers/database';
import { VPApi } from '../providers/vp-api';
import { LocationTracker } from '../providers/location-tracker';



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
    TranslatePage,
    MetreAJourPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JsonpModule,
    HttpModule,
    BrowserModule,
    CommonModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es'}),
    IonicStorageModule.forRoot({
        name: '__VP',
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
    TranslatePage,
    MetreAJourPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParcourService,
    PiService,
    ParcourMomentService,
    GalleryService,
    SocialSharing,
    Database,
    VPApi,
    CallNumber,
    BackgroundGeolocation,
    LocationTracker,
    Geolocation,
    LocalNotifications
    ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets', '.json');
}
