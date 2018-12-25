import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';
import { InfoPage } from '../info/info';
import { Appconfig } from '../../app/app.config';

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
      title:"数据库-宋安平",
      content:"上课地点:东区计算机楼;上课时间:每周三08：00 ~ 11：40"
    },
    {
      title:"数据库研讨-宋安平",
      content:"上课地点:东区计算机楼;上课时间:每周五14：10 ~ 15：50"
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  gotoclass(title,content){
    Appconfig.setadmingroup(title);
    Appconfig.setadmincontent(content);
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
