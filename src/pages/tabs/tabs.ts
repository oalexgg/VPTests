import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';

import { HomePage } from '../home/home';
import { PointsInteretMainPage } from '../points-interet-main/points-interet-main';
import { ParcoursMainPage } from '../parcours-main/parcours-main';
import { CameraPage } from '../camera/camera';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = PointsInteretMainPage;
  tab3Root: any = ParcoursMainPage;
  tab4Root: any = CameraPage;

  constructor(
  	public translate: TranslateService) {

  }
}
