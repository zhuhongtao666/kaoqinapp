import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
//import { Page9Page } from '../page9/page9';
import { LoginPage } from '../login/login';
//import { Page2Page } from '../page2/page2';
import { kaoqinPage } from '../kaoqin/kaoqin'
import { Page7Page } from '../page7/page7';
import { Page10Page } from '../page10/page10';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-page9',
  templateUrl: 'page9.html'
})
export class Page9Page {

  constructor(public navCtrl: NavController, private camera: Camera) {
  }
  usecamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 400,
      targetWidth: 400,
      cameraDirection: 1
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     var image = (<HTMLInputElement>document.getElementById("photo3"));
     image.src = "data:image/jpeg;base64,"+imageData;
     //document.getElementById("test").innerHTML = imageData;
    }, (err) => {
     // Handle error
    });
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
  }goTokaoqinPage(params){
    if (!params) params = {};
    this.navCtrl.push(kaoqinPage);
  }goToPage7(params){
    if (!params) params = {};
    this.navCtrl.push(Page7Page);
  }goToPage10(params){
    if (!params) params = {};
    this.navCtrl.push(Page10Page);
  }
}
