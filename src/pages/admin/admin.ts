import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appconfig } from '../../app/app.config';
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

  username: string;
  tel:string;
  sfz:string;
  utype:string;
  time:string;
  classs:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.username = Appconfig.getusername();
    this.tel = Appconfig.gettel();
    this.sfz = Appconfig.getsfz();
    if( Appconfig.getutype() == 0 ){
      this.utype = '普通用户';
    }
    else if( Appconfig.getutype() == 1 ){
      this.utype = '管理员';
    }
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
