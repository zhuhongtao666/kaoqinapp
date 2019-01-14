import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ToastController } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { CalendarComponentOptions } from 'ion2-calendar';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Appconfig } from '../../app/app.config';
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  userid:any;
  kqallcount:number;
  public data:any;
  dateMulti: string[] = [];
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  constructor(public toastCtrl: ToastController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    console.log(navParams.get('user'));
    this.userid = navParams.get('user');
  }

  ionViewDidLoad() {
    let pathurl4:string = 'http://118.24.76.130:8000/getcount';
    let pramas4 = JSON.stringify({
        uid: this.userid,
        groupid: Appconfig.getmyadmingroupid()
    });
    this.http.post(pathurl4,pramas4,httpOptions).subscribe( (data) => {
      this.kqallcount = data['allcount'];
      console.log(this.kqallcount);
    });
    console.log("data:"+this.data);
    setTimeout(() => {
      this.table();
    }, 1000);
    let pathurl:string = 'http://118.24.76.130:8000/getuserinfo';
    let pramas = JSON.stringify({
        uid: this.userid
    });
    this.http.post(pathurl,pramas,httpOptions).subscribe( (data) => {
      console.log(data);
      if(data['code'] == 0){
        document.getElementById("username").innerHTML = data['username'];
        document.getElementById("truename").innerHTML = data['truename'];
        document.getElementById("id").innerHTML = data['gonghao'];
        document.getElementById("tel").innerHTML = data['tel'];
        document.getElementById("sfz").innerHTML = data['sfz'];
      }
      else if(data['code'] == 1){
        const toast = this.toastCtrl.create({
          message: '无此人！',
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

    let pathurl2:string = 'http://118.24.76.130:8000/selectkqDay';
      let pramas2 = JSON.stringify({
        uid: this.userid,
        groupid: Appconfig.getmyadmingroupid()
      });
      this.http.post(pathurl2,pramas2,httpOptions).subscribe( (data) => {
        console.log(data);
        if(data['code'] == 0){
          this.dateMulti = data['date'];
          this.kqallcount = data['allkq'];
          console.log(data['date']);
        }
      })
  }
  back() {
    this.viewCtrl.dismiss();
  }
  qiandao(){
    let pathurl3:string = 'http://118.24.76.130:8000/qiandao';
      let pramas3 = JSON.stringify({
        uid: this.userid,
        groupid: Appconfig.getmyadmingroupid(),
      });
      this.http.post(pathurl3,pramas3,httpOptions).subscribe( (data) => {
        if(data['code'] == 0){
          const toast = this.toastCtrl.create({
            message: '签到成功',
            duration: 1000
          });
          toast.present();
        }
        else if(data['code'] == 1){
          const toast = this.toastCtrl.create({
            message: '签到成功1',
            duration: 1000
          });
          toast.present();
        }
        else if(data['code'] == 2){
          const toast = this.toastCtrl.create({
            message: '签到成功2',
            duration: 1000
          });
          toast.present();
        }
        else if(data['code'] == 3){
          const toast = this.toastCtrl.create({
            message: '签到成功3',
            duration: 1000
          });
          toast.present();
        }
        else if(data['code'] == 4){
          const toast = this.toastCtrl.create({
            message: '签到成功4',
            duration: 1000
          });
          toast.present();
        }
        else if(data['code'] == 5){
          const toast = this.toastCtrl.create({
            message: data['info'],
            duration: 1000
          });
          toast.present();
        }
      })
  }
  table(){
    console.log(this.kqallcount);
    HighCharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: '总考勤统计'
      },
      xAxis: {
        categories: [
          '总签到次数','正常签到','迟到','早退','请假','未签到'
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
        name: '总考勤情况',
        data:[this.kqallcount,0,0,0,0,0]
      }]
    });
  }
}
