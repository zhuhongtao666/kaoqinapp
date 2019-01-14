import { Component, group } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ModalController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';
import { Appconfig } from '../../app/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalPage } from '../modal/modal';

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

  constructor(public modalCtrl: ModalController,public toastCtrl: ToastController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.classname=Appconfig.getadmingroup();
    var content = Appconfig.getadmincontent();
    var half1 = content.split('地点：');
    var half2 = content.split(';');
    this.classplace=half1[1].split(' ')[0];
    this.classtime=half2[half2.length-1].split(' ')[0];
  }
  select(){
    var groupid,id,people,nokqid,nokqpeople,array:any;
    if(this.time == null){
      const toast = this.toastCtrl.create({
        message: '请选择查询时间！',
        duration: 1000
      });
      toast.present();
    }
    else{
      groupid = Appconfig.getmyadmingroupid();
      //console.log(groupid);
      let pathurl:string = 'http://118.24.76.130:8000/getkqjilu';
        let pramas = JSON.stringify({
          groupid:groupid,
          date:this.time
        });
      this.http.post(pathurl,pramas,httpOptions).subscribe( (data) => {
        console.log(data);
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
          for(var i=0;i<nokqid.length;i++){
            array={
              id:nokqid[i],
              truename:nokqpeople[i]
            };
            this.noqiandaos.push(array);
          }
          for(i=0;i<id.length;i++){
            array={
              id:id[i],
              truename:people[i]
            };
            this.qiandaos.push(array);
          }
          
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
  itemSelected(item){
    const modal = this.modalCtrl.create(ModalPage,{ user: item });
    modal.present();
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
