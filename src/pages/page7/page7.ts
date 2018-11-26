import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
//import { kaoqinPage } from '../kaoqin/kaoqin';
//import { Page7Page } from '../page7/page7';
import { Page10Page } from '../page10/page10';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-page7',
  templateUrl: 'page7.html'
})
export class Page7Page {
  public imageurl: any; 
  constructor(public navCtrl: NavController, private camera: Camera,public navParams: NavParams,public events: Events) {
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
     var image = (<HTMLInputElement>document.getElementById("photo2"));
     image.src = "data:image/jpeg;base64,"+imageData;
     this.imageurl = image.src;
     //document.getElementById("test").innerHTML = imageData;
    }, (err) => {
     // Handle error
    });
  }
  goTokaoqinPage(params){
    if (!params) params = {};
    this.navCtrl.pop().then(() => {
      this.events.publish('bevents',this.imageurl)
    });
  }goToPage7(params){
    if (!params) params = {};
    this.navCtrl.push(Page7Page);
  }goToPage10(params){
    if (!params) params = {};
    this.navCtrl.push(Page10Page);
  }
}
