import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { CalendarComponentOptions } from 'ion2-calendar';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  dateMulti: string[] = ['2018-10-01','2018-10-12','2018-10-13','2018-10-15'];
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    this.table();
  }
  back() {
    this.viewCtrl.dismiss();
  }
  qiandao(){

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
