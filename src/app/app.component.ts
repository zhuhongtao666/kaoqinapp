import { Component, ViewChild } from '@angular/core';
import { Platform, Nav,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { Appconfig } from '../app/app.config';
import { MygroupPage } from '../pages/mygroup/mygroup';
import { BackgroundMode } from '@ionic-native/background-mode';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage: any = TabsControllerPage;
    isLogin = false;
  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, toastCtrl: ToastController,public background: BackgroundMode) {
    this.background.enable();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if(this.isLogin != true){
      this.rootPage = LoginPage;
    }
  }
  loginOnSuccess(){
    this.getimgandname();
  }
  getimgandname(){
    var image = (<HTMLInputElement>document.getElementById("myphoto"));
    image.src = Appconfig.getuimg();
    document.getElementById("name").innerHTML = Appconfig.getusername();
  }
  exit(){
    this.navCtrl.push(LoginPage);
    Appconfig.clear();
    var image = (<HTMLInputElement>document.getElementById("myphoto"));
    image.src = 'assets/img/others.png';
    document.getElementById("name").innerHTML = '请登录！';
  }
  exitapp(){
    this.platform.exitApp();
  }
  mygroup(){
    if(Appconfig.getuid() == null)
      alert("请先登录！")
    else{
      this.navCtrl.push(MygroupPage);
    }
  }
}
