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
  items = [];
  public admingroup:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var groupid,groupname,starttime,endtime,place,dayweek,group_password,array:any;
    setTimeout(() => {
      groupid=Appconfig.getadmingroupid();
      groupname=Appconfig.getadmingroupname();
      group_password=Appconfig.getadmingrouppwd();
      starttime=Appconfig.getadminstarttime();
      endtime=Appconfig.getadminendtime();
      place=Appconfig.getadminplace();
      dayweek=Appconfig.getadmindayweek();
      for(var i=0;i<groupname.length;i++){
        array = {
          title:groupname[i],
          content:"上课地点："+place[i]+"  上课时间：每周"+dayweek[i]+starttime[i]+"~"+endtime[i]+"  密码："+group_password[i]+"  组号："+groupid[i]
        };
        this.items.push(array);
      }
    }, 1000);
    
  }
  gotoclass(title,content){
    Appconfig.setadmingroup(title);
    Appconfig.setadmincontent(content);
    var id = content.split('组号：');
    console.log(id[1]);
    Appconfig.setmyadmingroupid(id[1]);
    this.navCtrl.push(AdminPage);
  }
  gotolist(title,content){
    Appconfig.setadmingroup(title);
    var id = content.split('组号：');
    //console.log(id[1]);
    Appconfig.setmyadmingroupid(id[1]);
    this.navCtrl.push(ListPage);
  }
  exit(){
    this.navCtrl.push(LoginPage);
  }
  gotoinfo(){
    this.navCtrl.push(InfoPage);
  }
}
