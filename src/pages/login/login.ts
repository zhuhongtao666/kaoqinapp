import { Component } from '@angular/core';
import { NavController,ToastController,Platform } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Page9Page } from '../page9/page9';
//import { LoginPage } from '../login/login';
//import { Page2Page } from '../page2/page2';
import { Page7Page } from '../page7/page7';
import { Page10Page } from '../page10/page10';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { App } from 'ionic-angular';
//import { kaoqinPage } from '../kaoqin/kaoqin';
import { Appconfig } from '../../app/app.config';
import { AdminPage } from '../admin/admin';
import { MubanPage } from '../muban/muban';

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public username: string;
  constructor(public platform: Platform,public app: App, public navCtrl: NavController,public http: HttpClient, public toastCtrl: ToastController) {
  }
  test(){
    if(this.platform.is("IOS")){
      const toast = this.toastCtrl.create({
        message: 'ios',
        duration: 3000
      });
      toast.present();
    }
    else if(this.platform.is("cordova")){
      const toast = this.toastCtrl.create({
        message: 'cordova',
        duration: 3000
      });
      toast.present();
    }
  }
  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }goToPage9(params){
    if (!params) params = {};
    this.navCtrl.push(Page9Page);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }goTokaoqinPage(username: HTMLInputElement, password: HTMLInputElement){
    let pathurl: string = 'http://118.24.76.130:8000/loginWithUnameAndPsd';
    let pramas = JSON.stringify({
      username: username.value,
      password: password.value
    });
    this.http.post(pathurl,pramas,httpOptions).subscribe((data) => {
      console.log(data);
      if(data['code'] == 1){
        const toast = this.toastCtrl.create({
          message: '登录成功',
          duration: 1000
        });
        toast.present();
        Appconfig.setusername(data['gonghao']);
        Appconfig.settel(data['phone']);
        Appconfig.setsfz(data['sfz']);
        Appconfig.setutype(data['utype']);
        Appconfig.setuimg(data['uimg']);
        Appconfig.setuid(data['uid']);
        Appconfig.setgonghao(data['gonghao']);
        Appconfig.settruename(data['truename']);
        Appconfig.setusergroup(data['user_group']);
        if(data['utype'] == 1){
          this.navCtrl.setRoot(TabsControllerPage);
        }
        else{
          this.navCtrl.push(MubanPage);
        }
      }
      else{
        const toast = this.toastCtrl.create({
          message: '用户名密码错误，请检查用户名和密码！',
          duration: 2000
        });
        toast.present();
      }
    })
  }
  gotokaoqin(username: HTMLInputElement, password: HTMLInputElement) {
    if( (parseInt(username.value)%1000000) - 120000 >= 0){
      this.username = username.value;
      this.navCtrl.setRoot(TabsControllerPage);
      Appconfig.setusername(this.username);
      Appconfig.settel('18721213663');
      Appconfig.setsfz('310226199704150014');
      Appconfig.setutype(0);
    }
    else{
      this.navCtrl.push(AdminPage);
      Appconfig.setusername(this.username);
      Appconfig.settel('133xxxxxxxx');
      Appconfig.setsfz('xxxxxxxxxxxxxxxxxx');
      Appconfig.setutype(1);
    }
  }
  goToPage7(params){
    if (!params) params = {};
    this.navCtrl.push(Page7Page);
  }goToPage10(params){
    if (!params) params = {};     
    this.navCtrl.push(Page10Page);
  }
}
