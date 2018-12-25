import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController, ToastController } from 'ionic-angular';
import { Appconfig } from '../../app/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MygroupPage } from '../mygroup/mygroup';

/**
 * Generated class for the GroupinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

@IonicPage()
@Component({
  selector: 'page-groupinfo',
  templateUrl: 'groupinfo.html',
})
export class GroupinfoPage {
  groupid: any;
  class1:any;
  utype:any;
  time:any;
  place:any;

  constructor(public toastCtrl: ToastController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    var classs = Appconfig.getmygroup();
    this.class1 = classs;
    var utype = Appconfig.getutype();
    if(utype == 1){
      //document.getElementById("utype").innerHTML = '成员';
      this.utype = '成员';
    }
    var usergroup = Appconfig.getusergroup();
    for(var i=0;i<usergroup.length;i++){
      if(classs == usergroup[i].groupname){
        //document.getElementById("place").innerHTML = usergroup[i].dwname;
        this.place =  usergroup[i].dwname;
        this.groupid = usergroup[i].groupid;
        break; 
      }
    }
    console.log(usergroup);
    var dayweek,starttime,endtime;
    for(i=0;i<usergroup.length;i++){
      if(classs == usergroup[i].groupname){
        dayweek = usergroup[i].dayweek;
        starttime = usergroup[i].starttime;
        endtime = usergroup[i].endtime;
        this.time = '周'+dayweek+' '+starttime+' ~ '+endtime;
        //document.getElementById("time").innerHTML = '周'+dayweek+' '+starttime+' ~ '+endtime;
        break;
      }
    }
  }
  exitgroup(uid,groupid){
    let pathurl:string = 'http://118.24.76.130:8000/exitGroup';
    let pramas = JSON.stringify({
      uid: uid,
      groupid: groupid
    });
    this.http.post(pathurl,pramas,httpOptions).subscribe( (data) => {
      if(data['code'] == 0){
        const toast = this.toastCtrl.create({
          message: '退出成功！',
          duration: 1000
        });
        toast.present();
        this.navCtrl.push(MygroupPage);
      }
      else if(data['code'] == 2){
        const toast = this.toastCtrl.create({
          message: '未曾加入此群组',
          duration: 1000
        });
        toast.present();
      }
    })
  }
  openprompt(){
    const joingroup = this.alertCtrl.create({
      title: '退出群组',
      message:"请再三确认是否退出群组，退出后之前的考勤记录可能消失，后果自负！",
      buttons:[{
        text:"确认",
        handler:data => {
          this.exitgroup(Appconfig.getuid(),this.groupid);
        }
      },
      {
        text:"取消",
        handler:data => {
          console.log("click");
        }
      }]
    });
    joingroup.present();
  }
  back(){
    this.navCtrl.push(MygroupPage);
  }
}
