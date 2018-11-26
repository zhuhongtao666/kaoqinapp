import { Component } from '@angular/core';
import { NavController,ToastController,Platform } from 'ionic-angular';
import { Page9Page } from '../page9/page9';
//import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
//import { Page2Page } from '../page2/page2';
import { kaoqinPage } from '../kaoqin/kaoqin'
import { Page7Page } from '../page7/page7';
import { Page10Page } from '../page10/page10';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as sha1 from 'sha1';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker';


var timestamp = String(new Date().getTime()/1000);
timestamp = String(parseInt(timestamp));
let AppKey = '8309d365829d0582b012caf753a548cb';
let AppSecret = 'b96d9af833f9';
let Nonce = 1;
let CheckSum = sha1(AppSecret+Nonce+timestamp);

const httpoptions = {
  headers : new HttpHeaders({ 
    'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8',
    'Appkey' : AppKey,
    'CurTime' : timestamp,
    'Nonce' : '1',
    'CheckSum': CheckSum
 })
};

const httpOptions2 = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  xieyi: boolean;
  photo: string;
  public imagepickeroption = {
    maximumImagesCount: 2,
    width: 200,
    height: 200,
    quality: 80,
    outputType: 1
  };
  constructor(public platform: Platform,public toastCtrl: ToastController,public navCtrl: NavController, private camera: Camera,public http: HttpClient, private imagePicker: ImagePicker) {
  }
  takephoto3() {
  }
  test() {
    if(this.xieyi == true){
      document.getElementById("signup_commit").removeAttribute("disabled");
    }
    else{
      document.getElementById("signup_commit").setAttribute("disabled","true");
    }
  }
  takephoto2() {
    if(this.platform.is('cordova')){
      let temp = '';
      this.imagePicker.getPictures(this.imagepickeroption).then( (results) => {
        for (var i = 0;i<results.length;i++){
          temp = results[i];
        }
      }, (err) => {
        alert(err);
      });
      const toast = this.toastCtrl.create({
        message: temp,
        duration: 2000
      });
      toast.present();
      var image = (<HTMLInputElement>document.getElementById("photo"));
      image.src = temp;
    }
    else{
      const toast = this.toastCtrl.create({
        message: '非移动设备！',
        duration: 2000
      });
      toast.present();
    }
    
  }
  takephoto() {
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
     var image = (<HTMLInputElement>document.getElementById("photo"));
     image.src = "data:image/jpeg;base64,"+imageData;
     this.photo = imageData;
     //document.getElementById("test").innerHTML = imageData;
    }, (err) => {
     // Handle error
    });
  }
  getcode(tel: HTMLInputElement) {
    let proxyurl = 'https://bird.ioliu.cn/v1/?url=';
    let pathurl = 'https://api.netease.im/sms/sendcode.action';
    let pramas = {
      mobile: '18721213663'
    };
    this.http.post(proxyurl+pathurl,pramas,httpoptions).subscribe((data) => {
      console.log(data);
    });
  }
  signup(username: HTMLInputElement, password: HTMLInputElement, password2: HTMLInputElement, tel: HTMLInputElement, xuehao: HTMLInputElement, sfz: HTMLInputElement,truename: HTMLInputElement) {
    let pathurl: string = 'http://118.24.76.130:8000/registerUser';
    if(password.value != password2.value){
      const toast_0 = this.toastCtrl.create({
        message: '两次密码不同，请重新确认密码！',
        duration: 2000
      });
      toast_0.present();
    }
    else if(password.value == ''){
      const toast_1 = this.toastCtrl.create({
        message: '密码不得为空！',
        duration: 2000
      });
      toast_1.present();
    }
    else{
      let pramas2 = JSON.stringify({
        username: username.value,
        password: password.value,
        phone: tel.value,
        gonghao: xuehao.value,
        sfz: sfz.value,
        uimg: '',
        truename: truename.value
      });
      this.http.post(pathurl,pramas2,httpOptions2).subscribe((data) => {
        console.log(data);
        if(data['code'] == 1){
          const toast1 = this.toastCtrl.create({
            message: '注册成功！',
            duration: 2000
          });
          toast1.present();
          this.navCtrl.push(LoginPage);
        }
        else if(data['code'] == 2){
          const toast2 = this.toastCtrl.create({
            message: '用户名重复！',
            duration: 2000
          });
          toast2.present();
        }
        else if(data['code'] == 3){
          const toast3 = this.toastCtrl.create({
            message: '身份证错误！',
            duration: 2000
          });
          toast3.present();
        }
        else if(data['code'] == 4){
          const toast4 = this.toastCtrl.create({
            message: '手机号错误！',
            duration: 2000
          });
          toast4.present();
        }
        else if(data['code'] == 5){
          const toast5 = this.toastCtrl.create({
            message: '学号错误！',
            duration: 2000
          });
          toast5.present();
        }
      })
    }
  }
  goToPage9(params){
    if (!params) params = {};
    this.navCtrl.push(Page9Page);
  }goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }goToPage2(params){
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
