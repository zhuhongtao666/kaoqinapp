import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { Appconfig } from '../app/app.config';
import { MygroupPage } from '../pages/mygroup/mygroup';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage: any = TabsControllerPage;
    isLogin = false;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if(this.isLogin != true){
      this.rootPage = LoginPage
    }
  }
  exit(){
    this.navCtrl.push(LoginPage);
    Appconfig.clear();
  }
  mygroup(){
    this.navCtrl.push(MygroupPage);
  }
}
