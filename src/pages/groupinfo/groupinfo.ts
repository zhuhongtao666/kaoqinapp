import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Appconfig } from '../../app/app.config';

/**
 * Generated class for the GroupinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupinfo',
  templateUrl: 'groupinfo.html',
})
export class GroupinfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    var classs = Appconfig.getmygroup();
    document.getElementById("class").innerHTML = classs;
    var utype = Appconfig.getutype();
    if(utype == 1){
      document.getElementById("utype").innerHTML = '成员';
    }
    var usergroup = Appconfig.getusergroup();
    for(var i=0;i<usergroup.length;i++){
      if(classs == usergroup[i].groupname){
        document.getElementById("place").innerHTML = usergroup[i].dwname;
        break;
      }
    }
    var dayweek,starttime,endtime;
    for(i=0;i<usergroup.length;i++){
      if(classs == usergroup[i].groupname){
        dayweek = usergroup[i].dayweek;
        starttime = usergroup[i].starttime;
        endtime = usergroup[i].endtime;
        document.getElementById("time").innerHTML = '周'+dayweek+' '+starttime+' ~ '+endtime;
        break;
      }
    }
  }
  exitgroup(){

  }
  back(){
    this.viewCtrl.dismiss();
  }
}
