import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as HighCharts from 'highcharts';
import { Appconfig } from '../../app/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html'
})
export class Page4Page {
  username: string;
  tel:string;
  sfz:string;
  truename:string;
  gonghao: string;
  img: string;
  lessons: any;
  place:any;
  usergroup: any;
  groupid: any;
  selectOptions:any;
  dateMulti: string[];
  type: 'string';
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  constructor(public navCtrl: NavController,public http: HttpClient) {
  }
  ionViewDidLoad() {
    //this.table();
    this.username = Appconfig.getusername();
    this.tel = Appconfig.gettel();
    this.sfz = Appconfig.getsfz();
    this.truename= Appconfig.gettruename();
    this.gonghao = Appconfig.getgonghao();
    this.getpicture();

    this.usergroup = Appconfig.getusergroup();
    let array :Array<string> = new Array<string>();
    for(var i = 0 ;i<this.usergroup.length;i++){
      array[i] = this.usergroup[i].groupname;
    }
    this.lessons = array;
    this.selectOptions = {
      title: '请选择群组',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
      ]
    };
  }
  getdate(l1:string, l2:string){
    var usergroup = Appconfig.getusergroup();
    for(var i=0;i<usergroup.length;i++){
      if(l2 == usergroup[i].groupname){
        this.groupid = usergroup[i].groupid;
        break;
      }
    }
    return l1===l2;
  }
  tesst2(){
    console.log("cancel");
  }
  getkqdate(){
    var usergroup = Appconfig.getusergroup();
    for(var i=0;i<usergroup.length;i++){
      if(this.place == usergroup[i].groupname){
        this.groupid = usergroup[i].groupid;
        break;
      }
    }
    let pathurl:string = 'http://118.24.76.130:8000/selectkqDay';
      let pramas = JSON.stringify({
        uid: Appconfig.getuid(),
        groupid: this.groupid,
      });
      this.http.post(pathurl,pramas,httpOptions).subscribe( (data) => {
        if(data['code'] == 0){
          this.dateMulti = data['date'];
          console.log(data['date']);
        }
      })
  }
  getpicture(){
    this.img = Appconfig.getuimg();
    var mydiv = document.getElementById("photo");
    var photo = document.createElement("img");
    photo.src = this.img;
    photo.setAttribute('style','width: 80%;height: 80%;');
    mydiv.appendChild(photo);
   // mydiv.innerHTML = '<img id="myphoto" src="assets/img/91Mvm6eFT8eiJhJIJpe6_other.png" style="width: 400px;height: 400px;" />';
  }
  table(){
    HighCharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: '整体考勤统计'
      },
      xAxis: {
        categories: [
          '正常签到','请假','考勤异常'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0
      },
      tooltip: {
        // head + 每个 point + footer 拼接成完整的 table
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} 次</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          borderWidth: 0
        }
      },
      series: [{
        name: this.place,
        data: [20,1,3,2]
      }]
    });
  }
}
