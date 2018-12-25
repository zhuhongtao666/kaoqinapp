import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';
import { Appconfig } from '../../app/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

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
  time:any;

  constructor(public toastCtrl: ToastController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.classname=Appconfig.getadmingroup();
    var content = Appconfig.getadmincontent();
    var half = content.split(';');
    this.classplace=half[0].split(':')[1];
    this.classtime=half[1].split(':')[1];
  }
  select(){
    var groupid,id,people,nokqid,nokqpeople:any;
    if(this.time == ''){
      const toast = this.toastCtrl.create({
        message: '请选择查询时间！',
        duration: 1000
      });
      toast.present();
    }
    else{
      if(this.classname == '数据库-宋安平'){
        groupid = '2';
      }
      else if(this.classname == '数据库研讨-宋安平'){
        groupid = '1';
      }
      console.log(groupid);
      let pathurl:string = 'http://118.24.76.130:8000/getkqjilu';
        let pramas = JSON.stringify({
          groupid:groupid,
          date:this.time
        });
      this.http.post(pathurl,pramas,httpOptions).subscribe( (data) => {
        if(data['code'] == 0){
          const toast = this.toastCtrl.create({
            message: '搜索成功！',
            duration: 1000
          });
          toast.present();
          id = data['id'];
          people = data['people'];
          nokqid = data['nokqid'];
          nokqpeople = data['nokqpeople'];
          this.noqiandaos = nokqpeople;
          this.qiandaos = people;
        }
        else if(data['code'] == 1){
          const toast = this.toastCtrl.create({
            message: '无人考勤！',
            duration: 1000
          });
          toast.present();
        }
        else if(data['code'] == 2){
          const toast = this.toastCtrl.create({
            message: data['info'],
            duration: 1000
          });
          toast.present();
        }
      });
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
