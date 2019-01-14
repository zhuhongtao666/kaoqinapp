import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController, ToastController } from 'ionic-angular';
import { Appconfig } from '../../app/app.config';
import { GroupinfoPage } from '../groupinfo/groupinfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { kaoqinPage } from '../kaoqin/kaoqin';

/**
 * Generated class for the MygroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

@IonicPage()
@Component({
  selector: 'page-mygroup',
  templateUrl: 'mygroup.html',
})
export class MygroupPage {
  items = [];
  searchQuery;
  constructor(public toastCtrl: ToastController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public alertCtrl: AlertController) {
    this.initializeItems();
    this.searchQuery='';
  }

  ionViewDidLoad() {
  }
  initializeItems(){
    let pathurl:string = 'http://118.24.76.130:8000/getUserGroupId';
    let pramas = JSON.stringify({
      uid: Appconfig.getuid(),
    });
    this.http.post(pathurl,pramas,httpOptions).subscribe( (data)=> {
      if(data['code'] != 0){
        var usergroup = data['user_group'];
        Appconfig.setusergroup(usergroup);
        for(var i = 0;i<usergroup.length;i++){
          this.items[i] = usergroup[i].groupname;
        }
      }
    })
  }
  getItems(ev){
    this.initializeItems();
    var val = ev.target.value;
    if(val && val.trim()!= ''){
      this.items = this.items.filter((v)=>{
        return (v.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
  }
  itemSelected(item){
    const modal = this.modalCtrl.create(GroupinfoPage);
    modal.present();
    Appconfig.setmygroup(item);
    console.log(item);
  }
  joingroup(uid,groupid,group_password){
    let pathurl:string = 'http://118.24.76.130:8000/joinGroup';
    let pramas = JSON.stringify({
      uid: Appconfig.getuid(),
      groupid: groupid,
      group_password: group_password
    });
    this.http.post(pathurl,pramas,httpOptions).subscribe( (data) => {
      if(data['code'] == 0){
        const toast = this.toastCtrl.create({
          message: '加入成功！',
          duration: 1000
        });
        toast.present();
        this.initializeItems();
      }
      else if(data['code'] == 1){
        const toast = this.toastCtrl.create({
          message: '群组不存在或密码错误',
          duration: 1000
        });
        toast.present();
      }
      else if(data['code'] == 2){
        const toast = this.toastCtrl.create({
          message: '已经加入',
          duration: 1000
        });
        toast.present();
      }
    })
  }
  back() {
    this.navCtrl.setRoot(TabsControllerPage);
  }
  openprompt(){
    const joingroup = this.alertCtrl.create({
      title: '加入群组',
      message:"请填写群组序号",
      inputs:[{
        name:"groupid",
        placeholder:"群组序号"
      },
      {
        name:"group_password",
        placeholder:"密码"
      },
    ],
    buttons:[{
      text:"确认",
      handler:data => {
        this.joingroup(Appconfig.getuid(),data.groupid,data.group_password);
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

}
