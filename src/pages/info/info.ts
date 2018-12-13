import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appconfig } from '../../app/app.config';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
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

}
