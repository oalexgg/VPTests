import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule, JsonpModule } from '@angular/http';
import { ParcourService } from "../services/parcours-service";
import { PiService } from "../services/pi-service";
import { PointsInteretPage } from '../pages/points-interet/points-interet';
import { DetailPiPage } from '../pages/detail-pi/detail-pi';
import { ParcourPage } from '../pages/parcour/parcour';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AgmCoreModule } from 'angular2-google-maps/core';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PointsInteretPage,
    DetailPiPage,
    ParcourPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JsonpModule,
    HttpModule,
    BrowserModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PointsInteretPage,
    DetailPiPage, 
    ParcourPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParcourService,
    PiService
  ]
})
export class AppModule {}
