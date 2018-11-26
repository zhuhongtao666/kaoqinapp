import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Appconfig } from '../../app/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

@IonicPage()
@Component({
  selector: 'page-muban',
  templateUrl: 'muban.html',
})
export class MubanPage {
  photo: string;
  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public http: HttpClient,public navParams: NavParams,private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MubanPage');
  }
  upload() {
    var myuid = Appconfig.getuid();
    let pathurl: string = 'http://118.24.76.130:8000/mubanluru';
    let pramas = JSON.stringify({
      uid: myuid,
      img: this.photo
    });
    this.http.post(pathurl,pramas,httpOptions).subscribe( (data)=>{
      if(data['code'] == 1){
        const toast1 = this.toastCtrl.create({
          message: '录入成功，完成录入！',
          duration: 2000
        });
        toast1.present();
        this.navCtrl.setRoot(TabsControllerPage);
      }
      else if(data['code'] == 2){
        const toast2 = this.toastCtrl.create({
          message: '录入成功，继续录入！',
          duration: 2000
        });
        toast2.present();
      }
      else if(data['code'] == 3){
        const toast3 = this.toastCtrl.create({
          message: '有重复照片再库中，重新录入！',
          duration: 2000
        });
        toast3.present();
      }
      else if(data['code'] == 4){
        const toast4 = this.toastCtrl.create({
          message: '录入失败，不是同一个人！',
          duration: 2000
        });
        toast4.present();
      }
      else if(data['code'] == 5){
        const toast5 = this.toastCtrl.create({
          message: '已完成录入，无需录入，此次录入无效！',
          duration: 2000
        });
        toast5.present();
      }
      else{
        const toast0 = this.toastCtrl.create({
          message: '图像解析错误！',
          duration: 2000
        });
        toast0.present();
      }
    })
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
     var image = (<HTMLInputElement>document.getElementById("photo1"));
     image.src = "data:image/jpeg;base64,"+imageData;
     this.photo = imageData;
     //document.getElementById("test").innerHTML = imageData;
    }, (err) => {
     // Handle error
    });
  }

}
