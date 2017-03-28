import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PointsInteretPage,
    DetailPiPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JsonpModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PointsInteretPage,
    DetailPiPage
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
