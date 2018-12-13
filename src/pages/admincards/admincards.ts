import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';
import { InfoPage } from '../info/info';

/**
 * Generated class for the AdmincardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admincards',
  templateUrl: 'admincards.html',
})
export class AdmincardsPage {
  items = [
    {
      title:"database1",
      content:"no"
    },
    {
      title:"database2",
      content:"yes"
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  gotoclass(){
    this.navCtrl.push(AdminPage);
  }
  gotolist(){
    this.navCtrl.push(ListPage);
  }
  exit(){
    this.navCtrl.push(LoginPage);
  }
  gotoinfo(){
    this.navCtrl.push(InfoPage);
  }
}
