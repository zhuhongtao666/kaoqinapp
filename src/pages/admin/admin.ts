import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  classname:string;
  classplace:string;
  classtime:string;
  noqiandaos = [];
  qiandaos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.classname="database1";
    this.classplace="east";
    this.classtime="3";
  }
  gotolist() {
    this.navCtrl.push(ListPage);
  }
  changecode() {
    alert("ok");
  }
  exit() {
    this.navCtrl.push(LoginPage);
  }
}
