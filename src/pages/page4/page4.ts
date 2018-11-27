import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as HighCharts from 'highcharts';
import { Appconfig } from '../../app/app.config';

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
  dateMulti: string[] = ['2018-10-01','2018-10-12','2018-10-13','2018-10-15'];
  type: 'string';
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  constructor(public navCtrl: NavController) {
  }
  ionViewDidLoad() {
    //this.table();
    this.username = Appconfig.getusername();
    this.tel = Appconfig.gettel();
    this.sfz = Appconfig.getsfz();
    this.truename= Appconfig.gettruename();
    this.gonghao = Appconfig.getgonghao();
    this.getpicture();
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
        text: '当月考勤统计'
      },
      xAxis: {
        categories: [
          '正常签到','调休','请假','考勤异常'
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
        name: '七月',
        data: [20,1,3,2]
      }]
    });
  }
}
