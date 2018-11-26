import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appconfig } from '../../app/app.config';

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
    this.list();
  }
  select () {
    var item = [
    {
      id: 1,
      studentID: "15121991",
      name: "zht1",
      node: 0
    },
    {
      id: 2,
      studentID: "15121991",
      name: "zht2",
      node: 1
    },
    {
      id: 3,
      studentID: "15121991",
      name: "zht3",
      node: 0
    }
  ]
    var count = item.length;
    var tb = document.getElementById("table_timeselect");
    var str = "<tr><th>序号</th><th>学号</th><th>姓名</th><th>状态</th></tr>";
    var code = '';
    for(var i=0;i<count;i++){
      if(item[i].node == 0){
        code="已签到";
      }
      else
      {
        code="未签到";
      }
      str += "<tr><td>"+item[i].id+"</td><td>"+item[i].studentID+"</td><td>"+item[i].name+"</td><td>"+code+"</td></tr>";
    }
    tb.innerHTML = str;
  } 
  list () {
    var item = [
      {
        id: 1,
        studentID: "15121991",
        name: "zht1",
        node: 0
      },
      {
        id: 2,
        studentID: "15121991",
        name: "zht2",
        node: 1
      },
      {
        id: 3,
        studentID: "15121991",
        name: "zht3",
        node: 0
      }
    ];
    var count = item.length;
    var str = "<tr><th>序号</th><th>学号</th><th>姓名</th><th>当天状态</th><th>操作</th></tr>";
    var code = "";
    var tb=document.getElementById("table_all");
    for(var i=0;i<count;i++){
      if(item[i].node == 0){
        code="已签到";
      }
      else
      {
        code="未签到";
      }
      str += "<tr><td>"+item[i].id+"</td><td>"+item[i].studentID+"</td><td>"+item[i].name+"</td><td>"+code+"</td><td><a click=\".changecode()\">签到ionic </a></td></tr>";
    }
    tb.innerHTML = str;
    } 
    changecode() {
      alert("ok");
    }
}
