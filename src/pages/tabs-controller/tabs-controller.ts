import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { kaoqinPage } from '../kaoqin/kaoqin';
import { Page4Page } from '../page4/page4';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root = kaoqinPage;
  tab2Root = Page4Page;
  constructor(public navCtrl: NavController) {
  }
  
}
